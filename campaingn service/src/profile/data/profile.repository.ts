import { ProfileModel } from './profile.model';
import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
import { TUUID } from '../../infrastructure/dynamodb/UUID/TUUID';
import { TABLE_NAME } from '../../infrastructure/dynamodb/constants/constant';
import * as console from 'console';
import { ClientDynamodb } from '../../infrastructure/dynamodb/client.dynamodb';

@Injectable()
export class ProfileRepository {
  public static GROUP = 'TED-PRF';

  constructor(private fullClientDynamodb: ClientDynamodb) {}

  public async profileCreate(profile: ProfileModel): Promise<ProfileModel> {
    const existingProfile = await this.profileFindByEmail(profile.email);

    if (existingProfile) {
      return existingProfile;
    } else {
      let item = this.mapToData(profile);
      item = {
        ...item,
        pid: { S: TUUID.generateUID(ProfileRepository.GROUP) },
      };
      const artifact: PutItemCommandInput = {
        TableName: TABLE_NAME,
        Item: item,
      };
      console.log(`ARTIFACT TO CREATE ${JSON.stringify(artifact)}`);
      await this.fullClientDynamodb.fullClient.putItem(artifact);
      return this.mapToDomain(item);
    }
  }

  public async profileFindByEmail(email: string): Promise<ProfileModel | null> {
    // Realiza una búsqueda en DynamoDB por correo
    // y devuelve el perfil si existe, o null si no existe
    const param = {
      TableName: TABLE_NAME,
      FilterExpression: '#email = :email',
      ExpressionAttributeNames: {
        '#email': 'email',
      },
      ExpressionAttributeValues: {
        ':email': { S: email },
      },
    };

    const result = await this.fullClientDynamodb.fullClient.scan(param);

    if (result.Items && result.Items.length > 0) {
      return this.mapToDomain(result.Items[0]);
    }

    return null;
  }

  private mapToData(profile: ProfileModel) {
    const item: any = {
      pid: { S: '' },
      sid: { S: ProfileRepository.GROUP },
      name: { S: profile.name },
      email: { S: profile.email },
    };
    return item;
  }

  private mapToDomain(item: any): ProfileModel {
    return {
      id: item.pid,
      name: item.name,
      email: item.email,
    };
  }
}
