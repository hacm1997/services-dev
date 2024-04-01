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
var CompanyRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRepository = void 0;
const common_1 = require("@nestjs/common");
const client_dynamodb_1 = require("../../infrastructure/dynamodb/client.dynamodb");
const Constants_1 = require("../../infrastructure/dynamodb/intializer/Constants");
const microlib_1 = require("@beamar/microlib");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
let CompanyRepository = CompanyRepository_1 = class CompanyRepository {
    constructor(fullClientDynamodb) {
        this.fullClientDynamodb = fullClientDynamodb;
    }
    async createCompany(item) {
        try {
            const param = this.createNewItemFromDomainModel(item);
            const artifact = {
                TableName: Constants_1.TABLE_CONTACT_NAME,
                Item: param,
            };
            await this.fullClientDynamodb.fullClient.putItem(artifact);
            return this.mapToDomain(param);
        }
        catch (error) {
            return error;
        }
    }
    async getAllCompanies() {
        const params = {
            TableName: Constants_1.TABLE_CONTACT_NAME,
            IndexName: Constants_1.REVERSE_INDEX,
            KeyConditionExpression: 'sid = :sid AND begins_with(pid, :pid)',
            ExpressionAttributeValues: {
                ':pid': { S: CompanyRepository_1.GROUP },
                ':sid': { S: microlib_1.DomainSession.getTenantId() },
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
    async getCompanyById(companyId) {
        const params = {
            TableName: Constants_1.TABLE_CONTACT_NAME,
            KeyConditionExpression: 'pid = :pid',
            ExpressionAttributeValues: {
                ':pid': { S: companyId },
            },
        };
        try {
            const data = await this.fullClientDynamodb.fullClient.query(params);
            return this.mapToDomain(data.Items[0]);
        }
        catch (error) {
            throw error;
        }
    }
    async updateCompany(companyId, company) {
        const params = new lib_dynamodb_1.UpdateCommand({
            TableName: Constants_1.TABLE_CONTACT_NAME,
            Key: {
                pid: companyId,
                sid: microlib_1.DomainSession.getTenantId(),
            },
            UpdateExpression: 'SET #name = :name, #companyInfo = :companyInfo',
            ExpressionAttributeNames: {
                '#name': 'name',
                '#companyInfo': 'companyInfo',
            },
            ExpressionAttributeValues: {
                ':name': company.name,
                ':companyInfo': company.companyInfo
                    ? JSON.stringify(company.companyInfo)
                    : '',
            },
            ReturnValues: 'ALL_NEW',
        });
        try {
            await this.fullClientDynamodb.fullClient.send(params);
            return company;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteCompany(companyId) {
        try {
            return await this.fullClientDynamodb.fullClient.deleteItem({
                Key: {
                    pid: { S: companyId },
                    sid: { S: microlib_1.DomainSession.getTenantId() },
                },
                TableName: Constants_1.TABLE_CONTACT_NAME,
            });
        }
        catch (error) {
            throw error;
        }
    }
    createNewItemFromDomainModel(company) {
        let item = {
            name: { S: company.name },
        };
        if (company.companyInfo) {
            item.companyInfo = { S: JSON.stringify(company.companyInfo) };
        }
        const pidsid = microlib_1.TUID.generateCreztuIDDynamoDBBasedOnTenant(CompanyRepository_1.GROUP);
        const indiceGuion = pidsid.pid.S.indexOf('-');
        let newPid = '';
        if (indiceGuion !== -1) {
            newPid = pidsid.pid.S.substring(indiceGuion + 1);
        }
        item = { ...item, pid: { S: newPid }, sid: pidsid.sid };
        return item;
    }
    mapToDomain(item) {
        const newItem = {
            id: item.pid.S,
            name: item.name.S,
            companyInfo: item.companyInfo && item.companyInfo.S !== ''
                ? JSON.parse(item.companyInfo.S)
                : '',
        };
        return newItem;
    }
};
exports.CompanyRepository = CompanyRepository;
CompanyRepository.GROUP = 'COM';
exports.CompanyRepository = CompanyRepository = CompanyRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_dynamodb_1.ClientDynamodb])
], CompanyRepository);
//# sourceMappingURL=company.repository.js.map