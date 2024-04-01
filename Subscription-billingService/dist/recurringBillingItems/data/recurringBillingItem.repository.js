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
var RecurringBillingItemRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurringBillingItemRepository = void 0;
const common_1 = require("@nestjs/common");
const client_dynamodb_1 = require("../../infrastructure/dynamodb/client.dynamodb");
const generateCode_1 = require("../../common/utils/generateCode");
const Constants_1 = require("../../infrastructure/dynamodb/intializer/Constants");
const moment = require("moment");
const const_1 = require("../../common/constants/const");
let RecurringBillingItemRepository = RecurringBillingItemRepository_1 = class RecurringBillingItemRepository {
    constructor(fullClientDynamodb) {
        this.fullClientDynamodb = fullClientDynamodb;
    }
    async recurringBillingItemCreate(RecurringBillingItem, tenant, nextPay) {
        const item = this.createNewItemFromDomainModel(RecurringBillingItem, tenant, nextPay);
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
    async getRecurrings(date) {
        const params = {
            TableName: Constants_1.TABLE_NAME,
            IndexName: Constants_1.INDEX_ONE,
            KeyConditionExpression: "attri1 = :attri1",
            ExpressionAttributeValues: {
                ":attri1": { S: date },
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
    async getLastRecurringBill(tenant) {
        const generateSid = RecurringBillingItemRepository_1.GROUP + "-" + tenant;
        const currentDate = moment().format("YYYY-MM-DD");
        const params = {
            TableName: Constants_1.TABLE_NAME,
            IndexName: Constants_1.REVERSE_INDEX,
            KeyConditionExpression: "sid = :sid AND begins_with(pid, :pid)",
            FilterExpression: "attri1 >= :attri1",
            ExpressionAttributeValues: {
                ":sid": { S: generateSid },
                ":pid": { S: RecurringBillingItemRepository_1.GROUP },
                ":attri1": { S: currentDate },
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
    async getRecurringByAttri() {
        const params = {
            TableName: Constants_1.TABLE_NAME,
            IndexName: Constants_1.INDEX_ONE_TWO,
            KeyConditionExpression: "attri2 = :attri2",
            ExpressionAttributeValues: {
                ":attri2": { S: RecurringBillingItemRepository_1.GROUP },
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
    async deleteRecurring(recurringCode, tenant) {
        const generateSid = RecurringBillingItemRepository_1.GROUP + "-" + tenant;
        const params = {
            TableName: Constants_1.TABLE_NAME,
            Key: {
                pid: { S: recurringCode },
                sid: { S: generateSid },
            },
        };
        try {
            const blogDelete = await this.fullClientDynamodb.fullClient.deleteItem(params);
            if (blogDelete.ConsumedCapacity) {
                return { message: "recurring not found" };
            }
            else {
                return { message: "recurring deleted success" };
            }
        }
        catch (error) {
            throw new common_1.NotFoundException("recurring to delete not found");
        }
    }
    createNewItemFromDomainModel(c, tenant, nextPay) {
        const momentDate = moment(nextPay);
        const newNextPaymenteDate = momentDate.add(1, "day").format("YYYY-MM-DD");
        let nextPaymentDate = "";
        let billingFrequency = "";
        const currentDate = moment().subtract(5, "hours");
        if (c.billingFrequency.toLowerCase() === "monthly" ||
            c.billingFrequency.toLowerCase() === "month") {
            nextPaymentDate = moment().add(30, "days").format("YYYY-MM-DD");
            billingFrequency = "monthly";
        }
        if (c.billingFrequency.toLowerCase() === "yearly" ||
            c.billingFrequency.toLowerCase() === "year") {
            nextPaymentDate = moment().add(365, "days").format("YYYY-MM-DD");
            billingFrequency = "yearly";
        }
        if (c.billingFrequency.toLowerCase() === "weekly" ||
            c.billingFrequency.toLowerCase() === "week") {
            nextPaymentDate = moment().add(7, "days").format("YYYY-MM-DD");
            billingFrequency = "weekly";
        }
        if (c.billingFrequency.toLowerCase() === "day" ||
            c.billingFrequency.toLowerCase() === "daily") {
            nextPaymentDate = moment().add(1, "days").format("YYYY-MM-DD");
            billingFrequency = "daily";
        }
        let item = {
            billingFrequency: { S: billingFrequency },
            itemCode: { S: c.itemCode },
            itemDescription: { S: c.itemDescription },
            startBillingDate: { S: currentDate.toISOString() },
        };
        const buildPid = (0, generateCode_1.default)(RecurringBillingItemRepository_1.GROUP);
        const buildSid = RecurringBillingItemRepository_1.GROUP + "-" + tenant;
        item = {
            ...item,
            pid: { S: buildPid },
            sid: { S: buildSid },
            attri1: {
                S: newNextPaymenteDate ? newNextPaymenteDate : nextPaymentDate,
            },
            attri2: { S: RecurringBillingItemRepository_1.GROUP },
            itemSource: { S: buildSid },
        };
        return item;
    }
    mapToDomain(item) {
        const newItem = {
            tenant: item.sid.S,
            bitID: item.pid.S,
            billingFrequency: item.billingFrequency.S,
            itemCode: item.itemCode.S,
            itemDescription: item.itemDescription.S,
            itemSource: item.itemSource.S,
            startBillingDate: item.startBillingDate.S,
            nextPaymentDate: item.attri1.S,
        };
        return newItem;
    }
};
exports.RecurringBillingItemRepository = RecurringBillingItemRepository;
RecurringBillingItemRepository.GROUP = const_1.RECURRING_GROUP;
exports.RecurringBillingItemRepository = RecurringBillingItemRepository = RecurringBillingItemRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_dynamodb_1.ClientDynamodb])
], RecurringBillingItemRepository);
//# sourceMappingURL=recurringBillingItem.repository.js.map