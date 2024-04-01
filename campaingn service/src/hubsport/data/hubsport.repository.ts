import {
  CredentialsHubsportModel,
  ClientHubsportModel,
} from './hubsport.model';
import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
// import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ClientDynamodb } from '../../infrastructure/dynamodb/client.dynamodb';
import { TABLE_HUBSPORT_NAME } from 'src/infrastructure/dynamodb/intializer/Constants';
import { SendClientHubsportService } from '../service/hubsportSend.service';
@Injectable()
export class HubsportRepository {
  public static GROUP = 'CLHT';

  constructor(
    private fullClientDynamodb: ClientDynamodb,
    private sendClientHubsportService: SendClientHubsportService,
  ) {}

  public async saveCredentialsCreate(
    credencial: CredentialsHubsportModel,
  ): Promise<CredentialsHubsportModel> {
    const item = this.createNewItemFromDomainModel(credencial);
    const artifact: PutItemCommandInput = {
      TableName: TABLE_HUBSPORT_NAME,
      Item: item,
    };
    try {
      await this.fullClientDynamodb.fullClient.putItem(artifact);
      return this.mapToDomain(item);
    } catch (error) {
      return error;
    }
  }
  public async saveClientCreate(client: ClientHubsportModel): Promise<boolean> {
    const item = this.createNewItemFromDomainModelClient(client);
    try {
      const res = await this.searchTokenByTenant(item.tenant);
      if (!res) {
        return false;
      }
      const contact = {
        ...item,
        token: res[0].sid.S,
      };
      const saveClient =
        await this.sendClientHubsportService.sendClientHubsport(contact);
      return saveClient;
    } catch (error) {
      return error;
    }
  }
  public async getAllClentsHubsportByTenant(tenant: string): Promise<any[]> {
    const res = await this.searchTokenByTenant(tenant);
    const token = res[0].sid.S;
    const clients =
      await this.sendClientHubsportService.getClientHubsport(token);
    if (clients.length > 0) {
      return clients;
    }
    return [];
  }
  public async getCredentialsConfimations(tenant: string): Promise<any> {
    const res = await this.searchTokenByTenant(tenant);
    if (!res) {
      return {
        token: '',
        status: false,
      };
    }
    return {
      token: res[0].sid.S,
      status: true,
    };
  }
  public async DeleteClientsHubsportById(
    id: string,
    tenant: string,
  ): Promise<boolean> {
    const res = await this.searchTokenByTenant(tenant);
    const token = res[0].sid.S;
    const resDelete = await this.sendClientHubsportService.DeleteClientHubsport(
      id,
      token,
    );
    return resDelete;
  }
  private async searchTokenByTenant(tenant: string) {
    const buildPid = `${HubsportRepository.GROUP}-${tenant}`;
    const params = {
      TableName: TABLE_HUBSPORT_NAME,
      KeyConditionExpression: 'pid = :tenant',
      ExpressionAttributeValues: {
        ':tenant': {
          S: buildPid,
        },
      },
    };
    try {
      const credencial = await this.fullClientDynamodb.fullClient.query(params);
      return credencial.Items;
    } catch (error) {
      throw error;
    }
  }
  private mapToDomain(item: any): CredentialsHubsportModel {
    const newItem: CredentialsHubsportModel = {
      tenantName: item.pid.S.split('-')[1],
      id: item.pid.S,
      apiKey: item.sid.S,
    };
    return newItem;
  }
  private createNewItemFromDomainModel(h: CredentialsHubsportModel) {
    const buildPi = `${HubsportRepository.GROUP}-${h.tenantName}`;
    const item: any = {
      pid: { S: buildPi },
      sid: { S: h.apiKey },
    };
    return item;
  }
  private createNewItemFromDomainModelClient(c: ClientHubsportModel) {
    const item: ClientHubsportModel = {
      firstname: c.firstname,
      email: c.email,
      phone: c.phone,
      state: c.state,
      city: c.city,
      address: c.address,
      servicio: c.servicio,
      noticia: c.noticia,
      tenant: c.tenant,
    };
    return item;
  }
}
