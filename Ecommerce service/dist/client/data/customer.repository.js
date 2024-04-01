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
var CustomerRepositoryImpl_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../infrastructure/dynamodb/client");
const Constants_1 = require("../../infrastructure/dynamodb/intializer/Constants");
const transform_data_1 = require("./transform-data");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const app_service_1 = require("../../app.service");
const idGenerator_1 = require("../../product/util/idGenerator");
const moment = require("moment");
let CustomerRepositoryImpl = exports.CustomerRepositoryImpl = CustomerRepositoryImpl_1 = class CustomerRepositoryImpl {
    constructor(fullClientDynamodb) {
        this.fullClientDynamodb = fullClientDynamodb;
    }
    async createCustomer(customer) {
        const userExistis = await this.getAllCustomerByID(customer['_sid'], customer.tenantID);
        try {
            if (userExistis.length === 0) {
                const artifact = {
                    TableName: Constants_1.TABLE_CUSTOMER_NAME,
                    Item: customer.getItem(),
                };
                console.log(`CUSTOMER TO CREATE ${JSON.stringify(artifact)}`);
                await this.fullClientDynamodb.fullClient.putItem(artifact);
                return customer;
            }
            else {
                await this.putCustomer(customer, customer.tenantID.replace(`${CustomerRepositoryImpl_1.GROUP}#`, ''));
                return customer;
            }
        }
        catch (error) {
            throw new Error('The user already exist');
        }
    }
    async getAllCustomerByID(id, tenantID) {
        let final_tenant = '';
        if (tenantID.includes(CustomerRepositoryImpl_1.GROUP)) {
            final_tenant = tenantID;
        }
        else {
            final_tenant = CustomerRepositoryImpl_1.GROUP + '#' + tenantID;
        }
        const params = {
            TableName: Constants_1.TABLE_CUSTOMER_NAME,
            KeyConditionExpression: 'pid = :tenant AND sid = :sid',
            ExpressionAttributeValues: {
                ':tenant': {
                    S: final_tenant,
                },
                ':sid': {
                    S: id,
                },
            },
        };
        const resulTwo = await this.fullClientDynamodb.fullClient.query(params);
        const result = await CustomerRepositoryImpl_1.appService.getAllData(params, resulTwo, []);
        return (0, transform_data_1.default)(result);
    }
    async getAllCustomers(tenantID) {
        const generateTenant = CustomerRepositoryImpl_1.GROUP + '#' + tenantID;
        const params = {
            TableName: Constants_1.TABLE_CUSTOMER_NAME,
            KeyConditionExpression: 'pid = :tenant',
            ExpressionAttributeValues: {
                ':tenant': {
                    S: generateTenant,
                },
            },
        };
        const resulTwo = await this.fullClientDynamodb.fullClient.query(params);
        const result = await CustomerRepositoryImpl_1.appService.getAllData(params, resulTwo, []);
        return (0, transform_data_1.default)(result);
    }
    async getAllCustomersPerPage(tenantID, pageNumber, pageSize, lastEvaluatedKey) {
        const generateTenant = CustomerRepositoryImpl_1.GROUP + '#' + tenantID;
        const params = {
            TableName: Constants_1.TABLE_CUSTOMER_NAME,
            KeyConditionExpression: 'pid = :tenant',
            ExpressionAttributeValues: {
                ':tenant': {
                    S: generateTenant,
                },
            },
            Limit: pageSize,
        };
        if (lastEvaluatedKey) {
            params.ExclusiveStartKey = lastEvaluatedKey;
        }
        try {
            const data = await this.fullClientDynamodb.fullClient.query(params);
            const startItemIndex = lastEvaluatedKey ? 0 : (pageNumber - 1) * pageSize;
            const endItemIndex = startItemIndex + pageSize;
            const filteredItems = data.Items.slice(startItemIndex, endItemIndex);
            const result = {
                items: (0, transform_data_1.default)(filteredItems),
                lastEvaluatedKey: data.LastEvaluatedKey,
            };
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async fetchResultsWithPagination(tenant, pageNumber, pageSize, lastEvaluatedKey, accumulatedResults = []) {
        const result = await this.getAllCustomersPerPage(tenant, pageNumber, pageSize, lastEvaluatedKey);
        lastEvaluatedKey = result.lastEvaluatedKey;
        accumulatedResults.push(result);
        if (lastEvaluatedKey) {
            pageNumber++;
            return this.fetchResultsWithPagination(tenant, pageNumber, pageSize, lastEvaluatedKey, accumulatedResults);
        }
        return { results: accumulatedResults, totalPages: pageNumber };
    }
    async putCustomer(customer, tenantID, customerID) {
        const generateTenant = CustomerRepositoryImpl_1.GROUP + '#' + tenantID;
        let updateExpression = '';
        let expressionAttributeValues = {};
        if (customer.extraInfo &&
            customer.extraInfo.S &&
            customer.extraInfo.S === '{}') {
            updateExpression =
                'SET #customer_name = :name, last_name = :last_name, email = :email, phone = :phone, city = :city, address = :address';
            expressionAttributeValues = {
                ':name': customer.name.S,
                ':last_name': customer.last_name.S,
                ':email': customer.email.S,
                ':phone': customer.phone.N || 0,
                ':city': customer.city.S,
                ':address': customer.address.S,
            };
        }
        else if (!customer.extraInfo) {
            updateExpression =
                'SET #customer_name = :name, last_name = :last_name, email = :email, phone = :phone, city = :city, address = :address';
            expressionAttributeValues = {
                ':name': customer.name,
                ':last_name': customer.last_name,
                ':email': customer.email,
                ':phone': customer.phone || 0,
                ':city': customer.city,
                ':address': customer.address,
            };
        }
        else {
            updateExpression =
                'SET #customer_name = :name, last_name = :last_name, email = :email, phone = :phone, city = :city, address = :address, extraInfo = :extraInfo';
            expressionAttributeValues = {
                ':name': customer.name,
                ':last_name': customer.last_name,
                ':email': customer.email,
                ':phone': customer.phone || 0,
                ':city': customer.city,
                ':address': customer.address,
                ':extraInfo': customer.extraInfo
                    ? JSON.stringify(customer.extraInfo)
                    : { NULL: true },
            };
        }
        const expressionAttributeNames = {
            '#customer_name': 'name',
        };
        if (customer.sid && customer.sid.S) {
            const params = new lib_dynamodb_1.UpdateCommand({
                TableName: Constants_1.TABLE_CUSTOMER_NAME,
                Key: {
                    pid: generateTenant,
                    sid: customer.sid.S,
                },
                UpdateExpression: updateExpression,
                ExpressionAttributeNames: expressionAttributeNames,
                ExpressionAttributeValues: expressionAttributeValues,
                ReturnValues: 'ALL_NEW',
            });
            try {
                await this.fullClientDynamodb.fullClient.send(params);
                return customer;
            }
            catch (error) {
                throw error;
            }
        }
        else {
            const params = new lib_dynamodb_1.UpdateCommand({
                TableName: Constants_1.TABLE_CUSTOMER_NAME,
                Key: {
                    pid: generateTenant,
                    sid: customer.sid ? customer.sid : customerID,
                },
                UpdateExpression: updateExpression,
                ExpressionAttributeNames: expressionAttributeNames,
                ExpressionAttributeValues: expressionAttributeValues,
                ReturnValues: 'ALL_NEW',
            });
            try {
                await this.fullClientDynamodb.fullClient.send(params);
                return customer;
            }
            catch (error) {
                throw error;
            }
        }
    }
    async deleteCustomer(id, tenantID) {
        const generateTenant = CustomerRepositoryImpl_1.GROUP + '#' + tenantID;
        const params = {
            TableName: Constants_1.TABLE_CUSTOMER_NAME,
            Key: {
                pid: { S: generateTenant },
                sid: { S: id },
            },
        };
        try {
            const customerDelete = await this.fullClientDynamodb.fullClient.deleteItem(params);
            if (customerDelete.ConsumedCapacity) {
                return { message: 'Customer not found' };
            }
            else {
                return { message: 'Customer deleted success' };
            }
        }
        catch (error) {
            throw new common_1.NotFoundException('Customer to delete not found');
        }
    }
    async saveDataToDynamoDB(data, tenantID) {
        for (const item of data) {
            const buildSid = (0, idGenerator_1.default)(Constants_1.CUSTOMER_GROUP);
            const items = this.createNewItemFromDomainModel(this.removeRowNum(item), tenantID, buildSid);
            const putItemParams = {
                TableName: Constants_1.TABLE_CUSTOMER_NAME,
                Item: items,
            };
            await this.getAllCustomerByID(items.sid.S, tenantID)
                .then(async (res) => {
                if (res.length > 0) {
                    const updateCustomer = await this.putCustomer(items, tenantID, items.sid);
                    return updateCustomer;
                }
                else {
                    try {
                        const save = await this.fullClientDynamodb.fullClient.putItem(putItemParams);
                        return save;
                    }
                    catch (error) {
                        console.error('Error to save customers in DB: ', error);
                    }
                }
            })
                .catch((error) => {
                console.log(error);
            });
        }
    }
    removeRowNum(data) {
        const { __rowNum__, ...cleanedData } = data;
        return cleanedData;
    }
    createNewItemFromDomainModel(c, tenantID, buildSid) {
        const currentDate = moment().subtract(5, 'hours');
        let item = {
            sid: { S: c.sid ? c.sid : buildSid },
            createdAt: { S: c.createdAt ? c.createdAt : currentDate.toISOString() },
            name: { S: c.name },
            last_name: { S: c.last_name },
            email: { S: c.email },
            phone: { N: c.phone },
            city: { S: c.city },
            address: { S: c.address },
        };
        if (c.extraInfo !== undefined) {
            item.extraInfo = { S: JSON.stringify(c.extraInfo) };
        }
        const generateTenant = CustomerRepositoryImpl_1.GROUP + '#' + tenantID;
        item = { ...item, pid: { S: generateTenant } };
        return item;
    }
};
CustomerRepositoryImpl.GROUP = Constants_1.CUSTOMER_GROUP;
CustomerRepositoryImpl.appService = new app_service_1.AppService();
exports.CustomerRepositoryImpl = CustomerRepositoryImpl = CustomerRepositoryImpl_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.ClientDynamodb])
], CustomerRepositoryImpl);
//# sourceMappingURL=customer.repository.js.map