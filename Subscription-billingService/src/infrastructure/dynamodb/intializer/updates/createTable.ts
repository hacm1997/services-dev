import { UpdateAbstract } from "../update.abstract";
import { CreateTableCommand, CreateTableInput } from "@aws-sdk/client-dynamodb";
import {
  INDEX_ONE,
  INDEX_ONE_TWO,
  INDEX_TWO,
  REVERSE_INDEX,
  TABLE_NAME,
} from "../Constants";
import { ClientDynamodb } from "../../client.dynamodb";

export class CreateTable extends UpdateAbstract {
  private clientDynamodb: ClientDynamodb;
  constructor(id: string, clientDynamodb: ClientDynamodb) {
    super(id, clientDynamodb);
    this.clientDynamodb = clientDynamodb;
  }

  private tableBillignCreation: CreateTableInput = {
    TableName: TABLE_NAME,
    KeySchema: [
      { AttributeName: "pid", KeyType: "HASH" },
      { AttributeName: "sid", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "pid", AttributeType: "S" },
      { AttributeName: "sid", AttributeType: "S" },
      { AttributeName: "attri1", AttributeType: "S" },
      { AttributeName: "attri2", AttributeType: "S" },
      { AttributeName: "itemSource", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      WriteCapacityUnits: 5,
      ReadCapacityUnits: 5,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: REVERSE_INDEX,
        KeySchema: [
          { AttributeName: "sid", KeyType: "HASH" },
          { AttributeName: "pid", KeyType: "RANGE" },
        ],
        ProvisionedThroughput: { WriteCapacityUnits: 5, ReadCapacityUnits: 5 },
        Projection: { ProjectionType: "ALL" },
      },
      {
        IndexName: INDEX_ONE,
        KeySchema: [{ AttributeName: "attri1", KeyType: "HASH" }],
        ProvisionedThroughput: { WriteCapacityUnits: 5, ReadCapacityUnits: 5 },
        Projection: { ProjectionType: "ALL" },
      },
      {
        IndexName: INDEX_ONE_TWO,
        KeySchema: [{ AttributeName: "attri2", KeyType: "HASH" }],
        ProvisionedThroughput: { WriteCapacityUnits: 5, ReadCapacityUnits: 5 },
        Projection: { ProjectionType: "ALL" },
      },
      {
        IndexName: INDEX_TWO,
        KeySchema: [{ AttributeName: "itemSource", KeyType: "HASH" }],
        Projection: {
          ProjectionType: "ALL", // Adjust as per your requirements
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      },
    ],
  };

  async execute() {
    try {
      const response = await this.checkCurrentChange();
      console.log("EXECUTION RESPONSE VALUE ", response);
    } catch (e) {
      console.log(`FULL ERROR #1: ${e}`);
      console.log(`FULL ERROR: ${JSON.stringify(e)}`);
      if (e.name === "ResourceNotFoundException") {
        this.createTable(this.tableBillignCreation);
        await this.setUpdateLogTable();
      }
    }
  }

  public createTable(tableCreations: CreateTableInput): void {
    const command = new CreateTableCommand(tableCreations);
    this.clientDynamodb.docClient
      .send(command)
      .then((value) => console.log("creation value resopnse ", value))
      .catch((reason) => console.log("error ", reason));
  }
}
