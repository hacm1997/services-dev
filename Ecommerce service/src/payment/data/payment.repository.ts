import { PaymentModelData } from '../../infrastructure/model/payment/payment.model.data';
import { Injectable } from '@nestjs/common';
import { ClientDynamodb } from '../../infrastructure/dynamodb/client';
import { TABLE_PAYMENT_NAME } from '../../infrastructure/dynamodb/intializer/Constants';
import { PutItemCommandInput } from '@aws-sdk/client-dynamodb/dist-types/commands';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { AppService } from 'src/app.service';
import transformData from './transform-data';

export interface PaymentRepository {
  createPayment: (payment: PaymentModelData) => Promise<PaymentModelData>;
  // getAllPayments: (id: string) => Promise<PaymentModelData[] | null>;
  getPaymentsByCustomer: (
    tenantID: string,
    customer: string,
  ) => Promise<PaymentModelData[] | null>;
  putPayment: (
    tenantID: string,
    payment: PaymentModelData,
  ) => Promise<PaymentModelData>;
}
@Injectable()
export class PaymentRepositoryImpl implements PaymentRepository {
  // constructor(private s3Service: S3Service) {}
  constructor(private fullClientDynamodb: ClientDynamodb) {}
  public async createPayment(
    payment: PaymentModelData,
  ): Promise<PaymentModelData> {
    const artifact: PutItemCommandInput = {
      TableName: TABLE_PAYMENT_NAME,
      Item: payment.getItem() as any,
    };
    console.log(`ARTIFACT TO CREATE ${JSON.stringify(artifact)}`);
    await this.fullClientDynamodb.fullClient.putItem(artifact);
    return payment;
  }

  async getPaymentsByCustomer(
    tenantID: string,
    customer: string,
  ): Promise<PaymentModelData[] | null> {
    const tenant = 'Payment#' + tenantID;
    console.log(tenant, customer);
    const params = {
      TableName: TABLE_PAYMENT_NAME,
      KeyConditionExpression: 'pid = :tenant AND sid = :customer',
      ExpressionAttributeValues: {
        ':tenant': {
          S: tenant,
        },
        ':customer': {
          S: customer,
        },
      },
    };

    console.log(params);

    const resulTwo = await this.fullClientDynamodb.fullClient.query(params);
    console.log(resulTwo);
    const appService = new AppService();
    const result = await appService.getAllData(params, resulTwo, []);

    return transformData(result);
  }

  async putPayment(tenantID: string, payment: any): Promise<PaymentModelData> {
    const tenantRefactor = 'Payment#' + tenantID;
    const updateExpression =
      'SET key_code = :key_code, createdAt = :createdAt, extraInfo = :extraInfo'; // Utiliza el alias #payment_name

    const expressionAttributeValues = {
      ':key_code': payment.key_code,
      ':createdAt': payment.createdAt,
      ':extraInfo': payment.extraInfo
        ? JSON.stringify(payment.extraInfo)
        : { NULL: true },
    };

    const params = new UpdateCommand({
      TableName: TABLE_PAYMENT_NAME,
      Key: {
        pid: tenantRefactor,
        sid: payment.id,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });

    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return payment;
    } catch (error) {
      throw error;
    }
  }
}
