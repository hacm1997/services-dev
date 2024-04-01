import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientDynamodb } from 'src/infrastructure/dynamodb/client';
import { TagsModel } from './tags.model';
import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { TABLE_NAME } from 'src/infrastructure/dynamodb/intializer/Constants';

@Injectable()
export class TagsRepository {
  public static GROUP = 'TAG';
  constructor(private fullClientDynamodb: ClientDynamodb) {}
  public async TagCreate(tag: TagsModel, tenant: string): Promise<TagsModel> {
    const item = this.createNewItemFromDomainModel(tag, tenant);

    const artifact: PutItemCommandInput = {
      TableName: TABLE_NAME,
      Item: item,
    };
    try {
      await this.fullClientDynamodb.fullClient.putItem(artifact);
      return this.mapToDomain(item);
    } catch (error) {
      throw error;
    }
  }

  public async geTagsByVehicle(
    vehicle: string,
    tenant: string,
  ): Promise<any[]> {
    const tenantNew = TagsRepository.GROUP + '#' + tenant;
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: 'pid = :pid',
      FilterExpression: 'begins_with(description, :description)',
      ExpressionAttributeValues: {
        ':pid': { S: tenantNew },
        ':description': { S: vehicle },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      return data.Items.map((item: any) => this.mapToDomain(item));
    } catch (error) {
      throw error;
    }
  }

  public async getTagsByCode(tagCode: string, tenant: string): Promise<any[]> {
    const tenantNew = TagsRepository.GROUP + '#' + tenant;
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: 'pid = :pid AND sid = :sid',
      ExpressionAttributeValues: {
        ':pid': { S: tenantNew },
        ':sid': { S: tagCode },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      return data.Items.map((item: any) => this.mapToDomain(item));
    } catch (error) {
      throw error;
    }
  }

  public async getAllTags(tenant: string): Promise<any[]> {
    const tenantNew = TagsRepository.GROUP + '#' + tenant;
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: 'pid = :pid',
      ExpressionAttributeValues: {
        ':pid': { S: tenantNew },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      return data.Items.map((item: any) => this.mapToDomainAll(item));
    } catch (error) {
      throw error;
    }
  }

  public async putTag(
    id: string,
    tag: TagsModel,
    tenant: string,
  ): Promise<any> {
    const delteTagReq = await this.deleteTag(tenant, id)
      .then(async () => {
        const newTag = await this.TagCreate(tag, tenant).then(() => {
          return { message: 'Tag update succesfull' };
        });
        return newTag;
      })
      .catch(() => {
        throw new NotFoundException('tag to delete not found');
      });
    return delteTagReq;
  }

  public async deleteTag(tenant: string, sid: string): Promise<any> {
    const tenantNew = TagsRepository.GROUP + '#' + tenant;
    const params = {
      TableName: TABLE_NAME,
      Key: {
        pid: { S: tenantNew },
        sid: { S: sid },
      },
    };
    try {
      const tagDelete = await this.fullClientDynamodb.fullClient.deleteItem(
        params,
      );
      if (tagDelete.ConsumedCapacity) {
        return { message: 'Tag not found' };
      } else {
        return { message: 'tag deleted success' };
      }
    } catch (error) {
      throw new NotFoundException('tag to delete not found');
    }
  }

  private createNewItemFromDomainModel(c: TagsModel, tenant: string) {
    let item: any = {
      sid: { S: c.description },
      description: { S: c.tags },
    };

    const buildTenant = TagsRepository.GROUP + '#' + tenant;
    item = { ...item, pid: { S: buildTenant } };
    return item;
  }

  private mapToDomain(item: any): TagsModel {
    const newItem: TagsModel = {
      tenantId: item.pid.S,
      tags: item.description.S,
      description: item.sid.S,
    };
    return newItem;
  }
  private mapToDomainAll(item: any): TagsModel {
    const newItem: TagsModel = {
      tags: item.description.S,
      description: item.sid.S,
    };
    return newItem;
  }
}
