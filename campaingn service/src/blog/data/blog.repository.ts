import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogModel } from './blog.model';
import {
  // REVERSE_INDEX,
  TABLE_BLOG_NAME,
} from 'src/infrastructure/dynamodb/intializer/Constants';
import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { ClientDynamodb } from 'src/infrastructure/dynamodb/client.dynamodb';
import generatorSID from '../utils/genarateCode';
import { BlogDTO } from '../rest/blogDTO';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

interface PaginationResult {
  items: BlogModel[];
  lastEvaluatedKey: DocumentClient.Key;
}

interface ExtendedPaginationResult {
  results: PaginationResult[];
  totalPages: number;
}

@Injectable()
export class BlogRepository {
  public static GROUP = 'BLG';
  constructor(private fullClientDynamodb: ClientDynamodb) {}
  public async blogCreate(blog: BlogModel, tenant: string): Promise<BlogModel> {
    const item = this.createNewItemFromDomainModel(blog, tenant);

    const artifact: PutItemCommandInput = {
      TableName: TABLE_BLOG_NAME,
      Item: item,
    };
    try {
      await this.fullClientDynamodb.fullClient.putItem(artifact);
      return this.mapToDomain(item);
    } catch (error) {
      throw error;
    }
  }

  public async getAllBlogs(tenant: string): Promise<any[]> {
    const tenantNew = BlogRepository.GROUP + '-' + tenant;
    const params = {
      TableName: TABLE_BLOG_NAME,
      KeyConditionExpression: 'pid = :pid',
      ExpressionAttributeValues: {
        ':pid': { S: tenantNew },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      return data.Items.map((item: any) => this.mapToDomain(item));
    } catch (error) {
      throw error;
    }
  }

  public async getBlogsByPage(
    tenant: string,
    pageNumber: number,
    pageSize: number,
    lastEvaluatedKey?: DocumentClient.Key,
  ): Promise<PaginationResult> {
    const tenantNew = BlogRepository.GROUP + '-' + tenant;
    const params: DocumentClient.QueryInput = {
      TableName: TABLE_BLOG_NAME,
      KeyConditionExpression: 'pid = :pid',
      ExpressionAttributeValues: {
        ':pid': { S: tenantNew },
      },
      Limit: pageSize,
    };

    if (lastEvaluatedKey) {
      params.ExclusiveStartKey = lastEvaluatedKey;
    }

    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);

      // Apply pagination filtering
      const startItemIndex = lastEvaluatedKey ? 0 : (pageNumber - 1) * pageSize;
      const endItemIndex = startItemIndex + pageSize;
      const filteredItems = data.Items.slice(startItemIndex, endItemIndex);

      // Return results mapped to your domain and the LastEvaluatedKey if it exists
      const result: PaginationResult = {
        items: filteredItems.map((item: any) => this.mapToDomain(item)),
        lastEvaluatedKey: data.LastEvaluatedKey,
      };

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async fetchResultsWithPagination(
    tenant: string,
    pageNumber: number,
    pageSize: number,
    lastEvaluatedKey?: DocumentClient.Key,
    accumulatedResults: PaginationResult[] = [],
  ): Promise<ExtendedPaginationResult> {
    const result = await this.getBlogsByPage(
      tenant,
      pageNumber,
      pageSize,
      lastEvaluatedKey,
    );

    // Store the lastEvaluatedKey for the next call
    lastEvaluatedKey = result.lastEvaluatedKey;

    // Adds the current results to the accumulated array
    accumulatedResults.push(result);

    if (lastEvaluatedKey) {
      // Increment the page number only if there are more results
      pageNumber++;

      // Make another call if there are more results
      return this.fetchResultsWithPagination(
        tenant,
        pageNumber,
        pageSize,
        lastEvaluatedKey,
        accumulatedResults,
      );
    }

    return { results: accumulatedResults, totalPages: pageNumber };
  }

  private getLastEvaluatedKey(
    lastEvaluatedKeyFromPreviousCall: DocumentClient.Key,
  ): DocumentClient.Key {
    // Devuelve la clave de continuación tal como la recibiste de la llamada anterior
    return lastEvaluatedKeyFromPreviousCall;
  }

  public async getBlogById(id: string, tenant: string): Promise<BlogModel> {
    const tenantNew = BlogRepository.GROUP + '-' + tenant;
    return this.mapToDomain(await this.getBlogItemByKey(id, tenantNew));
  }
  private async getBlogItemByKey(id: string, tenant: string): Promise<any> {
    try {
      const blog = await this.fullClientDynamodb.fullClient.getItem({
        Key: {
          pid: { S: tenant },
          sid: { S: id },
        },
        TableName: TABLE_BLOG_NAME,
      });
      return blog.Item;
    } catch (error) {
      throw error;
    }
  }

  public async putBlog(
    id: string,
    blog: BlogDTO,
    tenant: string,
  ): Promise<BlogModel> {
    const tenantNew = BlogRepository.GROUP + '-' + tenant;
    const expressionAttributeNames = {
      '#product_status': 'status',
    };
    const params = new UpdateCommand({
      TableName: TABLE_BLOG_NAME,
      Key: {
        pid: tenantNew,
        sid: id,
      },
      UpdateExpression:
        'SET title = :title, image = :image, content = :content, #product_status = :status, extraInfo = :extraInfo, createdAt = :createdAt',
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: {
        ':title': blog.title,
        ':image': blog.image,
        ':content': blog.content,
        ':status': blog.status,
        ':extraInfo': JSON.stringify(blog.extraInfo) || null,
        ':createdAt': new Date().toISOString(),
      },
      ReturnValues: 'ALL_NEW',
    });
    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return blog;
    } catch (error) {
      throw error;
    }
  }

  public async putBlogStatus(
    id: string,
    status: string,
    tenant: string,
  ): Promise<any> {
    const tenantNew = BlogRepository.GROUP + '-' + tenant;
    const updateExpression = 'SET #blog_status = :status';
    const expressionAttributeValues = {
      ':status': status,
    };
    const expressionAttributeNames = {
      '#blog_status': 'status',
    };

    const params = new UpdateCommand({
      TableName: TABLE_BLOG_NAME,
      Key: {
        pid: tenantNew,
        sid: id,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });

    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return { message: 'Blog status updated successfull' };
    } catch (error) {
      throw error;
    }
  }

  public async deleteBlog(tenant: string, sid: string): Promise<any> {
    const tenantNew = BlogRepository.GROUP + '-' + tenant;
    const params = {
      TableName: TABLE_BLOG_NAME,
      Key: {
        pid: { S: tenantNew },
        sid: { S: sid },
      },
    };
    try {
      const blogDelete =
        await this.fullClientDynamodb.fullClient.deleteItem(params);
      if (blogDelete.ConsumedCapacity) {
        return { message: 'Blog not found' };
      } else {
        return { message: 'Blog deleted success' };
      }
    } catch (error) {
      throw new NotFoundException('Blog to delete not found');
    }
  }

  private createNewItemFromDomainModel(c: BlogModel, tenant: string) {
    const currentDate = new Date();
    let item: any = {
      title: { S: c.title },
      image: { S: c.image },
      content: { S: c.content },
      status: { S: c.status },
      createdAt: { S: currentDate.toISOString() },
    };
    if (c.extraInfo) {
      item.extraInfo = { S: JSON.stringify(c.extraInfo) };
    }
    // const pidsid = TUID.generateCreztuIDDynamoDBBasedOnTenant(
    //   BlogRepository.GROUP,
    // );
    const buildSid = generatorSID(BlogRepository.GROUP);
    const buildTenant = BlogRepository.GROUP + '-' + tenant;
    item = { ...item, pid: { S: buildTenant }, sid: { S: buildSid } };
    return item;
  }

  private mapToDomain(item: any): BlogModel {
    const newItem: BlogModel = {
      tenantId: item.sid.S,
      id: item.sid.S,
      title: item.title.S,
      image: item.image.S,
      content: item.content.S,
      status: item.status.S,
      createdAt: item.createdAt.S,
    };
    if (item.extraInfo) {
      newItem.extraInfo = JSON.parse(item.extraInfo.S);
    }
    return newItem;
  }
}
