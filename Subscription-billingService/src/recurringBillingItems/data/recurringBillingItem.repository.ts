import { Injectable, NotFoundException } from "@nestjs/common";
import { ClientDynamodb } from "src/infrastructure/dynamodb/client.dynamodb";
import { RecurringBillingItemModel } from "./recurringBillingItem.model";
import generatorCode from "src/common/utils/generateCode";
import {
  INDEX_ONE,
  INDEX_ONE_TWO,
  REVERSE_INDEX,
  TABLE_NAME,
} from "src/infrastructure/dynamodb/intializer/Constants";
import { PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import * as moment from "moment";
import { RECURRING_GROUP } from "src/common/constants/const";

@Injectable()
export class RecurringBillingItemRepository {
  public static GROUP = RECURRING_GROUP;
  constructor(private fullClientDynamodb: ClientDynamodb) {}

  public async recurringBillingItemCreate(
    RecurringBillingItem: RecurringBillingItemModel,
    tenant: string,
    nextPay?: string
  ): Promise<RecurringBillingItemModel> {
    const item = this.createNewItemFromDomainModel(
      RecurringBillingItem,
      tenant,
      nextPay
    );

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

  public async getRecurrings(date: string) {
    const params = {
      TableName: TABLE_NAME,
      IndexName: INDEX_ONE,
      KeyConditionExpression: "attri1 = :attri1",
      ExpressionAttributeValues: {
        ":attri1": { S: date },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      return data.Items.map((item: any) => this.mapToDomain(item));
    } catch (error) {
      throw error;
    }
  }

  public async getLastRecurringBill(tenant: string) {
    const generateSid = RecurringBillingItemRepository.GROUP + "-" + tenant;
    const currentDate = moment().format("YYYY-MM-DD");
    const params = {
      TableName: TABLE_NAME,
      IndexName: REVERSE_INDEX,
      KeyConditionExpression: "sid = :sid AND begins_with(pid, :pid)",
      FilterExpression: "attri1 >= :attri1",
      ExpressionAttributeValues: {
        ":sid": { S: generateSid },
        ":pid": { S: RecurringBillingItemRepository.GROUP },
        ":attri1": { S: currentDate },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      return data.Items.map((item: any) => this.mapToDomain(item));
    } catch (error) {
      throw error;
    }
  }

  public async getRecurringByAttri() {
    const params = {
      TableName: TABLE_NAME,
      IndexName: INDEX_ONE_TWO,
      KeyConditionExpression: "attri2 = :attri2",
      ExpressionAttributeValues: {
        ":attri2": { S: RecurringBillingItemRepository.GROUP },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      return data.Items.map((item: any) => this.mapToDomain(item));
    } catch (error) {
      throw error;
    }
  }

  // public async updateNextDatePayment(newDate: string) {}

  public async deleteRecurring(recurringCode: string, tenant: string) {
    const generateSid = RecurringBillingItemRepository.GROUP + "-" + tenant;
    const params = {
      TableName: TABLE_NAME,
      Key: {
        pid: { S: recurringCode },
        sid: { S: generateSid },
      },
    };
    try {
      const blogDelete = await this.fullClientDynamodb.fullClient.deleteItem(
        params
      );
      if (blogDelete.ConsumedCapacity) {
        return { message: "recurring not found" };
      } else {
        return { message: "recurring deleted success" };
      }
    } catch (error) {
      throw new NotFoundException("recurring to delete not found");
    }
  }

  private createNewItemFromDomainModel(
    c: RecurringBillingItemModel,
    tenant: string,
    nextPay?: string
  ) {
    const momentDate = moment(nextPay);
    const newNextPaymenteDate = momentDate.add(1, "day").format("YYYY-MM-DD");
    let nextPaymentDate = "";
    let billingFrequency = "";
    const currentDate = moment().subtract(5, "hours");
    if (
      c.billingFrequency.toLowerCase() === "monthly" ||
      c.billingFrequency.toLowerCase() === "month"
    ) {
      nextPaymentDate = moment().add(30, "days").format("YYYY-MM-DD");
      billingFrequency = "monthly";
    }
    if (
      c.billingFrequency.toLowerCase() === "yearly" ||
      c.billingFrequency.toLowerCase() === "year"
    ) {
      nextPaymentDate = moment().add(365, "days").format("YYYY-MM-DD");
      billingFrequency = "yearly";
    }
    if (
      c.billingFrequency.toLowerCase() === "weekly" ||
      c.billingFrequency.toLowerCase() === "week"
    ) {
      nextPaymentDate = moment().add(7, "days").format("YYYY-MM-DD");
      billingFrequency = "weekly";
    }
    if (
      c.billingFrequency.toLowerCase() === "day" ||
      c.billingFrequency.toLowerCase() === "daily"
    ) {
      nextPaymentDate = moment().add(1, "days").format("YYYY-MM-DD");
      billingFrequency = "daily";
    }
    let item: any = {
      billingFrequency: { S: billingFrequency },
      itemCode: { S: c.itemCode },
      itemDescription: { S: c.itemDescription },
      startBillingDate: { S: currentDate.toISOString() },
    };
    // const pidsid = TUID.generateCreztuIDDynamoDBBasedOnTenant(
    //   BlogRepository.GROUP,
    // );
    const buildPid = generatorCode(RecurringBillingItemRepository.GROUP);
    const buildSid = RecurringBillingItemRepository.GROUP + "-" + tenant;
    item = {
      ...item,
      pid: { S: buildPid },
      sid: { S: buildSid },
      attri1: {
        S: newNextPaymenteDate ? newNextPaymenteDate : nextPaymentDate,
      },
      attri2: { S: RecurringBillingItemRepository.GROUP },
      itemSource: { S: buildSid },
    };
    return item;
  }

  private mapToDomain(item: any): RecurringBillingItemModel {
    const newItem: RecurringBillingItemModel = {
      tenant: item.sid.S,
      bitID: item.pid.S,
      billingFrequency: item.billingFrequency.S,
      itemCode: item.itemCode.S,
      itemDescription: item.itemDescription.S,
      itemSource: item.itemSource.S,
      startBillingDate: item.startBillingDate.S,
      nextPaymentDate: item.attri1.S,
    };
    return newItem;
  }
}
