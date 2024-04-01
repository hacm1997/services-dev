import { Injectable } from '@nestjs/common';
import { ClientDynamodb } from 'src/infrastructure/dynamodb/client.dynamodb';
import { PersonModel } from './person.model';
import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import {
  REVERSE_INDEX,
  TABLE_CONTACT_NAME,
} from 'src/infrastructure/dynamodb/intializer/Constants';
import { PersonDTO } from '../rest/personDTO';
import { DomainSession, TUID } from '@beamar/microlib';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class PersonRepository {
  public static GROUP = 'PER';
  constructor(private fullClientDynamodb: ClientDynamodb) {}

  public async createPerson(item: PersonModel): Promise<PersonModel> {
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

  public async getAllPersons(): Promise<PersonModel[]> {
    const params = {
      TableName: TABLE_CONTACT_NAME,
      IndexName: REVERSE_INDEX,
      KeyConditionExpression: 'sid = :sid AND begins_with(pid, :pid)',
      ExpressionAttributeValues: {
        ':pid': { S: PersonRepository.GROUP },
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

  public async getPersonById(personId: string): Promise<PersonModel> {
    const params = {
      TableName: TABLE_CONTACT_NAME,
      KeyConditionExpression: 'pid = :pid',
      ExpressionAttributeValues: {
        ':pid': { S: personId },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      return this.mapToDomain(data.Items[0]);
    } catch (error) {
      throw error;
    }
  }

  public async updatePerson(
    personId: string,
    person: PersonModel,
  ): Promise<PersonModel> {
    const params = new UpdateCommand({
      TableName: TABLE_CONTACT_NAME,
      Key: {
        pid: personId,
        sid: DomainSession.getTenantId(),
      },
      UpdateExpression: 'SET #name = :name, #personInfo = :personInfo',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#personInfo': 'personInfo',
      },
      ExpressionAttributeValues: {
        ':name': person.name,
        ':personInfo': person.personInfo
          ? JSON.stringify(person.personInfo)
          : '',
      },
      ReturnValues: 'ALL_NEW',
    });
    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return person;
    } catch (error) {
      throw error;
    }
  }

  public async deletePerson(personId: string): Promise<any> {
    try {
      return await this.fullClientDynamodb.fullClient.deleteItem({
        Key: {
          pid: { S: personId },
          sid: { S: DomainSession.getTenantId() },
        },
        TableName: TABLE_CONTACT_NAME,
      });
    } catch (error) {
      throw error;
    }
  }

  private createNewItemFromDomainModel(person: PersonModel) {
    let item: PersonDTO = {
      name: { S: person.name },
    };
    if (person.personInfo) {
      item.personInfo = { S: JSON.stringify(person.personInfo) };
    }
    const pidsid = TUID.generateCreztuIDDynamoDBBasedOnTenant(
      PersonRepository.GROUP,
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

  private mapToDomain(item: PersonDTO): PersonModel {
    const newItem: PersonModel = {
      id: item.pid.S,
      name: item.name.S,
      personInfo:
        item.personInfo && item.personInfo.S !== ''
          ? JSON.parse(item.personInfo.S)
          : '',
    };
    return newItem;
  }
}
