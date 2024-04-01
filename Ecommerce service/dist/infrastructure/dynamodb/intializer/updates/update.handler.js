"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHandler = void 0;
const client_1 = require("../../client");
const createTable_1 = require("./createTable");
const config_1 = require("@nestjs/config");
class UpdateHandler {
    static esxecuteDynamoUpdates() {
        this.executor.forEach((value) => value.execute());
        this.executor.forEach((value) => value.executeInvoice());
        this.executor.forEach((value) => value.executeCustomer());
    }
}
exports.UpdateHandler = UpdateHandler;
UpdateHandler.clientDynamodb = new client_1.ClientDynamodb(new config_1.ConfigService());
UpdateHandler.executor = [
    new createTable_1.CreateTable('table_creation_2023_08_03_heinerdev', UpdateHandler.clientDynamodb),
];
//# sourceMappingURL=update.handler.js.map