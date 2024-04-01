import { UpdateAbstract } from "../update.abstract";
import { CreateTableInput } from "@aws-sdk/client-dynamodb";
import { ClientDynamodb } from "../../client.dynamodb";
export declare class CreateTable extends UpdateAbstract {
    private clientDynamodb;
    constructor(id: string, clientDynamodb: ClientDynamodb);
    private tableBillignCreation;
    execute(): Promise<void>;
    createTable(tableCreations: CreateTableInput): void;
}
