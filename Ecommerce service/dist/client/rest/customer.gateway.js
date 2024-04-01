"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerGateway = void 0;
const aws_sdk_1 = require("aws-sdk");
class CustomerGateway {
    constructor() {
        this.dynamoDB = new aws_sdk_1.DynamoDB.DocumentClient();
    }
}
exports.CustomerGateway = CustomerGateway;
//# sourceMappingURL=customer.gateway.js.map