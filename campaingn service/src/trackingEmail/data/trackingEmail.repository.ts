import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import {
  REVERSE_INDEX,
  TABLE_TRACKING_NAME,
} from 'src/infrastructure/dynamodb/intializer/Constants';
import { ReceiveEmail, StatusEmailview, TypeContact } from '../util/constants';
import { ClientDynamodb } from 'src/infrastructure/dynamodb/client.dynamodb';
import { Injectable } from '@nestjs/common';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { HasDecode } from 'src/common/general-services/general-functions/cifrado.service';
import { template } from '../util/templateThank';
@Injectable()
export class TrackingRepository {
  public static GROUP = 'TRSE';
  constructor(private fullClientDynamodb: ClientDynamodb) {}

  public async getTrackingEmail(uniqueCode: string): Promise<any> {
    const decode = await HasDecode(uniqueCode.split('.')[0]);
    const item: any = {
      pid: decode.split('&')[0],
      sid: uniqueCode.split('.')[0],
      statusTracking: 'open',
    };
    await this.putStatusTrackingEmail(item);
    return `<?xml version="1.0" encoding="UTF-8"?>
            <svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>`;
  }
  public async createRegisterSendEmail(item: any): Promise<any> {
    try {
      const isContact = await this.getContactByUniqueCode(item.uniqueCode);
      if (isContact) {
        throw new Error('User already exist');
      }
      const param = this.createNewItemFromDomainModel(item);
      const artifact: PutItemCommandInput = {
        TableName: TABLE_TRACKING_NAME,
        Item: param,
      };
      await this.fullClientDynamodb.fullClient.putItem(artifact);
      return true;
    } catch (error) {
      return error;
    }
  }
  public async getContactByUniqueCode(uniqueCode: string): Promise<any> {
    const params = {
      TableName: TABLE_TRACKING_NAME,
      IndexName: REVERSE_INDEX,
      KeyConditionExpression: 'sid = :sid',
      ExpressionAttributeValues: {
        ':sid': { S: uniqueCode },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      return data.Items[0] ? data.Items[0] : null;
    } catch (error) {
      throw error;
    }
  }
  public async putStatusNotificationTrackingEmail(
    uniqueCode: any,
  ): Promise<any> {
    const decode = await HasDecode(uniqueCode.split('.')[0]);
    const params = new UpdateCommand({
      TableName: TABLE_TRACKING_NAME,
      Key: {
        pid: decode.split('&')[0],
        sid: uniqueCode.split('.')[0],
      },
      UpdateExpression: 'SET  #receiveNotification = :receiveNotification',
      ExpressionAttributeNames: {
        '#receiveNotification': 'receiveNotification',
      },
      ExpressionAttributeValues: {
        ':receiveNotification': 'no',
      },
      ReturnValues: 'ALL_NEW',
    });
    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return template;
    } catch (error) {
      throw error;
    }
  }
  public async putStatusTrackingEmail(item: any): Promise<any> {
    const params = new UpdateCommand({
      TableName: TABLE_TRACKING_NAME,
      Key: {
        pid: item.pid,
        sid: item.sid,
      },
      UpdateExpression: 'SET  #statusTracking = :statusTracking',
      ExpressionAttributeNames: {
        '#statusTracking': 'statusTracking',
      },
      ExpressionAttributeValues: {
        ':statusTracking': item.statusTracking,
      },
      ReturnValues: 'ALL_NEW',
    });
    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return item;
    } catch (error) {
      throw error;
    }
  }

  public async getStatisticsShipping(
    idCampaign: string,
    startSid: string,
    campaign: any,
    quantity: number,
  ): Promise<any> {
    const params = {
      TableName: TABLE_TRACKING_NAME,
      KeyConditionExpression: 'pid = :pid AND begins_with(sid, :sid)',
      ExpressionAttributeValues: {
        ':pid': { S: idCampaign },
        ':sid': { S: startSid },
      },
    };

    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      let emailOpen = 0;
      let receiverEmail = 0;
      if (data && data.Items.length > 0) {
        data.Items.map((item: any) => {
          if (
            item.statusTracking &&
            item.statusTracking.S === StatusEmailview.abierto
          ) {
            emailOpen++;
          }
          if (
            item.receiveNotification &&
            item.receiveNotification.S === ReceiveEmail.si
          ) {
            receiverEmail++;
          }
        });
        const dataResult: any = {
          percentageAndColor: this.percentaje(quantity, data.Items.length),
          dataCampaign: campaign ? this.mapToDomainCampaigns(campaign) : [],
          cantSend: data.Items.length,
          cantBySend: quantity,
          cantEmailOpen: emailOpen,
          cantReceiverEmail: receiverEmail,
        };
        const customerCamapaign = [];
        data.Items.map((item: any) => {
          customerCamapaign.push(this.mapToDomain(item));
        });
        dataResult.contactCamapaign = customerCamapaign;
        return dataResult;
      }
      return {
        percentageAndColor: 0,
        dataCampaign: {},
        cantSend: 0,
        cantBySend: 0,
        contactCamapaign: [],
        cantEmailOpen: 0,
        cantReceiverEmail: 0,
      };
    } catch (error) {
      throw error;
    }
  }

  private createNewItemFromDomainModel(contact: any) {
    const item: any = {
      pid: { S: contact.campaignId },
      sid: { S: contact.uniqueCode },
      name: { S: contact.name },
      email: { S: contact.email },
      campaignId: { S: contact.campaignId },
      statusTracking: { S: contact.statusTracking },
      typeContact: {
        S: contact.typeContact ? contact.typeContact : TypeContact.contact,
      },
      receiveNotification: { S: 'si' },
    };
    return item;
  }
  private mapToDomain(item: any): any {
    const newItem: any = {
      id: item.pid.S,
      email: item.email ? item.email.S : '',
      name: item.name ? item.name.S : '',
      statusTracking: item.statusTracking ? item.statusTracking.S : '',
      receiveNotification: item.receiveNotification
        ? item.receiveNotification.S
        : '',
    };
    return newItem;
  }
  private mapToDomainCampaigns(item: any): any {
    const newItem: any = {
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
  private percentaje(cant: number, send: number) {
    let result = {};
    const percentage = (send * 100) / cant;
    if (percentage === 100) {
      result = { valuePercenege: percentage, color: 'green' };
    }
    if (percentage >= 50 && percentage < 100) {
      result = { valuePercenege: percentage, color: '#f67119' };
    }
    if (percentage < 50) {
      result = { valuePercenege: percentage, color: 'red' };
    }
    return result;
  }
}
