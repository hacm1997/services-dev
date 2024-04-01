import { Injectable, NotFoundException } from "@nestjs/common";
import { ClientDynamodb } from "src/infrastructure/dynamodb/client.dynamodb";
import { BillItemModel } from "./billItem.model";
import {
  REVERSE_INDEX,
  TABLE_NAME,
} from "src/infrastructure/dynamodb/intializer/Constants";
import { PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import generatorCode from "src/common/utils/generateCode";
import { BILL_GROUP } from "src/common/constants/const";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

@Injectable()
export class BillItemRepository {
  public static GROUP = BILL_GROUP;
  constructor(private fullClientDynamodb: ClientDynamodb) {}

  public async billItemCreate(
    billItem: BillItemModel,
    tenant: string
  ): Promise<BillItemModel> {
    const item = this.createNewItemFromDomainModel(billItem, tenant);
    console.log("item in method create => ", item);
    const artifact: PutItemCommandInput = {
      TableName: TABLE_NAME,
      Item: item,
    };
    try {
      await this.fullClientDynamodb.fullClient.putItem(artifact);
      return this.mapToDomain(item);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getBillItems(tenant?: string) {
    const buildSid = BillItemRepository.GROUP + "-" + tenant;
    const params = {
      TableName: TABLE_NAME,
      IndexName: REVERSE_INDEX,
      KeyConditionExpression: "sid = :sid AND begins_with(pid, :pid)",
      ExpressionAttributeValues: {
        ":sid": { S: buildSid },
        ":pid": { S: BillItemRepository.GROUP },
      },
    };
    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);
      console.log(
        "data bill => ",
        data.Items.map((item: any) => this.mapToDomain(item))
      );
      return data.Items.map((item: any) => this.mapToDomain(item));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async updateBillItem(tenant: string, bill: any, pid: string) {
    const UpdateExpression =
      "SET billId = :billId, billItemDate = :billItemDate";
    const ExpressionAttributeValues = {
      ":billId": bill.billId,
      ":billItemDate": bill.billItemDate,
    };
    const buildSid = BillItemRepository.GROUP + "-" + tenant;
    const params = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        pid: pid,
        sid: buildSid,
      },
      UpdateExpression: UpdateExpression,
      ExpressionAttributeValues: ExpressionAttributeValues,
      ReturnValues: "ALL_NEW",
    });
    // console.log("param update => ", params);
    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return bill;
    } catch (error) {
      throw error;
    }
  }

  public async deleteBillItem(billId: string, tenant: string): Promise<any> {
    const buildSid = BillItemRepository.GROUP + "-" + tenant;
    const params = {
      TableName: TABLE_NAME,
      Key: {
        pid: { S: billId },
        sid: { S: buildSid },
      },
    };
    try {
      const billItemDelete =
        await this.fullClientDynamodb.fullClient.deleteItem(params);
      if (billItemDelete.ConsumedCapacity) {
        return { message: "Bill item not found" };
      } else {
        return { message: "Bill item deleted success" };
      }
    } catch (error) {
      throw new NotFoundException("Bill item to delete not found");
    }
  }
  private createNewItemFromDomainModel(c: BillItemModel, tenant: string) {
    console.log("create new item from domain model");
    const amount_price = c.price;
    let item: any = {
      itemCode: { S: c.itemCode },
      price: { N: amount_price },
      billId: { S: "" },
      billItemDate: { S: "" },
    };
    const buildPid = generatorCode(BillItemRepository.GROUP);
    const buildSid = BillItemRepository.GROUP + "-" + tenant;
    item = {
      ...item,
      pid: { S: buildPid },
      sid: { S: buildSid },
      itemSource: { S: buildSid },
    };
    console.log("bill item created => ", item);
    return item;
  }

  private mapToDomain(item: any): BillItemModel {
    const newItem: BillItemModel = {
      pid: item.pid.S,
      tenant: item.sid.S,
      billId: item.billId ? item.billId.S : "",
      billItemDate: item.billItemDate ? item.billItemDate.S : "",
      itemCode: item.itemCode.S,
      itemSource: item.itemSource.S,
      price: item.price.N,
    };
    return newItem;
  }
}
