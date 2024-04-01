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
exports.CampaignResource = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const campaign_service_1 = require("../service/campaign.service");
const transform_interceptor_1 = require("../../common/interceptors/transform/transform.interceptor");
let CampaignResource = class CampaignResource {
    constructor(campaignService) {
        this.campaignService = campaignService;
    }
    async createCampaign(campaignDTO) {
        const campaign = await this.campaignService.campaignCreate(campaignDTO);
        if (!campaign) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        return campaign;
    }
    async putCampaing(campaignDTO) {
        return await this.campaignService.putCampaing(campaignDTO);
    }
    async getAllCampaigns() {
        const campaigns = await this.campaignService.getAllCampaigns();
        if (!campaigns) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        return campaigns;
    }
    async getCampaignById(id) {
        const campaign = await this.campaignService.getCampaignById(id);
        if (!campaign) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        return campaign;
    }
    async sendEmailCampaign(id) {
        return await this.campaignService.sendEmailCampaigns(id);
    }
    async deleteCampaing(id) {
        try {
            return await this.campaignService.deleteCampaign(id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Campaign not deleted');
        }
    }
};
exports.CampaignResource = CampaignResource;
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiBody)({ type: 'EmailCampaignDTO', required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: 'EmailCampaignDTO',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cannot create campaign.' }),
    (0, swagger_1.ApiOperation)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaignResource.prototype, "createCampaign", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'EmailCampaignDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'The campaign cannot be edited' }),
    (0, swagger_1.ApiOperation)({ summary: 'Edit campaign' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaignResource.prototype, "putCampaing", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'EmailCampaignDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get campaigns by tenant' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CampaignResource.prototype, "getAllCampaigns", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'EmailCampaignDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get campaigns by id and tenant' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignResource.prototype, "getCampaignById", null);
__decorate([
    (0, common_1.Get)('/sendEmail/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'SendEmailCampaign' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'campaign not sent' }),
    (0, swagger_1.ApiOperation)({ summary: 'Send campaigns by email' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignResource.prototype, "sendEmailCampaign", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not deleted' }),
    (0, swagger_1.ApiOperation)({ summary: 'Deleted campaign' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignResource.prototype, "deleteCampaing", null);
exports.CampaignResource = CampaignResource = __decorate([
    (0, swagger_1.ApiTags)('campaign'),
    (0, common_1.Controller)('campaigns'),
    (0, common_1.UseInterceptors)(transform_interceptor_1.TransformInterceptor),
    __metadata("design:paramtypes", [campaign_service_1.CampaignService])
], CampaignResource);
//# sourceMappingURL=campaign.resource.js.map