import { CampaignModel } from './campaign.model';
import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
import { DomainSession, TUID } from '@beamar/microlib';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ClientDynamodb } from '../../infrastructure/dynamodb/client.dynamodb';
import {
  REVERSE_INDEX,
  TABLE_NAME,
} from 'src/infrastructure/dynamodb/intializer/Constants';
import { EmailSendService } from 'src/buyCampaigns/util/emailSend.service';
import { BuyCampaignRepository } from 'src/buyCampaigns/data/buyCampaigns.repository';
import { AvailableAmoutCampaigns } from 'src/buyCampaigns/util/availableAmoutCampaigns';

@Injectable()
export class CampaignRepository {
  public static GROUP = 'CPN';

  constructor(
    private fullClientDynamodb: ClientDynamodb,
    private emailSendService: EmailSendService,
    private buyCampaignRepository: BuyCampaignRepository,
    private _availableAmoutCampaigns: AvailableAmoutCampaigns,
  ) {}

  public async campaignCreate(campaign: CampaignModel): Promise<CampaignModel> {
    const item = this.createNewItemFromDomainModel(campaign);
    const artifact: PutItemCommandInput = {
      TableName: TABLE_NAME,
      Item: item,
    };
    try {
      await this.fullClientDynamodb.fullClient.putItem(artifact);
      return this.mapToDomain(item);
    } catch (error) {
      return error;
    }
  }

  public async putCampaing(campaign): Promise<CampaignModel> {
    const id = campaign.id;
    const item = await this.getCampaignsById(id);
    const params = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        pid: item.id,
        sid: item.tenantId,
      },
      UpdateExpression:
        'SET #title = :title, #subject = :subject, #body = :body, #fileCSV = :file',
      ExpressionAttributeNames: {
        '#title': 'title',
        '#subject': 'subject',
        '#body': 'body',
        '#fileCSV': 'file',
      },
      ExpressionAttributeValues: {
        ':title': campaign.title,
        ':subject': campaign.subject,
        ':body': campaign.body,
        ':file': campaign.file,
      },
      ReturnValues: 'ALL_NEW',
    });
    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return campaign;
    } catch (error) {
      throw error;
    }
  }

  public async getAllCampaigns(): Promise<any[]> {
    const params = {
      TableName: TABLE_NAME,
      IndexName: REVERSE_INDEX,
      KeyConditionExpression: 'sid = :sid AND begins_with(pid, :pid)',
      ExpressionAttributeValues: {
        ':pid': { S: DomainSession.getTenantId() },
        ':sid': { S: DomainSession.getTenantId() },
      },
    };

    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      if (data.Items.length > 0) {
        return data.Items.map((item: any) => this.mapToDomain(item));
      }
    } catch (error) {
      throw error;
    }
  }
  public async getCampaignsById(id: string): Promise<CampaignModel> {
    return this.mapToDomain(await this.getCampaingItemByKey(id));
  }

  private async getCampaingItemByKey(id: string): Promise<any> {
    try {
      const campaign = await this.fullClientDynamodb.fullClient.getItem({
        Key: {
          pid: { S: id },
          sid: { S: DomainSession.getTenantId() },
        },
        TableName: TABLE_NAME,
      });
      console.log(campaign);
      return campaign.Item;
    } catch (error) {
      throw error;
    }
  }
  public async getCampaingItemByKeyTrackingEmail(id: string): Promise<any> {
    const tenantCampaign = id.split('-')[0];
    try {
      const campaign = await this.fullClientDynamodb.fullClient.getItem({
        Key: {
          pid: { S: id },
          sid: { S: tenantCampaign },
        },
        TableName: TABLE_NAME,
      });
      return campaign.Item;
    } catch (error) {
      throw error;
    }
  }
  public async sendEmailCampaigns(id: string): Promise<any> {
    try {
      const campaign = await this.getCampaignsById(id);
      const emailQuantity = await this.buyCampaignRepository.getEmailquantity();
      const result = await this.emailSendService.fetchDataAndSendEmail(
        campaign,
        emailQuantity.quantity,
      );
      if (result.data.status === 200) {
        const newEmailQuantity =
          await this._availableAmoutCampaigns.subtractCampaignAmount(
            Number(emailQuantity.quantity),
            result.data.send,
          );
        await this.buyCampaignRepository.updateAmountCurrent(newEmailQuantity);
        return result;
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  public async deleteCampaign(id: string): Promise<any> {
    try {
      const foundItem = await this.getCampaingItemByKey(id);
      if (!foundItem) return;
      return await this.fullClientDynamodb.fullClient.deleteItem({
        Key: {
          pid: { S: id },
          sid: { S: DomainSession.getTenantId() },
        },
        TableName: TABLE_NAME,
      });
    } catch (error) {
      throw error;
    }
  }

  private mapToDomain(item: any): CampaignModel {
    const newItem: CampaignModel = {
      tenantId: item.sid.S,
      id: item.pid.S,
      title: item.title.S,
      subject: item.subject.S,
      body: item.body.S,
    };
    if (item.file) {
      newItem.file = item.file.S;
    }
    return newItem;
  }
  private createNewItemFromDomainModel(c: CampaignModel) {
    let item: any = {
      title: { S: c.title },
      subject: { S: c.subject },
      body: { S: c.body },
    };
    if (c.file) {
      item.file = { S: c.file };
    }
    const pidsid = TUID.generateCreztuIDDynamoDBBasedOnTenant(
      CampaignRepository.GROUP,
    );
    item = { ...item, pid: pidsid.pid, sid: pidsid.sid };
    return item;
  }
}
