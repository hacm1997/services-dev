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
exports.CampaignService = void 0;
const common_1 = require("@nestjs/common");
const campaign_repository_1 = require("../data/campaign.repository");
let CampaignService = class CampaignService {
    constructor(campaignRepository) {
        this.campaignRepository = campaignRepository;
    }
    async campaignCreate(campaigntDTO) {
        const createdCampaign = await this.campaignRepository.campaignCreate(this.mapDTOToDomain(campaigntDTO));
        if (!createdCampaign) {
            throw new Error('Error creating the email campaign');
        }
        return this.mapDomainToDTO(createdCampaign);
    }
    async putCampaing(campaignDTO) {
        const putCampaing = await this.campaignRepository.putCampaing(campaignDTO);
        return this.mapDomainToDTO(putCampaing);
    }
    async getAllCampaigns() {
        const campaigns = await this.campaignRepository.getAllCampaigns();
        if (campaigns.length > 0) {
            return campaigns.map(this.mapDomainToDTO);
        }
        else {
            return [];
        }
    }
    async getCampaignById(id) {
        const campaigns = await this.campaignRepository.getCampaignsById(id);
        return this.mapDomainToDTO(campaigns);
    }
    async sendEmailCampaigns(id) {
        return await this.campaignRepository.sendEmailCampaigns(id);
    }
    async deleteCampaign(id) {
        try {
            return await this.campaignRepository.deleteCampaign(id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Campaign not deleted');
        }
    }
    mapDTOToDomain(campaignDTO) {
        const campaignModel = {
            title: campaignDTO.title,
            subject: campaignDTO.subject,
            body: campaignDTO.body,
            file: campaignDTO?.file ?? '',
        };
        return campaignModel;
    }
    mapDomainToDTO(campaign) {
        const campaignModelDTO = {
            id: campaign.id,
            title: campaign.title,
            subject: campaign.subject,
            body: campaign.body,
            file: campaign.file ?? '',
        };
        return campaignModelDTO;
    }
};
exports.CampaignService = CampaignService;
exports.CampaignService = CampaignService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [campaign_repository_1.CampaignRepository])
], CampaignService);
//# sourceMappingURL=campaign.service.js.map