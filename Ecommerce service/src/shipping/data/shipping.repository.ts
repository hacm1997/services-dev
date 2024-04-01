import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { ClientDynamodb } from 'src/infrastructure/dynamodb/client';
import {
  SHIPPING_GROUP,
  TABLE_NAME,
} from 'src/infrastructure/dynamodb/intializer/Constants';
import { ShippingModelData } from 'src/infrastructure/model/shipping/shipping.model.data';
import transformData from './transform-data';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';

export interface ShippingRepository {
  createShipping: (product: ShippingModelData) => Promise<ShippingModelData>;
  getAllShipping: (shippingCode: string) => Promise<ShippingModelData[] | null>;
  getShippingByCode: (
    shippingCode: string,
    tenantID: string,
  ) => Promise<ShippingModelData[] | null>;
  putShipping: (
    tenantID: string,
    shipping: ShippingModelData,
  ) => Promise<ShippingModelData>;
  deleteShipping: (id: string, tenantID: string) => Promise<any>;
}
@Injectable()
export class ShippingRepositoryImpl implements ShippingRepository {
  constructor(private fullClientDynamodb: ClientDynamodb) {}
  static GROUP = SHIPPING_GROUP;
  static appService = new AppService();

  public async createShipping(
    shipping: ShippingModelData,
  ): Promise<ShippingModelData> {
    const artifact: PutItemCommandInput = {
      TableName: TABLE_NAME,
      Item: shipping.getItem() as any,
    };
    console.log(`SHIPPING TO CREATE ${JSON.stringify(artifact)}`);
    await this.fullClientDynamodb.fullClient.putItem(artifact);
    return shipping;
  }

  async getAllShipping(tenantID: string): Promise<any | null> {
    const generateTenant = ShippingRepositoryImpl.GROUP + '#' + tenantID;
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: 'pid = :tenant',
      ExpressionAttributeValues: {
        ':tenant': {
          S: generateTenant,
        },
      },
    };
    // console.log('params to get shipping => ', params);

    const resulTwo = await this.fullClientDynamodb.fullClient.query(params);
    const result = await ShippingRepositoryImpl.appService.getAllData(
      params,
      resulTwo,
      [],
    );
    // console.log('resulTwo => ', resulTwo);

    return transformData(result);
  }

  async getShippingByCode(
    tenantID: string,
    shippingCode: string,
  ): Promise<ShippingModelData[] | null> {
    const buildTenant = SHIPPING_GROUP + '#' + tenantID;
    const buildCode = SHIPPING_GROUP + '-' + shippingCode;
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: 'pid = :tenant AND sid = :shippingCode',
      ExpressionAttributeValues: {
        ':tenant': {
          S: buildTenant,
        },
        ':shippingCode': {
          S: buildCode,
        },
      },
    };

    const resulTwo = await this.fullClientDynamodb.fullClient.query(params);
    const appService = new AppService();
    const result = await appService.getAllData(params, resulTwo, []);

    return transformData(result);
  }

  async putShipping(
    tenantID: string,
    shipping: ShippingModelData,
  ): Promise<ShippingModelData> {
    const buildTenant = SHIPPING_GROUP + '#' + tenantID;
    const buildCode = SHIPPING_GROUP + '-' + shipping.city;

    const updateExpression = 'SET city = :city, price = :price';
    const updateExpressionTwo =
      'SET city = :city, price = :price, extraInfo = :extraInfo';

    const expressionAttributeValues = {
      ':city': shipping.city,
      ':price': shipping.price,
    };
    const expressionAttributeValuesTwo = {
      ':city': shipping.city,
      ':price': shipping.price,
      ':extraInfo': shipping.extraInfo ? shipping.extraInfo : undefined,
    };

    const params = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        pid: buildTenant,
        sid: buildCode,
      },
      UpdateExpression: shipping.extraInfo
        ? updateExpressionTwo
        : updateExpression,
      ExpressionAttributeValues: shipping.extraInfo
        ? expressionAttributeValuesTwo
        : expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });

    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return shipping;
    } catch (error) {
      throw error;
    }
  }

  async deleteShipping(sid: string, tenantID: string): Promise<any> {
    const buildTenant = SHIPPING_GROUP + '#' + tenantID;
    const params = {
      TableName: TABLE_NAME,
      Key: {
        pid: { S: buildTenant },
        sid: { S: sid },
      },
    };
    try {
      const tagDelete = await this.fullClientDynamodb.fullClient.deleteItem(
        params,
      );
      if (tagDelete.ConsumedCapacity) {
        return { message: 'Shipping not found' };
      } else {
        return { message: 'Shipping deleted success' };
      }
    } catch (error) {
      throw error;
    }
  }
}
