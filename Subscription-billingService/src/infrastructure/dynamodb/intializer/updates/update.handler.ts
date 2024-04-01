import { UpdateAbstract } from "../update.abstract";
import { CreateTable } from "./createTable";
import { ClientDynamodb } from "../../client.dynamodb";
import { ConfigService } from "@nestjs/config";

export class UpdateHandler {
  private static clientDynamodb: ClientDynamodb = new ClientDynamodb(
    new ConfigService()
  );
  private static executor: UpdateAbstract[] = [
    new CreateTable(
      "table_creation_2024_heinerdev",
      UpdateHandler.clientDynamodb
    ),
  ];
  public static esxecuteDynamoUpdates() {
    this.executor.forEach((value) => value.execute());
  }
}
