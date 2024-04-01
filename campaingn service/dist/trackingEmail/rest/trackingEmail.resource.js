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
exports.TrackingController = void 0;
const common_1 = require("@nestjs/common");
const trackingEmail_service_1 = require("../service/trackingEmail.service");
const swagger_1 = require("@nestjs/swagger");
let TrackingController = class TrackingController {
    constructor(trackingService) {
        this.trackingService = trackingService;
    }
    async createdContactTakingEmail(uniqueCode) {
        const result = await this.trackingService.getImgPixel(uniqueCode);
        return result;
    }
    async putStatusNotificationTrackingEmail(uniqueCode) {
        return await this.trackingService.putStatusNotificationTrackingEmail(uniqueCode);
    }
    async getStatisticsShipping(idCampaign) {
        return await this.trackingService.getStatisticsShipping(idCampaign);
    }
};
exports.TrackingController = TrackingController;
__decorate([
    (0, common_1.Get)('/:uniqueCode'),
    (0, common_1.Header)('content-type', 'image/svg+xml'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'TrackingEmail' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tracking not found' }),
    __param(0, (0, common_1.Param)('uniqueCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "createdContactTakingEmail", null);
__decorate([
    (0, common_1.Get)('/notification/:uniqueCode'),
    (0, common_1.Header)('content-type', 'text/html'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'NotificationTrackingEmail' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Notification Tracking not found' }),
    __param(0, (0, common_1.Param)('uniqueCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "putStatusNotificationTrackingEmail", null);
__decorate([
    (0, common_1.Get)('/statisticsShipping/:idCampaign'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'TrackingEmail' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tracking not found' }),
    __param(0, (0, common_1.Param)('idCampaign')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "getStatisticsShipping", null);
exports.TrackingController = TrackingController = __decorate([
    (0, common_1.Controller)('tracking'),
    __metadata("design:paramtypes", [trackingEmail_service_1.TrackingEmailService])
], TrackingController);
//# sourceMappingURL=trackingEmail.resource.js.map