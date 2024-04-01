"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ShippingRepositoryImpl_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../../app.service");
const client_1 = require("../../infrastructure/dynamodb/client");
const Constants_1 = require("../../infrastructure/dynamodb/intializer/Constants");
const transform_data_1 = require("./transform-data");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
let ShippingRepositoryImpl = exports.ShippingRepositoryImpl = ShippingRepositoryImpl_1 = class ShippingRepositoryImpl {
    constructor(fullClientDynamodb) {
        this.fullClientDynamodb = fullClientDynamodb;
    }
    async createShipping(shipping) {
        const artifact = {
            TableName: Constants_1.TABLE_NAME,
            Item: shipping.getItem(),
        };
        console.log(`SHIPPING TO CREATE ${JSON.stringify(artifact)}`);
        await this.fullClientDynamodb.fullClient.putItem(artifact);
        return shipping;
    }
    async getAllShipping(tenantID) {
        const generateTenant = ShippingRepositoryImpl_1.GROUP + '#' + tenantID;
        const params = {
            TableName: Constants_1.TABLE_NAME,
            KeyConditionExpression: 'pid = :tenant',
            ExpressionAttributeValues: {
                ':tenant': {
                    S: generateTenant,
                },
            },
        };
        const resulTwo = await this.fullClientDynamodb.fullClient.query(params);
        const result = await ShippingRepositoryImpl_1.appService.getAllData(params, resulTwo, []);
        return (0, transform_data_1.default)(result);
    }
    async getShippingByCode(tenantID, shippingCode) {
        const buildTenant = Constants_1.SHIPPING_GROUP + '#' + tenantID;
        const buildCode = Constants_1.SHIPPING_GROUP + '-' + shippingCode;
        const params = {
            TableName: Constants_1.TABLE_NAME,
            KeyConditionExpression: 'pid = :tenant AND sid = :shippingCode',
            ExpressionAttributeValues: {
                ':tenant': {
                    S: buildTenant,
                },
                ':shippingCode': {
                    S: buildCode,
                },
            },
        };
        const resulTwo = await this.fullClientDynamodb.fullClient.query(params);
        const appService = new app_service_1.AppService();
        const result = await appService.getAllData(params, resulTwo, []);
        return (0, transform_data_1.default)(result);
    }
    async putShipping(tenantID, shipping) {
        const buildTenant = Constants_1.SHIPPING_GROUP + '#' + tenantID;
        const buildCode = Constants_1.SHIPPING_GROUP + '-' + shipping.city;
        const updateExpression = 'SET city = :city, price = :price';
        const updateExpressionTwo = 'SET city = :city, price = :price, extraInfo = :extraInfo';
        const expressionAttributeValues = {
            ':city': shipping.city,
            ':price': shipping.price,
        };
        const expressionAttributeValuesTwo = {
            ':city': shipping.city,
            ':price': shipping.price,
            ':extraInfo': shipping.extraInfo ? shipping.extraInfo : undefined,
        };
        const params = new lib_dynamodb_1.UpdateCommand({
            TableName: Constants_1.TABLE_NAME,
            Key: {
                pid: buildTenant,
                sid: buildCode,
            },
            UpdateExpression: shipping.extraInfo
                ? updateExpressionTwo
                : updateExpression,
            ExpressionAttributeValues: shipping.extraInfo
                ? expressionAttributeValuesTwo
                : expressionAttributeValues,
            ReturnValues: 'ALL_NEW',
        });
        try {
            await this.fullClientDynamodb.fullClient.send(params);
            return shipping;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteShipping(sid, tenantID) {
        const buildTenant = Constants_1.SHIPPING_GROUP + '#' + tenantID;
        const params = {
            TableName: Constants_1.TABLE_NAME,
            Key: {
                pid: { S: buildTenant },
                sid: { S: sid },
            },
        };
        try {
            const tagDelete = await this.fullClientDynamodb.fullClient.deleteItem(params);
            if (tagDelete.ConsumedCapacity) {
                return { message: 'Shipping not found' };
            }
            else {
                return { message: 'Shipping deleted success' };
            }
        }
        catch (error) {
            throw error;
        }
    }
};
ShippingRepositoryImpl.GROUP = Constants_1.SHIPPING_GROUP;
ShippingRepositoryImpl.appService = new app_service_1.AppService();
exports.ShippingRepositoryImpl = ShippingRepositoryImpl = ShippingRepositoryImpl_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.ClientDynamodb])
], ShippingRepositoryImpl);
//# sourceMappingURL=shipping.repository.js.map