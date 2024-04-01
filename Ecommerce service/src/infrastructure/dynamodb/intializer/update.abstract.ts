import { Injectable } from '@nestjs/common';
import { ClientDynamodb } from '../client';
import {
  TABLE_CUSTOMER_NAME,
  TABLE_INVOICE_NAME,
  TABLE_NAME,
  TABLE_PAYMENT_NAME,
} from './Constants';
import { ResourceAlreadyExistException } from './ResourceAlreadyExistException';

@Injectable()
export abstract class UpdateAbstract {
  private fullClientDynamodb: ClientDynamodb;
  private readonly id: string;

  protected constructor(id: string, fullClientDynamodb: ClientDynamodb) {
    this.id = id;
    this.fullClientDynamodb = fullClientDynamodb;
  }

  public async checkCurrentChange() {
    console.log(`Checking Changes for ID: ${this.id}`);
    const result = await this.getLog();
    console.log(`RECEIVED ITEM: ${JSON.stringify(result)}`);
    if (result.Item) throw new ResourceAlreadyExistException();
    return result;
  }

  public async checkCurrentChangeInvoice() {
    console.log(`Checking Changes for ID: ${this.id}`);
    const result = await this.getLogInvoice();
    console.log(`RECEIVED ITEM: ${JSON.stringify(result)}`);
    if (result.Item) throw new ResourceAlreadyExistException();
    return result;
  }

  public async checkCurrentChangeCustomer() {
    console.log(`Checking Changes for ID: ${this.id}`);
    const result = await this.getLogCustomer();
    console.log(`RECEIVED ITEM: ${JSON.stringify(result)}`);
    if (result.Item) throw new ResourceAlreadyExistException();
    return result;
  }

  protected async getLog() {
    const query = {
      Key: {
        pid: { S: this.id },
        sid: { S: this.id },
      },
      TableName: TABLE_NAME,
    };
    console.log(`Checking updates for ${this.id}`);
    return await this.fullClientDynamodb.fullClient.getItem(query);
  }
  protected async getLogInvoice() {
    const query = {
      Key: {
        pid: { S: this.id },
        sid: { S: this.id },
      },
      TableName: TABLE_INVOICE_NAME,
    };
    console.log(`Checking updates for ${this.id}`);
    return await this.fullClientDynamodb.fullClient.getItem(query);
  }
  protected async getLogCustomer() {
    const query = {
      Key: {
        pid: { S: this.id },
        sid: { S: this.id },
      },
      TableName: TABLE_CUSTOMER_NAME,
    };
    console.log(`Checking updates for ${this.id}`);
    return await this.fullClientDynamodb.fullClient.getItem(query);
  }

  protected async setUpdateLogTable() {
    console.log(
      `Finalizing Update for ${this.id}\nThe process will last 40 seconds`,
    );
    setTimeout(async () => this.executeUpdateLogTable(), 30000);
    setTimeout(async () => this.executeUpdateLogTableInvoice(), 40000);
    setTimeout(async () => this.executeUpdateLogTableCustomer(), 50000);
  }

  private async executeUpdateLogTable() {
    const item = {
      TableName: TABLE_NAME,
      Item: {
        pid: { S: this.id },
        sid: { S: this.id },
      },
    };
    return await this.fullClientDynamodb.fullClient.putItem(item);
  }
  private async executeUpdateLogTableInvoice() {
    const item = {
      TableName: TABLE_INVOICE_NAME,
      Item: {
        pid: { S: this.id },
        sid: { S: this.id },
      },
    };
    return await this.fullClientDynamodb.fullClient.putItem(item);
  }
  private async executeUpdateLogTableCustomer() {
    const item = {
      TableName: TABLE_CUSTOMER_NAME,
      Item: {
        pid: { S: this.id },
        sid: { S: this.id },
      },
    };
    return await this.fullClientDynamodb.fullClient.putItem(item);
  }

  public abstract execute(): Promise<any>;
  public abstract executeInvoice(): Promise<any>;
  public abstract executeCustomer(): Promise<any>;
}
