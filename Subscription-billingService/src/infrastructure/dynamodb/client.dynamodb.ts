import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DynamoDB, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { EnvEnumMap, EnvEnumValue } from "./util/env.enum";

@Injectable()
export class ClientDynamodb {
  // @Inject(ConfigService) public config: ConfigService;
  private _dynamoClient;
  private _fullClient;
  private _conf;
  private _docClient;

  constructor(public config: ConfigService) {
    console.log("CONFIG VALUE IS: ", new ConfigService().get("ENV_EXEC_CONF"));

    this._conf = EnvEnumMap.get(
      EnvEnumValue.get(this.config.get("ENV_EXEC_CONF"))
    );

    this._dynamoClient = new DynamoDBClient(this._conf[0]);
    this._docClient = DynamoDBDocumentClient.from(this._dynamoClient);
    this._fullClient = new DynamoDB(this._conf[0]);
  }

  get docClient() {
    return this._docClient;
  }

  get fullClient() {
    return this._fullClient;
  }
}
