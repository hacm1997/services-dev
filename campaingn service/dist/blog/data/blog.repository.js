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
var BlogRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRepository = void 0;
const common_1 = require("@nestjs/common");
const Constants_1 = require("../../infrastructure/dynamodb/intializer/Constants");
const client_dynamodb_1 = require("../../infrastructure/dynamodb/client.dynamodb");
const genarateCode_1 = require("../utils/genarateCode");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
let BlogRepository = BlogRepository_1 = class BlogRepository {
    constructor(fullClientDynamodb) {
        this.fullClientDynamodb = fullClientDynamodb;
    }
    async blogCreate(blog, tenant) {
        const item = this.createNewItemFromDomainModel(blog, tenant);
        const artifact = {
            TableName: Constants_1.TABLE_BLOG_NAME,
            Item: item,
        };
        try {
            await this.fullClientDynamodb.fullClient.putItem(artifact);
            return this.mapToDomain(item);
        }
        catch (error) {
            throw error;
        }
    }
    async getAllBlogs(tenant) {
        const tenantNew = BlogRepository_1.GROUP + '-' + tenant;
        const params = {
            TableName: Constants_1.TABLE_BLOG_NAME,
            KeyConditionExpression: 'pid = :pid',
            ExpressionAttributeValues: {
                ':pid': { S: tenantNew },
            },
        };
        try {
            const data = await this.fullClientDynamodb.fullClient.query(params);
            return data.Items.map((item) => this.mapToDomain(item));
        }
        catch (error) {
            throw error;
        }
    }
    async getBlogsByPage(tenant, pageNumber, pageSize, lastEvaluatedKey) {
        const tenantNew = BlogRepository_1.GROUP + '-' + tenant;
        const params = {
            TableName: Constants_1.TABLE_BLOG_NAME,
            KeyConditionExpression: 'pid = :pid',
            ExpressionAttributeValues: {
                ':pid': { S: tenantNew },
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
                items: filteredItems.map((item) => this.mapToDomain(item)),
                lastEvaluatedKey: data.LastEvaluatedKey,
            };
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async fetchResultsWithPagination(tenant, pageNumber, pageSize, lastEvaluatedKey, accumulatedResults = []) {
        const result = await this.getBlogsByPage(tenant, pageNumber, pageSize, lastEvaluatedKey);
        lastEvaluatedKey = result.lastEvaluatedKey;
        accumulatedResults.push(result);
        if (lastEvaluatedKey) {
            pageNumber++;
            return this.fetchResultsWithPagination(tenant, pageNumber, pageSize, lastEvaluatedKey, accumulatedResults);
        }
        return { results: accumulatedResults, totalPages: pageNumber };
    }
    getLastEvaluatedKey(lastEvaluatedKeyFromPreviousCall) {
        return lastEvaluatedKeyFromPreviousCall;
    }
    async getBlogById(id, tenant) {
        const tenantNew = BlogRepository_1.GROUP + '-' + tenant;
        return this.mapToDomain(await this.getBlogItemByKey(id, tenantNew));
    }
    async getBlogItemByKey(id, tenant) {
        try {
            const blog = await this.fullClientDynamodb.fullClient.getItem({
                Key: {
                    pid: { S: tenant },
                    sid: { S: id },
                },
                TableName: Constants_1.TABLE_BLOG_NAME,
            });
            return blog.Item;
        }
        catch (error) {
            throw error;
        }
    }
    async putBlog(id, blog, tenant) {
        const tenantNew = BlogRepository_1.GROUP + '-' + tenant;
        const expressionAttributeNames = {
            '#product_status': 'status',
        };
        const params = new lib_dynamodb_1.UpdateCommand({
            TableName: Constants_1.TABLE_BLOG_NAME,
            Key: {
                pid: tenantNew,
                sid: id,
            },
            UpdateExpression: 'SET title = :title, image = :image, content = :content, #product_status = :status, extraInfo = :extraInfo, createdAt = :createdAt',
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: {
                ':title': blog.title,
                ':image': blog.image,
                ':content': blog.content,
                ':status': blog.status,
                ':extraInfo': JSON.stringify(blog.extraInfo) || null,
                ':createdAt': new Date().toISOString(),
            },
            ReturnValues: 'ALL_NEW',
        });
        try {
            await this.fullClientDynamodb.fullClient.send(params);
            return blog;
        }
        catch (error) {
            throw error;
        }
    }
    async putBlogStatus(id, status, tenant) {
        const tenantNew = BlogRepository_1.GROUP + '-' + tenant;
        const updateExpression = 'SET #blog_status = :status';
        const expressionAttributeValues = {
            ':status': status,
        };
        const expressionAttributeNames = {
            '#blog_status': 'status',
        };
        const params = new lib_dynamodb_1.UpdateCommand({
            TableName: Constants_1.TABLE_BLOG_NAME,
            Key: {
                pid: tenantNew,
                sid: id,
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW',
        });
        try {
            await this.fullClientDynamodb.fullClient.send(params);
            return { message: 'Blog status updated successfull' };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteBlog(tenant, sid) {
        const tenantNew = BlogRepository_1.GROUP + '-' + tenant;
        const params = {
            TableName: Constants_1.TABLE_BLOG_NAME,
            Key: {
                pid: { S: tenantNew },
                sid: { S: sid },
            },
        };
        try {
            const blogDelete = await this.fullClientDynamodb.fullClient.deleteItem(params);
            if (blogDelete.ConsumedCapacity) {
                return { message: 'Blog not found' };
            }
            else {
                return { message: 'Blog deleted success' };
            }
        }
        catch (error) {
            throw new common_1.NotFoundException('Blog to delete not found');
        }
    }
    createNewItemFromDomainModel(c, tenant) {
        const currentDate = new Date();
        let item = {
            title: { S: c.title },
            image: { S: c.image },
            content: { S: c.content },
            status: { S: c.status },
            createdAt: { S: currentDate.toISOString() },
        };
        if (c.extraInfo) {
            item.extraInfo = { S: JSON.stringify(c.extraInfo) };
        }
        const buildSid = (0, genarateCode_1.default)(BlogRepository_1.GROUP);
        const buildTenant = BlogRepository_1.GROUP + '-' + tenant;
        item = { ...item, pid: { S: buildTenant }, sid: { S: buildSid } };
        return item;
    }
    mapToDomain(item) {
        const newItem = {
            tenantId: item.sid.S,
            id: item.sid.S,
            title: item.title.S,
            image: item.image.S,
            content: item.content.S,
            status: item.status.S,
            createdAt: item.createdAt.S,
        };
        if (item.extraInfo) {
            newItem.extraInfo = JSON.parse(item.extraInfo.S);
        }
        return newItem;
    }
};
exports.BlogRepository = BlogRepository;
BlogRepository.GROUP = 'BLG';
exports.BlogRepository = BlogRepository = BlogRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_dynamodb_1.ClientDynamodb])
], BlogRepository);
//# sourceMappingURL=blog.repository.js.map