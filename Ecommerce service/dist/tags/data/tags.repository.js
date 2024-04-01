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
var TagsRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../infrastructure/dynamodb/client");
const Constants_1 = require("../../infrastructure/dynamodb/intializer/Constants");
let TagsRepository = exports.TagsRepository = TagsRepository_1 = class TagsRepository {
    constructor(fullClientDynamodb) {
        this.fullClientDynamodb = fullClientDynamodb;
    }
    async TagCreate(tag, tenant) {
        const item = this.createNewItemFromDomainModel(tag, tenant);
        const artifact = {
            TableName: Constants_1.TABLE_NAME,
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
    async geTagsByVehicle(vehicle, tenant) {
        const tenantNew = TagsRepository_1.GROUP + '#' + tenant;
        const params = {
            TableName: Constants_1.TABLE_NAME,
            KeyConditionExpression: 'pid = :pid',
            FilterExpression: 'begins_with(description, :description)',
            ExpressionAttributeValues: {
                ':pid': { S: tenantNew },
                ':description': { S: vehicle },
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
    async getTagsByCode(tagCode, tenant) {
        const tenantNew = TagsRepository_1.GROUP + '#' + tenant;
        const params = {
            TableName: Constants_1.TABLE_NAME,
            KeyConditionExpression: 'pid = :pid AND sid = :sid',
            ExpressionAttributeValues: {
                ':pid': { S: tenantNew },
                ':sid': { S: tagCode },
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
    async getAllTags(tenant) {
        const tenantNew = TagsRepository_1.GROUP + '#' + tenant;
        const params = {
            TableName: Constants_1.TABLE_NAME,
            KeyConditionExpression: 'pid = :pid',
            ExpressionAttributeValues: {
                ':pid': { S: tenantNew },
            },
        };
        try {
            const data = await this.fullClientDynamodb.fullClient.query(params);
            return data.Items.map((item) => this.mapToDomainAll(item));
        }
        catch (error) {
            throw error;
        }
    }
    async putTag(id, tag, tenant) {
        const delteTagReq = await this.deleteTag(tenant, id)
            .then(async () => {
            const newTag = await this.TagCreate(tag, tenant).then(() => {
                return { message: 'Tag update succesfull' };
            });
            return newTag;
        })
            .catch(() => {
            throw new common_1.NotFoundException('tag to delete not found');
        });
        return delteTagReq;
    }
    async deleteTag(tenant, sid) {
        const tenantNew = TagsRepository_1.GROUP + '#' + tenant;
        const params = {
            TableName: Constants_1.TABLE_NAME,
            Key: {
                pid: { S: tenantNew },
                sid: { S: sid },
            },
        };
        try {
            const tagDelete = await this.fullClientDynamodb.fullClient.deleteItem(params);
            if (tagDelete.ConsumedCapacity) {
                return { message: 'Tag not found' };
            }
            else {
                return { message: 'tag deleted success' };
            }
        }
        catch (error) {
            throw new common_1.NotFoundException('tag to delete not found');
        }
    }
    createNewItemFromDomainModel(c, tenant) {
        let item = {
            sid: { S: c.description },
            description: { S: c.tags },
        };
        const buildTenant = TagsRepository_1.GROUP + '#' + tenant;
        item = { ...item, pid: { S: buildTenant } };
        return item;
    }
    mapToDomain(item) {
        const newItem = {
            tenantId: item.pid.S,
            tags: item.description.S,
            description: item.sid.S,
        };
        return newItem;
    }
    mapToDomainAll(item) {
        const newItem = {
            tags: item.description.S,
            description: item.sid.S,
        };
        return newItem;
    }
};
TagsRepository.GROUP = 'TAG';
exports.TagsRepository = TagsRepository = TagsRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.ClientDynamodb])
], TagsRepository);
//# sourceMappingURL=tags.repository.js.map