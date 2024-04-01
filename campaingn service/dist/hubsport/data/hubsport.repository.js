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
var HubsportRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubsportRepository = void 0;
const common_1 = require("@nestjs/common");
const client_dynamodb_1 = require("../../infrastructure/dynamodb/client.dynamodb");
const Constants_1 = require("../../infrastructure/dynamodb/intializer/Constants");
const hubsportSend_service_1 = require("../service/hubsportSend.service");
let HubsportRepository = HubsportRepository_1 = class HubsportRepository {
    constructor(fullClientDynamodb, sendClientHubsportService) {
        this.fullClientDynamodb = fullClientDynamodb;
        this.sendClientHubsportService = sendClientHubsportService;
    }
    async saveCredentialsCreate(credencial) {
        const item = this.createNewItemFromDomainModel(credencial);
        const artifact = {
            TableName: Constants_1.TABLE_HUBSPORT_NAME,
            Item: item,
        };
        try {
            await this.fullClientDynamodb.fullClient.putItem(artifact);
            return this.mapToDomain(item);
        }
        catch (error) {
            return error;
        }
    }
    async saveClientCreate(client) {
        const item = this.createNewItemFromDomainModelClient(client);
        try {
            const res = await this.searchTokenByTenant(item.tenant);
            if (!res) {
                return false;
            }
            const contact = {
                ...item,
                token: res[0].sid.S,
            };
            const saveClient = await this.sendClientHubsportService.sendClientHubsport(contact);
            return saveClient;
        }
        catch (error) {
            return error;
        }
    }
    async getAllClentsHubsportByTenant(tenant) {
        const res = await this.searchTokenByTenant(tenant);
        const token = res[0].sid.S;
        const clients = await this.sendClientHubsportService.getClientHubsport(token);
        if (clients.length > 0) {
            return clients;
        }
        return [];
    }
    async getCredentialsConfimations(tenant) {
        const res = await this.searchTokenByTenant(tenant);
        if (!res) {
            return {
                token: '',
                status: false,
            };
        }
        return {
            token: res[0].sid.S,
            status: true,
        };
    }
    async DeleteClientsHubsportById(id, tenant) {
        const res = await this.searchTokenByTenant(tenant);
        const token = res[0].sid.S;
        const resDelete = await this.sendClientHubsportService.DeleteClientHubsport(id, token);
        return resDelete;
    }
    async searchTokenByTenant(tenant) {
        const buildPid = `${HubsportRepository_1.GROUP}-${tenant}`;
        const params = {
            TableName: Constants_1.TABLE_HUBSPORT_NAME,
            KeyConditionExpression: 'pid = :tenant',
            ExpressionAttributeValues: {
                ':tenant': {
                    S: buildPid,
                },
            },
        };
        try {
            const credencial = await this.fullClientDynamodb.fullClient.query(params);
            return credencial.Items;
        }
        catch (error) {
            throw error;
        }
    }
    mapToDomain(item) {
        const newItem = {
            tenantName: item.pid.S.split('-')[1],
            id: item.pid.S,
            apiKey: item.sid.S,
        };
        return newItem;
    }
    createNewItemFromDomainModel(h) {
        const buildPi = `${HubsportRepository_1.GROUP}-${h.tenantName}`;
        const item = {
            pid: { S: buildPi },
            sid: { S: h.apiKey },
        };
        return item;
    }
    createNewItemFromDomainModelClient(c) {
        const item = {
            firstname: c.firstname,
            email: c.email,
            phone: c.phone,
            state: c.state,
            city: c.city,
            address: c.address,
            servicio: c.servicio,
            noticia: c.noticia,
            tenant: c.tenant,
        };
        return item;
    }
};
exports.HubsportRepository = HubsportRepository;
HubsportRepository.GROUP = 'CLHT';
exports.HubsportRepository = HubsportRepository = HubsportRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_dynamodb_1.ClientDynamodb,
        hubsportSend_service_1.SendClientHubsportService])
], HubsportRepository);
//# sourceMappingURL=hubsport.repository.js.map