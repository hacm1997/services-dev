"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHandler = void 0;
const createTable_1 = require("./createTable");
const client_dynamodb_1 = require("../../client.dynamodb");
const config_1 = require("@nestjs/config");
class UpdateHandler {
    static esxecuteDynamoUpdates() {
        this.executor.forEach((value) => value.execute());
    }
}
exports.UpdateHandler = UpdateHandler;
UpdateHandler.clientDynamodb = new client_dynamodb_1.ClientDynamodb(new config_1.ConfigService());
UpdateHandler.executor = [
    new createTable_1.CreateTable("table_creation_2024_heinerdev", UpdateHandler.clientDynamodb),
];
//# sourceMappingURL=update.handler.js.map