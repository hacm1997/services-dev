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
exports.TrackingEmailService = void 0;
const common_1 = require("@nestjs/common");
const trackingEmail_repository_1 = require("../data/trackingEmail.repository");
const cifrado_service_1 = require("../../common/general-services/general-functions/cifrado.service");
const functions_1 = require("../util/functions");
const campaign_repository_1 = require("../../campaign/data/campaign.repository");
let TrackingEmailService = class TrackingEmailService {
    constructor(trackingRepository, campaignRepository) {
        this.trackingRepository = trackingRepository;
        this.campaignRepository = campaignRepository;
    }
    async getImgPixel(uniqueCode) {
        const imgPixel = await this.trackingRepository.getTrackingEmail(uniqueCode);
        if (!imgPixel) {
            throw new common_1.NotFoundException('imgPixel not found');
        }
        return imgPixel;
    }
    async putStatusNotificationTrackingEmail(uniqueCode) {
        return await this.trackingRepository.putStatusNotificationTrackingEmail(uniqueCode);
    }
    async getStatisticsShipping(idCampaign) {
        if (idCampaign !== undefined && idCampaign !== 'undefined') {
            const startSid = await (0, cifrado_service_1.HasEncode)(idCampaign);
            const campaign = await this.campaignRepository.getCampaingItemByKeyTrackingEmail(idCampaign);
            const quantity = await (0, functions_1.getQuantityEmailBySend)(campaign.file.S);
            return await this.trackingRepository.getStatisticsShipping(idCampaign, startSid, campaign, quantity);
        }
    }
};
exports.TrackingEmailService = TrackingEmailService;
exports.TrackingEmailService = TrackingEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [trackingEmail_repository_1.TrackingRepository,
        campaign_repository_1.CampaignRepository])
], TrackingEmailService);
//# sourceMappingURL=trackingEmail.service.js.map