import { Injectable, NotFoundException } from "@nestjs/common";
import { ClientDynamodb } from "src/infrastructure/dynamodb/client.dynamodb";
import { SubscriptionModel } from "./subscription.model";
import {
  REVERSE_INDEX,
  TABLE_NAME,
} from "src/infrastructure/dynamodb/intializer/Constants";
import { PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import * as moment from "moment";
import { SUBS_GROUP } from "src/common/constants/const";
import { SubscriptionDTO } from "../rest/subscriptionDTO";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

@Injectable()
export class SubscriptionRepository {
  public static GROUP = SUBS_GROUP;
  constructor(private fullClientDynamodb: ClientDynamodb) {}

  public async subscriptionCreate(
    subscription: SubscriptionModel,
    tenant: string
  ): Promise<SubscriptionModel> {
    const item = this.createNewItemFromDomainModel(subscription, tenant);
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

  public async getSubscriptions(tenant?: string) {
    const buildPid = SubscriptionRepository.GROUP + "-" + tenant;
    const params = {
      TableName: TABLE_NAME,
      IndexName: REVERSE_INDEX,
      KeyConditionExpression: "sid = :sid AND begins_with(pid, :pid)",
      ExpressionAttributeValues: {
        ":pid": { S: tenant ? buildPid : SubscriptionRepository.GROUP },
        ":sid": { S: SubscriptionRepository.GROUP },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      return data.Items.map((item: any) => this.mapToDomain(item));
    } catch (error) {
      throw error;
    }
  }

  public async updateSubscription(tenant: string, subs: SubscriptionDTO) {
    const buildPid = SubscriptionRepository.GROUP + "-" + tenant;

    const UpdateExpression =
      "SET customerInformation = :customerInformation, billingInformation = :billingInformation, pendingPayments = :pendingPayments, planInformation = :planInformation";

    const ExpressionAttributeValues = {
      ":customerInformation": subs.customerInformation,
      ":billingInformation": subs.billingInformation,
      ":pendingPayments": subs.pendingPayments,
      ":planInformation": subs.planInformation,
    };

    const params = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        pid: buildPid,
        sid: SubscriptionRepository.GROUP,
      },
      UpdateExpression: UpdateExpression,
      ExpressionAttributeValues: ExpressionAttributeValues,
      ReturnValues: "ALL_NEW",
    });
    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return subs;
    } catch (error) {
      throw error;
    }
  }

  public async updateSubsPendingPayment(
    tenant: string,
    pendingPayments: boolean
  ) {
    const buildPid = SubscriptionRepository.GROUP + "-" + tenant;

    const UpdateExpression = "SET pendingPayments = :pendingPayments";
    const ExpressionAttributeValues = {
      ":pendingPayments": pendingPayments,
    };
    const params = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        pid: buildPid,
        sid: SubscriptionRepository.GROUP,
      },
      UpdateExpression: UpdateExpression,
      ExpressionAttributeValues: ExpressionAttributeValues,
      ReturnValues: "ALL_NEW",
    });
    try {
      await this.fullClientDynamodb.fullClient.send(params);
      console.log("success");
      return { message: "Pending Payments updated success" };
    } catch (error) {
      throw error;
    }
  }

  // FOR CANCEL SUBSCRIPTION
  public async putCustomerInfoSubscription(tenant: string, customerInfo: any) {
    const buildPid = SubscriptionRepository.GROUP + "-" + tenant;
    const UpdateExpression = "SET customerInformation = :customerInformation";
    const ExpressionAttributeValues = {
      ":customerInformation": customerInfo,
    };
    const params = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        pid: buildPid,
        sid: SubscriptionRepository.GROUP,
      },
      UpdateExpression: UpdateExpression,
      ExpressionAttributeValues: ExpressionAttributeValues,
      ReturnValues: "ALL_NEW",
    });
    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return { message: "Subscritión updated status success" };
    } catch (error) {
      throw error;
    }
  }

  public async deleteSubscription(tenant: string): Promise<any> {
    const buildPid = SubscriptionRepository.GROUP + "-" + tenant;
    const params = {
      TableName: TABLE_NAME,
      Key: {
        pid: { S: buildPid },
        sid: { S: SubscriptionRepository.GROUP },
      },
    };
    try {
      const subsDelete = await this.fullClientDynamodb.fullClient.deleteItem(
        params
      );
      if (subsDelete.ConsumedCapacity) {
        return { message: "Subscription not found" };
      } else {
        return { message: "Subscription deleted success" };
      }
    } catch (error) {
      throw new NotFoundException("Subscription to delete not found");
    }
  }

  private createNewItemFromDomainModel(c: SubscriptionModel, tenant: string) {
    const currentDate = moment().subtract(5, "hours");
    const customerData = c.customerInformation
      ? JSON.stringify(c.customerInformation)
      : JSON.stringify({});
    let item: any = {
      billingInformation: { S: JSON.stringify(c.billingInformation) },
      creationDate: { S: currentDate.toISOString() },
      customerInformation: { S: customerData },
      pendingPayments: { S: c.pendingPayments },
      planInformation: { S: JSON.stringify(c.planInformation) },
      gateway: { S: c.gateway },
    };

    const buildPid = SubscriptionRepository.GROUP + "-" + tenant;
    item = {
      ...item,
      pid: { S: buildPid },
      sid: { S: SubscriptionRepository.GROUP },
    };
    return item;
  }

  private mapToDomain(item: any): SubscriptionModel {
    const newItem: SubscriptionModel = {
      subsID: item.pid.S,
      billingInformation: JSON.parse(item.billingInformation.S),
      creationDate: item.creationDate.S,
      customerInformation: JSON.parse(item.customerInformation.S),
      pendingPayments: Boolean(item.pendingPayments.S),
      planInformation: JSON.parse(item.planInformation.S),
      gateway: item.gateway.S,
    };
    return newItem;
  }
}
