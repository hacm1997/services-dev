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
exports.BuyCampaignService = void 0;
const common_1 = require("@nestjs/common");
const buyCampaigns_repository_1 = require("../data/buyCampaigns.repository");
let BuyCampaignService = class BuyCampaignService {
    constructor(_buyCampaignRepository) {
        this._buyCampaignRepository = _buyCampaignRepository;
    }
    async buyCampaignCreate(_buyCampaigntDTO) {
        const createdBuyCampaign = await this._buyCampaignRepository.buyCampaignCreate(this.mapDTOToDomain(_buyCampaigntDTO));
        if (!createdBuyCampaign) {
            throw new Error('Error creating the email campaign');
        }
        return this.mapDomainToDTO(createdBuyCampaign);
    }
    async getEmailquantity() {
        return await this._buyCampaignRepository.getEmailquantity();
    }
    async getInvoiceReference(payment_reference) {
        return await this._buyCampaignRepository.getInvoiceByIdReference(payment_reference);
    }
    mapDTOToDomain(buyCampaignDTO) {
        const buyCampaignModel = {
            transaction_state: buyCampaignDTO.transaction_state,
            payment_reference: buyCampaignDTO.payment_reference,
            quantity: buyCampaignDTO.quantity,
            transaction_date: buyCampaignDTO.transaction_date,
            description: buyCampaignDTO.description,
            type_payment: buyCampaignDTO.type_payment,
            transaction_response: buyCampaignDTO.transaction_response,
            payment_gateway: buyCampaignDTO.payment_gateway,
            email: buyCampaignDTO.email,
            moreInformation: buyCampaignDTO.moreInformation,
        };
        return buyCampaignModel;
    }
    mapDomainToDTO(buyCampaign) {
        const buyCampaignModelDTO = {
            id: buyCampaign.id,
            transaction_state: buyCampaign.transaction_state,
            payment_reference: buyCampaign.payment_reference,
            quantity: buyCampaign.quantity,
            transaction_date: buyCampaign.transaction_date,
            description: buyCampaign.description,
            type_payment: buyCampaign.type_payment,
            transaction_response: buyCampaign.transaction_response,
            payment_gateway: buyCampaign.payment_gateway,
            email: buyCampaign.email,
            moreInformation: buyCampaign.moreInformation,
        };
        return buyCampaignModelDTO;
    }
};
exports.BuyCampaignService = BuyCampaignService;
exports.BuyCampaignService = BuyCampaignService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [buyCampaigns_repository_1.BuyCampaignRepository])
], BuyCampaignService);
//# sourceMappingURL=buyCampaigns.service.js.map