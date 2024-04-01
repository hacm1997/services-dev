import { Injectable } from '@nestjs/common';
import {
  TABLE_BLOG_NAME,
  TABLE_COMPRA_NAME,
  TABLE_NAME,
  TABLE_HUBSPORT_NAME,
  TABLE_TRACKING_NAME,
  TABLE_CONTACT_NAME,
} from './Constants';
import { ResourceAlreadyExistException } from '../ResourceAlreadyExistException';
import { ClientDynamodb } from '../client.dynamodb';

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
  public async checkCurrentChangeCompras() {
    console.log(`Checking Changes for ID: ${this.id}`);
    const result = await this.getLogCompras();
    console.log(`RECEIVED ITEM: ${JSON.stringify(result)}`);
    if (result.Item) throw new ResourceAlreadyExistException();
    return result;
  }
  public async checkCurrentChangeBlog() {
    console.log(`Checking Changes for ID: ${this.id}`);
    const result = await this.getLogBlog();
    console.log(`RECEIVED ITEM: ${JSON.stringify(result)}`);
    if (result.Item) throw new ResourceAlreadyExistException();
    return result;
  }
  public async checkCurrentChangeHubsport() {
    console.log(`Checking Changes for ID: ${this.id}`);
    const result = await this.getLogHubsport();
    console.log(`RECEIVED ITEM: ${JSON.stringify(result)}`);
    if (result.Item) throw new ResourceAlreadyExistException();
    return result;
  }
  public async checkCurrentChangeTrackingEmail() {
    console.log(`Checking Changes for ID: ${this.id}`);
    const result = await this.getLogTrackingEmail();
    console.log(`RECEIVED ITEM: ${JSON.stringify(result)}`);
    if (result.Item) throw new ResourceAlreadyExistException();
    return result;
  }
  public async checkCurrentChangeConatc() {
    console.log(`Checking Changes for ID: ${this.id}`);
    const result = await this.getLogConatct();
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
  protected async getLogCompras() {
    const query = {
      Key: {
        pid: { S: this.id },
        sid: { S: this.id },
      },
      TableName: TABLE_COMPRA_NAME,
    };
    console.log(`Checking updates for ${this.id}`);
    return await this.fullClientDynamodb.fullClient.getItem(query);
  }
  protected async getLogBlog() {
    const query = {
      Key: {
        pid: { S: this.id },
        sid: { S: this.id },
      },
      TableName: TABLE_BLOG_NAME,
    };
    console.log(`Checking updates for ${this.id}`);
    return await this.fullClientDynamodb.fullClient.getItem(query);
  }
  protected async getLogHubsport() {
    const query = {
      Key: {
        pid: { S: this.id },
        sid: { S: this.id },
      },
      TableName: TABLE_HUBSPORT_NAME,
    };
    console.log(`Checking updates for ${this.id}`);
    return await this.fullClientDynamodb.fullClient.getItem(query);
  }
  protected async getLogTrackingEmail() {
    const query = {
      Key: {
        pid: { S: this.id },
        sid: { S: this.id },
      },
      TableName: TABLE_TRACKING_NAME,
    };
    console.log(`Checking updates for ${this.id}`);
    return await this.fullClientDynamodb.fullClient.getItem(query);
  }
  protected async getLogConatct() {
    const query = {
      Key: {
        pid: { S: this.id },
        sid: { S: this.id },
      },
      TableName: TABLE_CONTACT_NAME,
    };
    console.log(`Checking updates for ${this.id}`);
    return await this.fullClientDynamodb.fullClient.getItem(query);
  }

  protected async setUpdateLogTable() {
    console.log(
      `Finalizing Update for ${this.id}\nThe process will last 40 seconds`,
    );
    setTimeout(async () => this.executeUpdateLogTable(), 30000);
    setTimeout(async () => this.executeUpdateLogTableCompras(), 40000);
    setTimeout(async () => this.executeUpdateLogTableBlog(), 50000);
    setTimeout(async () => this.executeUpdateLogTableHubsport(), 60000);
    setTimeout(async () => this.executeUpdateLogTableTrackingEmail(), 70000);
    setTimeout(async () => this.executeUpdateLogTableContact(), 80000);
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
  private async executeUpdateLogTableCompras() {
    const item = {
      TableName: TABLE_COMPRA_NAME,
      Item: {
        pid: { S: this.id },
        sid: { S: this.id },
      },
    };
    return await this.fullClientDynamodb.fullClient.putItem(item);
  }
  private async executeUpdateLogTableBlog() {
    const item = {
      TableName: TABLE_BLOG_NAME,
      Item: {
        pid: { S: this.id },
        sid: { S: this.id },
      },
    };
    return await this.fullClientDynamodb.fullClient.putItem(item);
  }
  private async executeUpdateLogTableHubsport() {
    const item = {
      TableName: TABLE_HUBSPORT_NAME,
      Item: {
        pid: { S: this.id },
        sid: { S: this.id },
      },
    };
    return await this.fullClientDynamodb.fullClient.putItem(item);
  }
  private async executeUpdateLogTableTrackingEmail() {
    const item = {
      TableName: TABLE_TRACKING_NAME,
      Item: {
        pid: { S: this.id },
        sid: { S: this.id },
      },
    };
    return await this.fullClientDynamodb.fullClient.putItem(item);
  }
  private async executeUpdateLogTableContact() {
    const item = {
      TableName: TABLE_CONTACT_NAME,
      Item: {
        pid: { S: this.id },
        sid: { S: this.id },
      },
    };
    return await this.fullClientDynamodb.fullClient.putItem(item);
  }
  public abstract execute(): Promise<any>;
  public abstract executeCompras(): Promise<any>;
  public abstract executeBlog(): Promise<any>;
  public abstract executeHusport(): Promise<any>;
  public abstract executeTrackingEmail(): Promise<any>;
  public abstract executeContact(): Promise<any>;
}
