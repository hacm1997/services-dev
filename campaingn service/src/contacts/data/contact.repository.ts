import { Injectable } from '@nestjs/common';
import { ClientDynamodb } from '../../infrastructure/dynamodb/client.dynamodb';
import {
  COMPANY_INDEX,
  PERSON_INDEX,
  REVERSE_INDEX,
  TABLE_CONTACT_NAME,
} from 'src/infrastructure/dynamodb/intializer/Constants';
import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { contactModel } from './contact.model';
import { DomainSession, TUID } from '@beamar/microlib';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { contactDTO } from '../rest/contactDTO';
import { CompanyModel } from 'src/company/data/company.model';
import { PersonModel } from 'src/person/data/person.model';

@Injectable()
export class ContactRepository {
  public static GROUP = 'CNT';

  constructor(private fullClientDynamodb: ClientDynamodb) {}

  public async createContact(item: contactDTO): Promise<any> {
    try {
      const isContact = await this.getContactByEmail(item.email);
      if (isContact !== 400) {
        return 400;
      } else {
        const param = this.createNewItemFromDomainModel(item);
        const artifact: PutItemCommandInput = {
          TableName: TABLE_CONTACT_NAME,
          Item: param,
        };
        await this.fullClientDynamodb.fullClient.putItem(artifact);
        return this.mapToDomain(param);
      }
    } catch (error) {
      return error;
    }
  }
  public async getContactByEmail(email: string): Promise<any> {
    const params = {
      TableName: TABLE_CONTACT_NAME,
      IndexName: REVERSE_INDEX,
      KeyConditionExpression: 'sid = :sid AND begins_with(pid, :pid)',
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':pid': { S: DomainSession.getTenantId() },
        ':sid': { S: DomainSession.getTenantId() },
        ':email': email,
      },
    };
    // console.log(params);
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      return this.mapToDomain(data.Items[0]);
    } catch (error) {
      return 400;
    }
  }
  public async getContactByEmailTracking(
    email: string,
    tenantId: string,
  ): Promise<any> {
    // console.log(tenantId);
    const params = {
      TableName: TABLE_CONTACT_NAME,
      IndexName: REVERSE_INDEX,
      KeyConditionExpression: 'sid = :sid  AND begins_with(pid, :pid)',
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':pid': { S: tenantId },
        ':sid': { S: tenantId },
        ':email': { S: email },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      return this.mapToDomain(data.Items[0]);
    } catch (error) {
      return error;
    }
  }
  public async getAllContacts(): Promise<any[]> {
    const params = {
      TableName: TABLE_CONTACT_NAME,
      IndexName: REVERSE_INDEX,
      KeyConditionExpression: 'sid = :sid AND begins_with(pid, :pid)',
      ExpressionAttributeValues: {
        ':pid': { S: ContactRepository.GROUP },
        ':sid': { S: DomainSession.getTenantId() },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      console.log('data => ', data.Items);
      return data.Items.map((item: any) => this.mapToDomain(item));
    } catch (error) {
      throw error;
    }
  }

  private async getContactItemByKey(id: string): Promise<any> {
    try {
      // console.log(id);
      const contact = await this.fullClientDynamodb.fullClient.getItem({
        Key: {
          pid: { S: id },
          sid: { S: DomainSession.getTenantId() },
        },
        TableName: TABLE_CONTACT_NAME,
      });
      // console.log(contact);
      return contact.Item;
    } catch (error) {
      throw error;
    }
  }

  public async deleteContact(id: string): Promise<any> {
    try {
      return await this.fullClientDynamodb.fullClient.deleteItem({
        Key: {
          pid: { S: id },
          sid: { S: DomainSession.getTenantId() },
        },
        TableName: TABLE_CONTACT_NAME,
      });
    } catch (error) {
      throw error;
    }
  }

  public async getContactById(id: string): Promise<contactModel> {
    return this.mapToDomain(await this.getContactItemByKey(id));
  }
  public async putContactByTypeContact(item: any): Promise<contactModel> {
    const params = new UpdateCommand({
      TableName: TABLE_CONTACT_NAME,
      Key: {
        pid: item.id,
        sid: item.tenant,
      },
      UpdateExpression: 'SET  #typeContact = :typeContact',
      ExpressionAttributeNames: {
        '#typeContact': 'typeContact',
      },
      ExpressionAttributeValues: {
        ':typeContact': item.typeContact,
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
  public async putContact(
    id: string,
    contact: contactModel,
  ): Promise<contactModel> {
    const params = new UpdateCommand({
      TableName: TABLE_CONTACT_NAME,
      Key: {
        pid: id,
        sid: DomainSession.getTenantId(),
      },
      UpdateExpression:
        'SET #full_name = :full_name, #email = :email, #phone = :phone, #contactStatus = :contactStatus, #age = :age, #lastComunication = :lastComunication, #personDetails = :personDetails, #companyDetails = :companyDetails',
      ExpressionAttributeNames: {
        '#full_name': 'full_name',
        '#email': 'email',
        '#phone': 'phone',
        '#contactStatus': 'contactStatus',
        '#age': 'age',
        '#lastComunication': 'lastComunication',
        '#personDetails': 'personDetails',
        '#companyDetails': 'companyDetails',
      },
      ExpressionAttributeValues: {
        ':full_name': contact.full_name,
        ':email': contact.email,
        ':phone': contact.phone,
        ':contactStatus': contact.contactStatus ? contact.contactStatus : 1,
        ':age': contact.age ? contact.age : 0,
        ':lastComunication': contact.lastComunication
          ? contact.lastComunication
          : '',
        ':personDetails': contact.personDetails
          ? JSON.stringify(contact.personDetails)
          : '',
        ':companyDetails': contact.companyDetails
          ? JSON.stringify(contact.companyDetails)
          : '',
      },
      ReturnValues: 'ALL_NEW',
    });
    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return contact;
    } catch (error) {
      throw error;
    }
  }

  public async putContactCompany(
    id: string,
    company: CompanyModel,
  ): Promise<any> {
    const params = new UpdateCommand({
      TableName: TABLE_CONTACT_NAME,
      Key: {
        pid: id,
        sid: DomainSession.getTenantId(),
      },
      UpdateExpression:
        'SET #companyId = :companyId, #companyDetails = :companyDetails',
      ExpressionAttributeNames: {
        '#companyId': 'companyId',
        '#companyDetails': 'companyDetails',
      },
      ExpressionAttributeValues: {
        ':companyId': company.id,
        ':companyDetails': company.companyInfo
          ? JSON.stringify(company.companyInfo)
          : '',
      },
      ReturnValues: 'ALL_NEW',
    });
    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return {
        message: 'company in contact update successful',
        company: company,
      };
    } catch (error) {
      throw error;
    }
  }

  public async putContactPerson(id: string, person: PersonModel): Promise<any> {
    const params = new UpdateCommand({
      TableName: TABLE_CONTACT_NAME,
      Key: {
        pid: id,
        sid: DomainSession.getTenantId(),
      },
      UpdateExpression:
        'SET #personId = :personId, #personDetails = :personDetails',
      ExpressionAttributeNames: {
        '#personId': 'personId',
        '#personDetails': 'personDetails',
      },
      ExpressionAttributeValues: {
        ':personId': person.id,
        ':personDetails': person.personInfo
          ? JSON.stringify(person.personInfo)
          : '',
      },
      ReturnValues: 'ALL_NEW',
    });
    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return {
        message: 'person in contact update successful',
        person: person,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getContactByCompanyId(companyId: string): Promise<any> {
    const params = {
      TableName: TABLE_CONTACT_NAME,
      IndexName: COMPANY_INDEX,
      KeyConditionExpression: 'companyId = :companyId',
      ExpressionAttributeValues: {
        ':companyId': { S: companyId },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      return data.Items.map((item: any) => this.mapToDomain(item));
    } catch (error) {
      throw error;
    }
  }

  public async getContactByPersonId(personId: string): Promise<any> {
    const params = {
      TableName: TABLE_CONTACT_NAME,
      IndexName: PERSON_INDEX,
      KeyConditionExpression: 'personId = :personId',
      ExpressionAttributeValues: {
        ':personId': { S: personId },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      return data.Items.map((item: any) => this.mapToDomain(item));
    } catch (error) {
      throw error;
    }
  }

  private createNewItemFromDomainModel(contact: contactDTO) {
    let item: any = {};
    if (contact.phone) {
      item.phone = { S: contact.phone };
    }
    if (contact.contactStatus) {
      item.status = { N: contact.contactStatus };
    }
    if (contact.age) {
      item.age = { N: contact.age };
    }
    if (contact.lastComunication) {
      item.lastComunication = { S: contact.lastComunication };
    }
    if (contact.personDetails) {
      item.personDetails = { S: JSON.stringify(contact.personDetails) };
    }
    if (contact.companyDetails) {
      item.companyDetails = { S: JSON.stringify(contact.companyDetails) };
    }
    if (contact.personId) {
      item.personId = { S: contact.personId };
    }
    if (contact.companyId) {
      item.companyId = { S: contact.companyId };
    }
    const pidsid = TUID.generateCreztuIDDynamoDBBasedOnTenant(
      ContactRepository.GROUP,
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
  private mapToDomain(item: any): contactDTO {
    //const personDetails = JSON.parse(item.personDetails.S);
    //const companyDetails = JSON.parse(item.companyDetails.S);
    const newItem: any = {
      id: item.pid.S,
      contactStatus: item.contactStatus ? item.contactStatus.N : null,
      age: item.age ? item.age.N : null,
      lastComunication: item.lastComunication ? item.lastComunication.S : '',
      personDetails: item.personDetails ? JSON.parse(item.personDetails.S) : '',
      companyDetails: item.companyDetails
        ? JSON.parse(item.companyDetails.S)
        : '',
      personId: item.personId ? item.personId.S : '',
      companyId: item.companyId ? item.companyId.S : '',
    };
    /*if (!personDetails.personName && !personDetails.personPhone) {
      newItem.full_name = companyDetails.companyName;
      newItem.phone = companyDetails.companyPhone;
      newItem.email = companyDetails.companyEmail
        ? companyDetails.companyEmail
        : '';
    }
    if (!companyDetails.companyName && !companyDetails.companyPhone) {
      newItem.full_name = personDetails.personName;
      newItem.phone = personDetails.personPhone;
      newItem.email = personDetails.personEmail
        ? companyDetails.personEmail
        : '';
    }*/

    return newItem;
  }
}
