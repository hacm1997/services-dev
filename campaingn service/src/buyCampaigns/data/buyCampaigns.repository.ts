import { BuyCampaignModel } from './buyCampaigns.model';
import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
import { DomainSession, TUID } from '@beamar/microlib';
// import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ClientDynamodb } from '../../infrastructure/dynamodb/client.dynamodb';
import {
  REVERSE_INDEX,
  TABLE_COMPRA_NAME,
} from 'src/infrastructure/dynamodb/intializer/Constants';
import { Status } from '../util/constants';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { AvailableAmoutCampaigns } from '../util/availableAmoutCampaigns';
import { CronJobService } from 'src/common/general-services/cron/cron-job.service';
import { error } from 'console';
import { SearchInvoiceService } from '../service/searchInvoice.service';
@Injectable()
export class BuyCampaignRepository {
  public static GROUP = 'BCC';
  constructor(
    private fullClientDynamodb: ClientDynamodb,
    private availableAmoutCampaigns: AvailableAmoutCampaigns,
    private cronJobService: CronJobService,
    private searchInvoiceService: SearchInvoiceService,
  ) {}

  public async buyCampaignCreate(
    buyCampaign: BuyCampaignModel,
  ): Promise<BuyCampaignModel> {
    const validationsInvoice =
      await this.searchInvoiceService.epaycoResponse(buyCampaign);
    const invoiceReference = await this.getInvoiceByIdReference(
      buyCampaign.payment_reference,
    );
    if (!invoiceReference && validationsInvoice) {
      const item = await this.createNewItemFromDomainModel(buyCampaign);
      const artifact: PutItemCommandInput = {
        TableName: TABLE_COMPRA_NAME,
        Item: item,
      };
      try {
        await this.fullClientDynamodb.fullClient.putItem(artifact);
        if (buyCampaign.transaction_state === Status.pending) {
          this.cronJobService.startCronJob(buyCampaign);
        }
        return this.mapToDomain(item);
      } catch (error) {
        return error;
      }
    }
    throw error;
  }
  public async buyCampaignFirstCreate(): Promise<any> {
    const item = await this.mapToFirstInvoice();
    const artifact: PutItemCommandInput = {
      TableName: TABLE_COMPRA_NAME,
      Item: item,
    };
    try {
      await this.fullClientDynamodb.fullClient.putItem(artifact);
      const buyCampaignFirst = this.mapToDomain(item);
      buyCampaignFirst.userNew = true;
      return this.mapToDomain(item);
    } catch (error) {
      return error;
    }
  }

  public async getEmailquantity(): Promise<any> {
    try {
      const result = await this.getCurrentInvoice();
      if (result === undefined) {
        const resultCreated = await this.buyCampaignFirstCreate();
        resultCreated.userNew = true;
        return resultCreated;
      }
      result.userNew = false;
      return result;
    } catch (error) {
      console.error('Could not get the number of campaigns', error);
      throw error;
    }
  }

  public async getCurrentInvoice(): Promise<BuyCampaignModel> {
    const params = {
      TableName: TABLE_COMPRA_NAME,
      IndexName: REVERSE_INDEX,
      KeyConditionExpression: 'sid = :sid AND begins_with(pid, :pid)',
      FilterExpression: 'transaction_state = :transactionState',
      ExpressionAttributeValues: {
        ':pid': { S: DomainSession.getTenantId() },
        ':sid': { S: DomainSession.getTenantId() },
        ':transactionState': { S: String(Status.success) },
      },
    };

    try {
      const result = await this.fullClientDynamodb.fullClient.query(params);
      if (result.Items.length > 0) {
        const registrosOrdenados = result.Items.sort((a, b) => {
          return (
            new Date(b.createdAt.S).getTime() -
            new Date(a.createdAt.S).getTime()
          );
        });
        return this.mapToDomain(registrosOrdenados[0]);
      }
    } catch (error) {
      console.error('Error al obtener el registro más reciente:', error);
      throw error;
    }
  }
  public async getInvoiceByIdReference(
    payment_reference: string,
  ): Promise<BuyCampaignModel> {
    const params = {
      TableName: TABLE_COMPRA_NAME,
      IndexName: REVERSE_INDEX,
      KeyConditionExpression: 'sid = :sid AND begins_with(pid, :pid)',
      FilterExpression: 'payment_reference = :paymentReference',
      ExpressionAttributeValues: {
        ':pid': {
          S: DomainSession.getTenantId(),
        },
        ':sid': { S: DomainSession.getTenantId() },
        ':paymentReference': { S: payment_reference },
      },
    };

    const result = await this.fullClientDynamodb.fullClient.query(params);

    return result.Items[0];
  }

  public async updateStatusInvoice(
    payment_reference: string,
    status: string,
    quantity: number,
  ): Promise<any> {
    const invoiceReference =
      await this.getInvoiceByIdReference(payment_reference);

    const params = new UpdateCommand({
      TableName: TABLE_COMPRA_NAME,
      Key: {
        pid: invoiceReference.id,
        sid: invoiceReference.tenantId,
      },
      UpdateExpression: 'SET transaction_state = :status',
      ExpressionAttributeValues: {
        ':status': status,
      },
      ReturnValues: 'ALL_NEW',
    });
    try {
      await this.fullClientDynamodb.fullClient.send(params);
      const invoiceCurrent = await this.getCurrentInvoice();
      const quantityNew = this.availableAmoutCampaigns.addCampaignsAmount(
        quantity,
        invoiceCurrent.quantity,
      );
      this.updateAmountCurrent(quantityNew);
      return {
        status: 200,
        msj: 'edited status success',
      };
    } catch (error) {
      throw error;
    }
  }
  public async updateAmountCurrent(quantity: number): Promise<any> {
    const invoiceCurrent = await this.getCurrentInvoice();
    const params = new UpdateCommand({
      TableName: TABLE_COMPRA_NAME,
      Key: {
        pid: invoiceCurrent.id,
        sid: invoiceCurrent.tenantId,
      },
      UpdateExpression: 'SET quantity = :quantity',
      ExpressionAttributeValues: {
        ':quantity': quantity,
      },
      ReturnValues: 'ALL_NEW',
    });
    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return {
        status: 200,
        msj: 'edited status success',
      };
    } catch (error) {
      throw error;
    }
  }

  private mapToDomain(item: any): BuyCampaignModel {
    return {
      tenantId: item.sid.S,
      id: item.pid.S,
      transaction_state: item.transaction_state.S,
      payment_reference: item.payment_reference.S,
      quantity: item.quantity.N,
      transaction_date: item.transaction_date.S,
      description: item.description.S,
      type_payment: item.type_payment.S,
      transaction_response: item.transaction_response.S,
      payment_gateway: item.payment_gateway.S,
      email: item.email.S,
      createdAt: item.createdAt.S,
    };
  }
  private async createNewItemFromDomainModel(bc: BuyCampaignModel) {
    if (bc.transaction_state === Status.success) {
      const emailQuantity = await this.getEmailquantity();
      const quantity = this.availableAmoutCampaigns.addCampaignsAmount(
        Number(emailQuantity.quantity),
        bc.quantity,
      );
      bc.quantity = quantity;
    }
    let item: any = {
      payment_reference: { S: bc.payment_reference },
      transaction_state: { S: bc.transaction_state },
      quantity: { N: bc.quantity.toString() },
      transaction_date: { S: bc.transaction_date },
      description: { S: bc.description },
      type_payment: { S: bc.type_payment },
      transaction_response: { S: bc.transaction_response },
      payment_gateway: { S: bc.payment_gateway },
      email: { S: bc.email },
      createdAt: { S: new Date() },
    };

    const pidsid = TUID.generateCreztuIDDynamoDBBasedOnTenant(
      BuyCampaignRepository.GROUP,
    );
    item = { ...item, pid: pidsid.pid, sid: pidsid.sid };
    return item;
  }
  private mapToFirstInvoice() {
    let item: any = {
      payment_reference: { S: '' },
      transaction_state: { S: Status.success },
      quantity: { N: '100' },
      transaction_date: { S: '' },
      description: { S: '' },
      type_payment: { S: '' },
      transaction_response: { S: '' },
      payment_gateway: { S: '' },
      email: { S: '' },
      createdAt: { S: new Date() },
    };
    const pidsid = TUID.generateCreztuIDDynamoDBBasedOnTenant(
      BuyCampaignRepository.GROUP,
    );
    item = { ...item, pid: pidsid.pid, sid: pidsid.sid };
    return item;
  }
}
