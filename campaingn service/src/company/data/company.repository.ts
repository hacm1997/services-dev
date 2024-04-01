import { Injectable } from '@nestjs/common';
import { ClientDynamodb } from 'src/infrastructure/dynamodb/client.dynamodb';
import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import {
  REVERSE_INDEX,
  TABLE_CONTACT_NAME,
} from 'src/infrastructure/dynamodb/intializer/Constants';
import { DomainSession, TUID } from '@beamar/microlib';
import { CompanyModel } from './company.model';
import { CompanyDTO } from '../rest/companyDTO';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class CompanyRepository {
  public static GROUP = 'COM';
  constructor(private fullClientDynamodb: ClientDynamodb) {}

  public async createCompany(item: CompanyModel): Promise<CompanyModel> {
    try {
      const param = this.createNewItemFromDomainModel(item);
      const artifact: PutItemCommandInput = {
        TableName: TABLE_CONTACT_NAME,
        Item: param as any,
      };
      await this.fullClientDynamodb.fullClient.putItem(artifact);
      return this.mapToDomain(param);
    } catch (error) {
      return error;
    }
  }

  public async getAllCompanies(): Promise<CompanyModel[]> {
    const params = {
      TableName: TABLE_CONTACT_NAME,
      IndexName: REVERSE_INDEX,
      KeyConditionExpression: 'sid = :sid AND begins_with(pid, :pid)',
      ExpressionAttributeValues: {
        ':pid': { S: CompanyRepository.GROUP },
        ':sid': { S: DomainSession.getTenantId() },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      return data.Items.map((item: any) => this.mapToDomain(item));
    } catch (error) {
      throw error;
    }
  }

  public async getCompanyById(companyId: string): Promise<CompanyModel> {
    const params = {
      TableName: TABLE_CONTACT_NAME,
      KeyConditionExpression: 'pid = :pid',
      ExpressionAttributeValues: {
        ':pid': { S: companyId },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      return this.mapToDomain(data.Items[0]);
    } catch (error) {
      throw error;
    }
  }

  public async updateCompany(
    companyId: string,
    company: CompanyModel,
  ): Promise<CompanyModel> {
    const params = new UpdateCommand({
      TableName: TABLE_CONTACT_NAME,
      Key: {
        pid: companyId,
        sid: DomainSession.getTenantId(),
      },
      UpdateExpression: 'SET #name = :name, #companyInfo = :companyInfo',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#companyInfo': 'companyInfo',
      },
      ExpressionAttributeValues: {
        ':name': company.name,
        ':companyInfo': company.companyInfo
          ? JSON.stringify(company.companyInfo)
          : '',
      },
      ReturnValues: 'ALL_NEW',
    });
    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return company;
    } catch (error) {
      throw error;
    }
  }

  public async deleteCompany(companyId: string): Promise<any> {
    try {
      return await this.fullClientDynamodb.fullClient.deleteItem({
        Key: {
          pid: { S: companyId },
          sid: { S: DomainSession.getTenantId() },
        },
        TableName: TABLE_CONTACT_NAME,
      });
    } catch (error) {
      throw error;
    }
  }

  private createNewItemFromDomainModel(company: CompanyModel) {
    let item: CompanyDTO = {
      name: { S: company.name },
    };
    if (company.companyInfo) {
      item.companyInfo = { S: JSON.stringify(company.companyInfo) };
    }
    const pidsid = TUID.generateCreztuIDDynamoDBBasedOnTenant(
      CompanyRepository.GROUP,
    );
    const indiceGuion = pidsid.pid.S.indexOf('-');
    let newPid = '';
    // Verificar si se encontró el guion y eliminar la parte antes de él
    if (indiceGuion !== -1) {
      newPid = pidsid.pid.S.substring(indiceGuion + 1);
    }
    item = { ...item, pid: { S: newPid }, sid: pidsid.sid };
    return item;
  }

  private mapToDomain(item: CompanyDTO): CompanyModel {
    const newItem: CompanyModel = {
      id: item.pid.S,
      name: item.name.S,
      companyInfo:
        item.companyInfo && item.companyInfo.S !== ''
          ? JSON.parse(item.companyInfo.S)
          : '',
    };
    return newItem;
  }
}
