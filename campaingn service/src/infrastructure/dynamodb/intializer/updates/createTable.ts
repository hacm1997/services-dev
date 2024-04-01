import { UpdateAbstract } from '../update.abstract';
import {
  CreateTableCommand,
  CreateTableInput,
  DescribeTableCommand,
  UpdateTableCommand,
  UpdateTableCommandInput,
} from '@aws-sdk/client-dynamodb';
import {
  REVERSE_INDEX,
  TABLE_NAME,
  TABLE_COMPRA_NAME,
  TENANT_INDEX,
  TABLE_BLOG_NAME,
  TABLE_HUBSPORT_NAME,
  TABLE_TRACKING_NAME,
  TABLE_CONTACT_NAME,
  COMPANY_INDEX,
  PERSON_INDEX,
} from '../Constants';
import { ClientDynamodb } from '../../client.dynamodb';

export class CreateTable extends UpdateAbstract {
  private clientDynamodb: ClientDynamodb;
  constructor(id: string, clientDynamodb: ClientDynamodb) {
    super(id, clientDynamodb);
    this.clientDynamodb = clientDynamodb;
  }

  private async describeTable(tableName: string) {
    const command = new DescribeTableCommand({ TableName: tableName });
    return await this.clientDynamodb.fullClient.send(command);
  }

  private tableCampaignsCreation: CreateTableInput = {
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
  private tableComprasCampaignsCreation: CreateTableInput = {
    TableName: TABLE_COMPRA_NAME,
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
  private tableBlogsCreation: CreateTableInput = {
    TableName: TABLE_BLOG_NAME,
    KeySchema: [
      { AttributeName: 'pid', KeyType: 'HASH' },
      { AttributeName: 'sid', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'pid', AttributeType: 'S' },
      { AttributeName: 'sid', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: REVERSE_INDEX,
        KeySchema: [
          { AttributeName: 'sid', KeyType: 'HASH' },
          { AttributeName: 'pid', KeyType: 'RANGE' },
        ],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
      },
    ],
  };
  private tableHubsportCreation: CreateTableInput = {
    TableName: TABLE_HUBSPORT_NAME,
    KeySchema: [
      { AttributeName: 'pid', KeyType: 'HASH' },
      { AttributeName: 'sid', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'pid', AttributeType: 'S' },
      { AttributeName: 'sid', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: REVERSE_INDEX,
        KeySchema: [
          { AttributeName: 'sid', KeyType: 'HASH' },
          { AttributeName: 'pid', KeyType: 'RANGE' },
        ],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
      },
    ],
  };
  private tableTrackingEmailCreation: CreateTableInput = {
    TableName: TABLE_TRACKING_NAME,
    KeySchema: [
      { AttributeName: 'pid', KeyType: 'HASH' },
      { AttributeName: 'sid', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'pid', AttributeType: 'S' },
      { AttributeName: 'sid', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: REVERSE_INDEX,
        KeySchema: [
          { AttributeName: 'sid', KeyType: 'HASH' },
          { AttributeName: 'pid', KeyType: 'RANGE' },
        ],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
      },
    ],
  };
  private tableContact: CreateTableInput = {
    TableName: TABLE_CONTACT_NAME,
    KeySchema: [
      { AttributeName: 'pid', KeyType: 'HASH' },
      { AttributeName: 'sid', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'pid', AttributeType: 'S' },
      { AttributeName: 'sid', AttributeType: 'S' },
      { AttributeName: 'companyId', AttributeType: 'S' },
      { AttributeName: 'personId', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    // BillingMode: 'PAY_PER_REQUEST',
    GlobalSecondaryIndexes: [
      {
        IndexName: REVERSE_INDEX,
        KeySchema: [
          { AttributeName: 'sid', KeyType: 'HASH' },
          { AttributeName: 'pid', KeyType: 'RANGE' },
        ],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
      },
      {
        IndexName: COMPANY_INDEX,
        KeySchema: [{ AttributeName: 'companyId', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
      },
      {
        IndexName: PERSON_INDEX,
        KeySchema: [{ AttributeName: 'personId', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
      },
    ],
  };

  async execute() {
    try {
      const response = await this.checkCurrentChange();
      console.log('EXECUTION RESPONSE VALUE ', response);
    } catch (e) {
      console.log(`FULL ERROR #1: ${e}`);
      console.log(`FULL ERROR: ${JSON.stringify(e)}`);
      if (e.name === 'ResourceNotFoundException') {
        this.createTable(this.tableCampaignsCreation);
        await this.setUpdateLogTable();
      }
    }
  }
  async executeCompras() {
    try {
      const response = await this.checkCurrentChangeCompras();
      console.log('EXECUTION RESPONSE VALUE ', response);
    } catch (e) {
      console.log(`FULL ERROR #2: ${e}`);
      console.log(`FULL ERROR: ${JSON.stringify(e)}`);
      if (e.name === 'ResourceNotFoundException') {
        this.createTable(this.tableComprasCampaignsCreation);
        await this.setUpdateLogTable();
      }
    }
  }
  async executeBlog() {
    try {
      const response = await this.checkCurrentChangeBlog();
      console.log('EXECUTION RESPONSE VALUE ', response);
    } catch (e) {
      console.log(`FULL ERROR #3: ${e}`);
      console.log(`FULL ERROR BLOG: ${JSON.stringify(e)}`);
      if (e.name === 'ResourceNotFoundException') {
        this.createTable(this.tableBlogsCreation);
        await this.setUpdateLogTable();
      }
    }
  }
  async executeHusport() {
    try {
      const response = await this.checkCurrentChangeHubsport();
      console.log('EXECUTION RESPONSE VALUE ', response);
    } catch (e) {
      console.log(`FULL ERROR #3: ${e}`);
      console.log(`FULL ERROR Husport: ${JSON.stringify(e)}`);
      if (e.name === 'ResourceNotFoundException') {
        this.createTable(this.tableHubsportCreation);
        await this.setUpdateLogTable();
      }
    }
  }
  async executeTrackingEmail() {
    try {
      const response = await this.checkCurrentChangeTrackingEmail();
      console.log('EXECUTION RESPONSE VALUE ', response);
    } catch (e) {
      console.log(`FULL ERROR #3: ${e}`);
      console.log(`FULL ERROR TrackingEmail: ${JSON.stringify(e)}`);
      if (e.name === 'ResourceNotFoundException') {
        this.createTable(this.tableTrackingEmailCreation);
        await this.setUpdateLogTable();
      }
    }
  }
  async executeContact() {
    try {
      const response = await this.checkCurrentChangeConatc();
      console.log('EXECUTION RESPONSE VALUE ', response);
    } catch (e) {
      // const tableDescription = await this.describeTable(TABLE_CONTACT_NAME);

      // const indexesExistence = CONTACT_INDEX.map(({ indexName }) => {
      //   return tableDescription.Table.GlobalSecondaryIndexes.some(
      //     (index) => index.IndexName === indexName,
      //   );
      // });

      // const indexesToCreateFiltered = CONTACT_INDEX.filter(
      //   (_, index) => !indexesExistence[index],
      // );

      // for (const { indexName, value } of indexesToCreateFiltered) {
      //   console.log(
      //     `El índice "${indexName}" no existe. Creando el índice con el valor "${value}"...`,
      //   );
      //   const newIndexSchema = {
      //     AttributeDefinitions: [{ AttributeName: value, AttributeType: 'S' }],
      //     KeySchema: [{ AttributeName: value, KeyType: 'HASH' }],
      //     Projection: { ProjectionType: 'ALL' },
      //     ProvisionedThroughput: {
      //       ReadCapacityUnits: 1,
      //       WriteCapacityUnits: 1,
      //     },
      //   };

      //   await this.updateTableWithIndex(
      //     TABLE_CONTACT_NAME,
      //     indexName,
      //     newIndexSchema,
      //   );

      //   console.log('Tabla actualizada con éxito con el nuevo índice.');
      // }

      console.log(`FULL ERROR #3: ${e}`);
      console.log(`FULL ERROR TrackingEmail: ${JSON.stringify(e)}`);
      if (e.name === 'ResourceNotFoundException') {
        this.createTable(this.tableContact);
        await this.setUpdateLogTable();
      }
    }
  }

  async updateTableWithIndex(
    tableName: string,
    newIndexName: string,
    newIndexSchema: any,
  ): Promise<void> {
    try {
      const updateParams: UpdateTableCommandInput = {
        TableName: tableName,
        AttributeDefinitions: newIndexSchema.AttributeDefinitions,
        GlobalSecondaryIndexUpdates: [
          {
            Create: {
              IndexName: newIndexName,
              KeySchema: newIndexSchema.KeySchema,
              Projection: newIndexSchema.Projection,
              ProvisionedThroughput: newIndexSchema.ProvisionedThroughput,
            },
          },
        ],
      };

      const command = new UpdateTableCommand(updateParams);
      const response = await this.clientDynamodb.docClient.send(command);
      console.log('Tabla actualizada con éxito con el nuevo índice:', response);
    } catch (error) {
      console.error('Error al actualizar la tabla:', error);
      throw error;
    }
  }

  async removeIndexFromTable(
    tableName: string,
    indexNameToRemove: string,
  ): Promise<void> {
    try {
      const updateParams: UpdateTableCommandInput = {
        TableName: tableName,
        GlobalSecondaryIndexUpdates: [
          {
            Delete: { IndexName: indexNameToRemove },
          },
        ],
      };
      const command = new UpdateTableCommand(updateParams);
      const response = await this.clientDynamodb.docClient.send(command);
      console.log(
        `Índice "${indexNameToRemove}" eliminado con éxito de la tabla "${tableName}":`,
        response,
      );
    } catch (error) {
      console.error('Error al eliminar el índice:', error);
      throw error;
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
