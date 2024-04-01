import { Injectable, NotFoundException } from "@nestjs/common";
import { INVOICE_GROUP } from "src/common/constants/const";
import { ClientDynamodb } from "src/infrastructure/dynamodb/client.dynamodb";
import { InvoiceModel } from "./invoice.model";
import { PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { TABLE_NAME } from "src/infrastructure/dynamodb/intializer/Constants";
import * as moment from "moment";
import generatorCode from "src/common/utils/generateCode";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

@Injectable()
export class InvoiceRepository {
  public static GROUP = INVOICE_GROUP;
  constructor(private fullClientDynamodb: ClientDynamodb) {}

  public async createInvoice(
    invoice: InvoiceModel,
    tenant: string
  ): Promise<InvoiceModel> {
    const item = this.createNewItemFromDomainModel(invoice, tenant);
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

  public async updateInvoice(
    invoiceCode: string,
    invoiceId: string,
    tenant: string,
    invoiceData: any
  ) {
    const buildSid = InvoiceRepository.GROUP + "-" + tenant;

    const UpdateExpression =
      "SET invoiceId = :invoiceId, invoicePaidAt = :invoicePaidAt, invoiceNumber = :invoiceNumber, attri2 = :attri2";
    const ExpressionAttributeValues = {
      ":invoiceId": invoiceId,
      ":invoicePaidAt": invoiceData.invoicePaidAt,
      ":invoiceNumber": invoiceData.invoiceNumber,
      ":attri2": invoiceData.attri2,
    };
    const params = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        pid: invoiceCode,
        sid: buildSid,
      },
      UpdateExpression: UpdateExpression,
      ExpressionAttributeValues: ExpressionAttributeValues,
      ReturnValues: "ALL_NEW",
    });
    try {
      await this.fullClientDynamodb.fullClient.send(params);
      console.log("success");
      return { message: "Invoice update success" };
    } catch (error) {
      throw error;
    }
  }

  private createNewItemFromDomainModel(c: InvoiceModel, tenant: string) {
    const currentDate = moment().subtract(5, "hours");
    let item: any = {
      invoiceId: { S: c.invoiceId },
      amount: { N: c.amount },
      invoicePaidAt: { S: c.invoicePaidAt },
      creationDate: { S: currentDate.toISOString() },
      invoiceNumber: { S: c.invoiceNumber },
      attri2: { S: c.attri2 },
    };

    const buildSid = InvoiceRepository.GROUP + "-" + tenant;
    const buildPid = generatorCode(InvoiceRepository.GROUP);
    item = {
      ...item,
      attri1: { S: InvoiceRepository.GROUP },
      pid: { S: buildPid },
      sid: { S: buildSid },
    };
    return item;
  }

  public async deleteInvoice(InvoiceId: string, tenant: string): Promise<any> {
    const buildSid = InvoiceRepository.GROUP + "-" + tenant;
    const params = {
      TableName: TABLE_NAME,
      Key: {
        pid: { S: InvoiceId },
        sid: { S: buildSid },
      },
    };
    try {
      const invoiceDelete = await this.fullClientDynamodb.fullClient.deleteItem(
        params
      );
      if (invoiceDelete.ConsumedCapacity) {
        return { message: "Invoice not found" };
      } else {
        return { message: "Invoice deleted success" };
      }
    } catch (error) {
      throw new NotFoundException("Invoice to delete not found");
    }
  }

  private mapToDomain(item: any): InvoiceModel {
    const newItem: InvoiceModel = {
      invoiceId: item.invoiceId.S,
      amount: item.amount.N,
      invoicePaidAt: item.invoicePaidAt.S,
      creationDate: item.creationDate.S,
      invoiceNumber: item.invoiceNumber.S,
      attri1: item.attri1.S,
      attri2: item.attri2.S,
    };
    return newItem;
  }
}
