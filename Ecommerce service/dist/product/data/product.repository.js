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
var ProductRepositoryImpl_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../infrastructure/dynamodb/client");
const Constants_1 = require("../../infrastructure/dynamodb/intializer/Constants");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const transform_data_1 = require("./transform-data");
const app_service_1 = require("../../app.service");
const moment = require("moment");
const idGenerator_1 = require("../util/idGenerator");
let ProductRepositoryImpl = exports.ProductRepositoryImpl = ProductRepositoryImpl_1 = class ProductRepositoryImpl {
    constructor(fullClientDynamodb) {
        this.fullClientDynamodb = fullClientDynamodb;
    }
    async saveDataToDynamoDB(data, tenantID) {
        for (const item of data) {
            const buildSid = (0, idGenerator_1.default)(Constants_1.PRODUCT_GROUP);
            const items = this.createNewItemFromDomainModel(this.removeRowNum(item), tenantID, buildSid);
            const putItemParams = {
                TableName: Constants_1.TABLE_NAME,
                Item: items,
            };
            await this.getAllProductsById(items.sid, tenantID)
                .then(async () => {
                const updateProduct = await this.putProduct(items, tenantID, items.sid);
                return updateProduct;
            })
                .catch(async () => {
                try {
                    const save = await this.fullClientDynamodb.fullClient.putItem(putItemParams);
                    return save;
                }
                catch (error) {
                    console.log(error);
                    return { message: 'Error to save products in DB: ' };
                }
            });
        }
    }
    removeRowNum(data) {
        const { __rowNum__, ...cleanedData } = data;
        return cleanedData;
    }
    async createProduct(product) {
        const artifact = {
            TableName: Constants_1.TABLE_NAME,
            Item: product.getItem(),
        };
        console.log(`ARTIFACT TO CREATE ${JSON.stringify(artifact)}`);
        await this.fullClientDynamodb.fullClient.putItem(artifact);
        return product;
    }
    async getAllProducts(tenantID) {
        const generateTenant = ProductRepositoryImpl_1.GROUP + '#' + tenantID;
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
        const result = await ProductRepositoryImpl_1.appService.getAllData(params, resulTwo, []);
        return (0, transform_data_1.default)(result);
    }
    async getAllProductsPerPage(tenantID, pageNumber, pageSize, lastEvaluatedKey) {
        const generateTenant = ProductRepositoryImpl_1.GROUP + '#' + tenantID;
        const params = {
            TableName: Constants_1.TABLE_NAME,
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
                items: (0, transform_data_1.transformDataPaginate)(filteredItems),
                lastEvaluatedKey: data.LastEvaluatedKey,
            };
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async fetchResultsWithPagination(tenant, pageNumber, pageSize, lastEvaluatedKey, accumulatedResults = []) {
        const result = await this.getAllProductsPerPage(tenant, pageNumber, pageSize, lastEvaluatedKey);
        lastEvaluatedKey = result.lastEvaluatedKey;
        accumulatedResults.push(result);
        if (lastEvaluatedKey) {
            pageNumber++;
            return this.fetchResultsWithPagination(tenant, pageNumber, pageSize, lastEvaluatedKey, accumulatedResults);
        }
        return { results: accumulatedResults, totalPages: pageNumber };
    }
    async getAllProductsById(id, tenantID) {
        let final_tenant = '';
        if (tenantID.includes(ProductRepositoryImpl_1.GROUP)) {
            final_tenant = tenantID;
        }
        else {
            final_tenant = ProductRepositoryImpl_1.GROUP + '#' + tenantID;
        }
        const params = {
            TableName: Constants_1.TABLE_NAME,
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
        const result = await ProductRepositoryImpl_1.appService.getAllData(params, resulTwo, []);
        return (0, transform_data_1.default)(result);
    }
    async getProductsByParams(city, status, minPrice, maxPrice, tenantID, freeShipping) {
        const generateTenant = ProductRepositoryImpl_1.GROUP + '#' + tenantID;
        const params = {
            TableName: Constants_1.TABLE_NAME,
            KeyConditionExpression: 'pid = :pid',
            FilterExpression: '#product_status = :status',
            ExpressionAttributeNames: {
                '#product_status': 'status',
            },
            ExpressionAttributeValues: {
                ':pid': {
                    S: generateTenant,
                },
                ':status': {
                    S: status,
                },
            },
        };
        if (minPrice && maxPrice) {
            params.FilterExpression +=
                ' AND #product_price BETWEEN :minPrice AND :maxPrice';
            params.ExpressionAttributeNames['#product_price'] = 'price';
            params.ExpressionAttributeValues[':minPrice'] = {
                N: minPrice.toString(),
            };
            params.ExpressionAttributeValues[':maxPrice'] = {
                N: maxPrice.toString(),
            };
        }
        const resulTwo = await this.fullClientDynamodb.fullClient.query(params);
        const result = await ProductRepositoryImpl_1.appService.getAllData(params, resulTwo, []);
        const parsedResult = result.map((item) => {
            const extraInfo = JSON.parse(item.extraInfo.S);
            return { ...item, extraInfo };
        });
        if (city) {
            const filteredResult = parsedResult.filter((item) => {
                const convertFreeShippint = typeof freeShipping === 'undefined' ? 0 : freeShipping;
                if (convertFreeShippint !== 0) {
                    const convertBoolean = Number(freeShipping) === 1 ? true : false;
                    return (item.extraInfo.city === city &&
                        item.extraInfo.free_shipping === convertBoolean);
                }
                else {
                    console.log('return 2');
                    return item.extraInfo.city === city;
                }
            });
            return (0, transform_data_1.default)(filteredResult);
        }
        else {
            return (0, transform_data_1.default)(parsedResult);
        }
    }
    async putProduct(product, tenantID, id) {
        const generateTenant = ProductRepositoryImpl_1.GROUP + '#' + tenantID;
        const updateExpression = 'SET #product_name = :name, image = :image, description = :description, price = :price, #product_status = :status, extraInfo = :extraInfo, inventory = :inventory';
        console.log('update => ', product.inventory);
        const expressionAttributeValues = {
            ':name': product.name,
            ':price': Number(product.price),
            ':image': product.image || '',
            ':description': product.description || '',
            ':status': product.status,
            ':extraInfo': product.extraInfo
                ? JSON.stringify(product.extraInfo)
                : { NULL: true },
            ':inventory': product.inventory ? Number(product.inventory) : 'undefined',
        };
        const expressionAttributeNames = {
            '#product_name': 'name',
            '#product_status': 'status',
        };
        const params = new lib_dynamodb_1.UpdateCommand({
            TableName: Constants_1.TABLE_NAME,
            Key: {
                pid: generateTenant,
                sid: id,
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW',
        });
        try {
            await this.fullClientDynamodb.fullClient.send(params);
            return product;
        }
        catch (error) {
            throw error;
        }
    }
    async getProductCategories(tenantID) {
        const generateTenant = ProductRepositoryImpl_1.GROUP + '#' + tenantID;
        const params = {
            TableName: Constants_1.TABLE_NAME,
            KeyConditionExpression: 'pid = :pid',
            ExpressionAttributeValues: {
                ':pid': {
                    S: generateTenant,
                },
            },
        };
        const resulTwo = await this.fullClientDynamodb.fullClient.query(params);
        const result = await ProductRepositoryImpl_1.appService.getAllData(params, resulTwo, []);
        return (0, transform_data_1.default)(result);
    }
    async putProductStatus(productID, status, tenantID) {
        const generateTenant = ProductRepositoryImpl_1.GROUP + '#' + tenantID;
        const updateExpression = 'SET #product_status = :status';
        const expressionAttributeValues = {
            ':status': status,
        };
        const expressionAttributeNames = {
            '#product_status': 'status',
        };
        const params = new lib_dynamodb_1.UpdateCommand({
            TableName: Constants_1.TABLE_NAME,
            Key: {
                pid: generateTenant,
                sid: productID,
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW',
        });
        try {
            await this.fullClientDynamodb.fullClient.send(params);
            return { message: 'Product status updated successfull' };
        }
        catch (error) {
            throw error;
        }
    }
    async putProductInventory(productID, quantity, tenantID, isSum) {
        const generateTenant = ProductRepositoryImpl_1.GROUP + '#' + tenantID;
        const updateOperator = isSum === 'true' ? '+' : '-';
        const params = new lib_dynamodb_1.UpdateCommand({
            TableName: Constants_1.TABLE_NAME,
            Key: {
                pid: generateTenant,
                sid: productID,
            },
            UpdateExpression: `SET #inventory = #inventory ${updateOperator} :quantity`,
            ExpressionAttributeNames: {
                '#inventory': 'inventory',
            },
            ExpressionAttributeValues: {
                ':quantity': quantity,
            },
            ReturnValues: 'ALL_NEW',
        });
        try {
            await this.fullClientDynamodb.fullClient.send(params);
            return { message: 'Product inventory updated successfull' };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteProduct(id, tenantID) {
        const generateTenant = ProductRepositoryImpl_1.GROUP + '#' + tenantID;
        const params = {
            TableName: Constants_1.TABLE_NAME,
            Key: {
                pid: { S: generateTenant },
                sid: { S: id },
            },
        };
        try {
            const blogDelete = await this.fullClientDynamodb.fullClient.deleteItem(params);
            if (blogDelete.ConsumedCapacity) {
                return { message: 'Product not found' };
            }
            else {
                return { message: 'Product deleted success' };
            }
        }
        catch (error) {
            throw new common_1.NotFoundException('Product to delete not found');
        }
    }
    createNewItemFromDomainModel(c, tenantID, buildSid) {
        const currentDate = moment().subtract(5, 'hours');
        let item = {
            sid: { S: c.sid ? c.sid : buildSid },
            createdAt: { S: c.createdAt ? c.createdAt : currentDate.toISOString() },
            name: { S: c.name },
            price: { N: c.price },
            status: { S: c.status },
            image: { S: c.image },
            description: { S: c.description },
            inventory: { N: c.inventory },
        };
        if (c.extraInfo !== undefined) {
            item.extraInfo = { S: JSON.stringify(c.extraInfo) };
        }
        const generateTenant = ProductRepositoryImpl_1.GROUP + '#' + tenantID;
        item = { ...item, pid: { S: generateTenant } };
        return item;
    }
};
ProductRepositoryImpl.GROUP = Constants_1.PRODUCT_GROUP;
ProductRepositoryImpl.appService = new app_service_1.AppService();
exports.ProductRepositoryImpl = ProductRepositoryImpl = ProductRepositoryImpl_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.ClientDynamodb])
], ProductRepositoryImpl);
//# sourceMappingURL=product.repository.js.map