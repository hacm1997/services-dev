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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubsportResource = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const hubsport_service_1 = require("../service/hubsport.service");
let HubsportResource = class HubsportResource {
    constructor(hubsportService) {
        this.hubsportService = hubsportService;
    }
    async saveCredentialsHubsport(credentialsDTO) {
        const credentias = await this.hubsportService.saveCredentialsHubsport(credentialsDTO);
        if (!credentias) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        return credentias;
    }
    async saveClientHubsport(clientHubsportDTO) {
        const res = await this.hubsportService.saveClientHubsport(clientHubsportDTO);
        if (!res) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        return res;
    }
    async getAllClentsHubsportByTenant(tenant) {
        const clients = await this.hubsportService.getAllClentsHubsportByTenant(tenant);
        if (!clients) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        return clients;
    }
    async getCredentialsConfimations(tenant) {
        const res = await this.hubsportService.getCredentialsConfimations(tenant);
        return res;
    }
    async DeleteClientsHubsportById(id, tenant) {
        const res = await this.hubsportService.DeleteClientsHubsportById(id, tenant);
        return res;
    }
};
exports.HubsportResource = HubsportResource;
__decorate([
    (0, common_1.Post)('/credentials'),
    (0, swagger_1.ApiBody)({ type: 'CredentialsHubsportDTO', required: true }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: 'CredentialsHubsportDTO',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cannot save credentials.' }),
    (0, swagger_1.ApiOperation)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HubsportResource.prototype, "saveCredentialsHubsport", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiBody)({ type: 'ClientHubsportDTO', required: true }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: 'ClientHubsportDTO',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cannot save client.' }),
    (0, swagger_1.ApiOperation)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HubsportResource.prototype, "saveClientHubsport", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'ClientHubsportDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Clients not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get all clients by tenant' }),
    __param(0, (0, common_1.Query)('tenant')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HubsportResource.prototype, "getAllClentsHubsportByTenant", null);
__decorate([
    (0, common_1.Get)('/configCredencials'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'CredentialsHubsportDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'credentials not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get confirmations credentials by tenant' }),
    __param(0, (0, common_1.Query)('tenant')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HubsportResource.prototype, "getCredentialsConfimations", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'ClientHubsportDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Clients not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Delete clients by id and tenant' }),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Query)('tenant')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HubsportResource.prototype, "DeleteClientsHubsportById", null);
exports.HubsportResource = HubsportResource = __decorate([
    (0, swagger_1.ApiTags)('hubsport'),
    (0, common_1.Controller)('hubsport'),
    __metadata("design:paramtypes", [hubsport_service_1.HubsportService])
], HubsportResource);
//# sourceMappingURL=hubsport.resource.js.map