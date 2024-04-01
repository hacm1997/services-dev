"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentGateway = void 0;
const aws_sdk_1 = require("aws-sdk");
class PaymentGateway {
    constructor() {
        this.dynamoDB = new aws_sdk_1.DynamoDB.DocumentClient();
    }
}
exports.PaymentGateway = PaymentGateway;
//# sourceMappingURL=payment.gateway.js.map