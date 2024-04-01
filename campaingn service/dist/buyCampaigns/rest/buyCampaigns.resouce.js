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
exports.BuyCampaignResource = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const buyCampaigns_service_1 = require("../service/buyCampaigns.service");
const transform_interceptor_1 = require("../../common/interceptors/transform/transform.interceptor");
let BuyCampaignResource = class BuyCampaignResource {
    constructor(_buyCampaignService) {
        this._buyCampaignService = _buyCampaignService;
    }
    async createCampaign(buycampaignDTO) {
        const buyCampaign = await this._buyCampaignService.buyCampaignCreate(buycampaignDTO);
        if (!buyCampaign) {
            throw new common_1.NotFoundException('Campaign not found');
        }
        return buyCampaign;
    }
    async getEmaiquantity() {
        return await this._buyCampaignService.getEmailquantity();
    }
    async updateStatusInvoice(payment_reference) {
        return await this._buyCampaignService.getInvoiceReference(payment_reference);
    }
};
exports.BuyCampaignResource = BuyCampaignResource;
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiBody)({ type: 'buyCampaignDTO', required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: 'buyCampaignDTO',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cannot buy campaign.' }),
    (0, swagger_1.ApiOperation)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyCampaignResource.prototype, "createCampaign", null);
__decorate([
    (0, common_1.Get)('/email-quantity'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'EmailCampaignDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get campaigns by id and tenant' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BuyCampaignResource.prototype, "getEmaiquantity", null);
__decorate([
    (0, common_1.Get)('/:payment-reference'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'EmailCampaignDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campaign not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get campaigns by id and tenant' }),
    __param(0, (0, common_1.Param)('payment-reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuyCampaignResource.prototype, "updateStatusInvoice", null);
exports.BuyCampaignResource = BuyCampaignResource = __decorate([
    (0, swagger_1.ApiTags)('buycampaig'),
    (0, common_1.Controller)('buycampaigns'),
    (0, common_1.UseInterceptors)(transform_interceptor_1.TransformInterceptor),
    __metadata("design:paramtypes", [buyCampaigns_service_1.BuyCampaignService])
], BuyCampaignResource);
//# sourceMappingURL=buyCampaigns.resouce.js.map