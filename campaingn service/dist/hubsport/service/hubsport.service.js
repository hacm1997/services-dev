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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubsportService = void 0;
const common_1 = require("@nestjs/common");
const hubsport_repository_1 = require("../data/hubsport.repository");
let HubsportService = class HubsportService {
    constructor(hubsportRepository) {
        this.hubsportRepository = hubsportRepository;
    }
    async saveCredentialsHubsport(credentialsDTO) {
        const credentialsHubsport = await this.hubsportRepository.saveCredentialsCreate(this.mapDTOToDomain(credentialsDTO));
        if (!credentialsHubsport) {
            throw new Error('Error creating the email campaign');
        }
        return this.mapDomainToDTO(credentialsHubsport);
    }
    async saveClientHubsport(clientDTO) {
        const res = await this.hubsportRepository.saveClientCreate(this.mapDTOToDomainClient(clientDTO));
        if (!res) {
            throw new Error('Error creating the client in Hubsport');
        }
        return res;
    }
    async getAllClentsHubsportByTenant(tenant) {
        const clients = await this.hubsportRepository.getAllClentsHubsportByTenant(tenant);
        if (clients.length > 0) {
            return clients;
        }
        else {
            return [];
        }
    }
    async getCredentialsConfimations(tenant) {
        const res = await this.hubsportRepository.getCredentialsConfimations(tenant);
        return res;
    }
    async DeleteClientsHubsportById(id, tenant) {
        const res = await this.hubsportRepository.DeleteClientsHubsportById(id, tenant);
        return res;
    }
    mapDomainToDTO(credentials) {
        const credentialsModelDTO = {
            tenantName: credentials.tenantName,
            apiKey: credentials.apiKey,
        };
        return credentialsModelDTO;
    }
    mapDTOToDomain(credentialsDTO) {
        const credentialsModel = {
            tenantName: credentialsDTO.tenantName,
            apiKey: credentialsDTO.apiKey,
        };
        return credentialsModel;
    }
    mapDTOToDomainClient(clientDTO) {
        const clientModel = {
            firstname: clientDTO.firstname,
            email: clientDTO.email,
            phone: clientDTO.phone,
            state: clientDTO.state,
            city: clientDTO.city,
            address: clientDTO.address,
            servicio: clientDTO.servicio,
            noticia: clientDTO.noticia,
            tenant: clientDTO.tenant,
        };
        return clientModel;
    }
};
exports.HubsportService = HubsportService;
exports.HubsportService = HubsportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hubsport_repository_1.HubsportRepository])
], HubsportService);
//# sourceMappingURL=hubsport.service.js.map