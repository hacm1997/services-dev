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
exports.ShippingUsecase = void 0;
const common_1 = require("@nestjs/common");
const shipping_gateway_1 = require("./shipping.gateway");
const shipping_model_dto_1 = require("./shipping.model.dto");
const shipping_model_1 = require("../data/shipping.model");
const cookies_1 = require("../../common/interceptors/getCookies/cookies");
const Constants_1 = require("../../infrastructure/dynamodb/intializer/Constants");
let ShippingUsecase = exports.ShippingUsecase = class ShippingUsecase {
    constructor(shippingGateway) {
        this.shippingGateway = shippingGateway;
    }
    async getAllShipping(request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const shipping = await this.shippingGateway.getAllShipping(getTenantId);
        return shipping.map(this.mapDomainToDTO);
    }
    async createShipping(shippingDTO, request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const createdShipping = await this.shippingGateway.createShipping(this.mapDTOToDomain(shippingDTO, getTenantId));
        return this.mapDomainToDTO(createdShipping);
    }
    async getShippingByCode(request, shippingCode) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const shipping = await this.shippingGateway.getShippingByCode(getTenantId, shippingCode);
        return shipping.map(this.mapDomainToDTO);
    }
    async putShipping(shippingDTO, request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const putShipping = await this.shippingGateway.putShipping(shippingDTO, getTenantId);
        return this.mapDomainToDTO(putShipping);
    }
    async deleteShipping(request, id) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const deleteShipping = await this.shippingGateway.deleteShipping(id, getTenantId);
        return deleteShipping;
    }
    mapDTOToDomain(shippingDTO, tenantID) {
        const buildTenant = Constants_1.SHIPPING_GROUP + '#' + tenantID;
        const buildCode = Constants_1.SHIPPING_GROUP + '-' + shippingDTO.city;
        return shipping_model_1.ShippingModel.builder()
            .TENANTID(buildTenant)
            .SHIPPING_CODE(buildCode)
            .CITY(shippingDTO.city)
            .PRICE(shippingDTO.price)
            .EXTRAINFO(shippingDTO.extraInfo)
            .build();
    }
    mapDomainToDTO(shipping) {
        return (shipping_model_dto_1.ShippingModelDTO.builder()
            .SHIPPING_CODE(shipping.shipping_code)
            .CITY(shipping.city)
            .PRICE(shipping.price)
            .EXTRAINFO(shipping.extraInfo)
            .build());
    }
};
exports.ShippingUsecase = ShippingUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shipping_gateway_1.ShippingGateway])
], ShippingUsecase);
//# sourceMappingURL=shipping.usecase.js.map