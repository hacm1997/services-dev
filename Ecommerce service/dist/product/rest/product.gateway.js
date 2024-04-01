"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGateway = void 0;
const aws_sdk_1 = require("aws-sdk");
class ProductGateway {
    constructor() {
        this.dynamoDB = new aws_sdk_1.DynamoDB.DocumentClient();
    }
}
exports.ProductGateway = ProductGateway;
//# sourceMappingURL=product.gateway.js.map