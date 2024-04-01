import { UpdateAbstract } from '../update.abstract';
import { CreateTableCommand, CreateTableInput } from '@aws-sdk/client-dynamodb';
import {
  REVERSE_INDEX,
  TABLE_CUSTOMER_NAME,
  TABLE_INVOICE_NAME,
  TABLE_NAME,
  TENANT_INDEX,
} from '../Constants';
import { ClientDynamodb } from '../../client';

export class CreateTable extends UpdateAbstract {
  private clientDynamodb: ClientDynamodb;
  constructor(id: string, clientDynamodb: ClientDynamodb) {
    super(id, clientDynamodb);
    this.clientDynamodb = clientDynamodb;
  }

  private tableCreation: CreateTableInput = {
    TableName: TABLE_NAME,
    KeySchema: [
      { AttributeName: 'pid', KeyType: 'HASH' },
      { AttributeName: 'sid', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'pid', AttributeType: 'S' },
      { AttributeName: 'sid', AttributeType: 'S' },
      { AttributeName: 'tenant', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      WriteCapacityUnits: 5,
      ReadCapacityUnits: 5,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: REVERSE_INDEX,
        KeySchema: [
          { AttributeName: 'sid', KeyType: 'HASH' },
          { AttributeName: 'pid', KeyType: 'RANGE' },
        ],
        ProvisionedThroughput: { WriteCapacityUnits: 5, ReadCapacityUnits: 5 },
        Projection: { ProjectionType: 'ALL' },
      },
      {
        IndexName: TENANT_INDEX,
        KeySchema: [
          { AttributeName: 'tenant', KeyType: 'HASH' },
          { AttributeName: 'pid', KeyType: 'RANGE' },
        ],
        ProvisionedThroughput: { WriteCapacityUnits: 5, ReadCapacityUnits: 5 },
        Projection: { ProjectionType: 'ALL' },
      },
    ],
  };
  private tableCreationInvoice: CreateTableInput = {
    TableName: TABLE_INVOICE_NAME,
    KeySchema: [
      { AttributeName: 'pid', KeyType: 'HASH' },
      { AttributeName: 'sid', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'pid', AttributeType: 'S' },
      { AttributeName: 'sid', AttributeType: 'S' },
      { AttributeName: 'tenant', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      WriteCapacityUnits: 5,
      ReadCapacityUnits: 5,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: REVERSE_INDEX,
        KeySchema: [
          { AttributeName: 'sid', KeyType: 'HASH' },
          { AttributeName: 'pid', KeyType: 'RANGE' },
        ],
        ProvisionedThroughput: { WriteCapacityUnits: 5, ReadCapacityUnits: 5 },
        Projection: { ProjectionType: 'ALL' },
      },
      {
        IndexName: TENANT_INDEX,
        KeySchema: [
          { AttributeName: 'tenant', KeyType: 'HASH' },
          { AttributeName: 'pid', KeyType: 'RANGE' },
        ],
        ProvisionedThroughput: { WriteCapacityUnits: 5, ReadCapacityUnits: 5 },
        Projection: { ProjectionType: 'ALL' },
      },
    ],
  };
  private tableCreationCustomer: CreateTableInput = {
    TableName: TABLE_CUSTOMER_NAME,
    KeySchema: [
      { AttributeName: 'pid', KeyType: 'HASH' },
      { AttributeName: 'sid', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'pid', AttributeType: 'S' },
      { AttributeName: 'sid', AttributeType: 'S' },
      { AttributeName: 'tenant', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      WriteCapacityUnits: 5,
      ReadCapacityUnits: 5,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: REVERSE_INDEX,
        KeySchema: [
          { AttributeName: 'sid', KeyType: 'HASH' },
          { AttributeName: 'pid', KeyType: 'RANGE' },
        ],
        ProvisionedThroughput: { WriteCapacityUnits: 5, ReadCapacityUnits: 5 },
        Projection: { ProjectionType: 'ALL' },
      },
      {
        IndexName: TENANT_INDEX,
        KeySchema: [
          { AttributeName: 'tenant', KeyType: 'HASH' },
          { AttributeName: 'pid', KeyType: 'RANGE' },
        ],
        ProvisionedThroughput: { WriteCapacityUnits: 5, ReadCapacityUnits: 5 },
        Projection: { ProjectionType: 'ALL' },
      },
    ],
  };
  async execute() {
    try {
      const response = await this.checkCurrentChange();
      console.log('EXECUTION RESPONSE VALUE ', response);
    } catch (e) {
      console.log(`FULL ERROR: ${JSON.stringify(e)}`);
      if (e.name === 'ResourceNotFoundException') {
        this.createTable(this.tableCreation);
        await this.setUpdateLogTable();
      }
    }
  }
  async executeInvoice() {
    try {
      const response = await this.checkCurrentChangeInvoice();
      console.log('EXECUTION RESPONSE VALUE ', response);
    } catch (e) {
      console.log(`FULL ERROR: ${JSON.stringify(e)}`);
      if (e.name === 'ResourceNotFoundException') {
        this.createTable(this.tableCreationInvoice);
        await this.setUpdateLogTable();
      }
    }
  }
  async executeCustomer() {
    try {
      const response = await this.checkCurrentChangeCustomer();
      console.log('EXECUTION RESPONSE VALUE ', response);
    } catch (e) {
      console.log(`FULL ERROR: ${JSON.stringify(e)}`);
      if (e.name === 'ResourceNotFoundException') {
        this.createTable(this.tableCreationCustomer);
        await this.setUpdateLogTable();
      }
    }
  }

  public createTable(tableCreations: CreateTableInput): void {
    const command = new CreateTableCommand(tableCreations);
    this.clientDynamodb.docClient
      .send(command)
      .then((value) => console.log('creation value resopnse ', value))
      .catch((reason) => console.log('error ', reason));
  }
}
