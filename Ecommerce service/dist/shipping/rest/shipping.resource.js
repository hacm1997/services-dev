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
exports.ShippingResource = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shipping_model_dto_1 = require("./shipping.model.dto");
const shipping_usecase_1 = require("./shipping.usecase");
let ShippingResource = exports.ShippingResource = class ShippingResource {
    constructor(shippingUseCase) {
        this.shippingUseCase = shippingUseCase;
    }
    async createProduct(shippingDTO, request) {
        return await this.shippingUseCase.createShipping(shippingDTO, request);
    }
    async getShippingByCode(request, code) {
        const shipping = await this.shippingUseCase.getShippingByCode(request, code);
        if (!shipping || shipping.length === 0) {
            throw new common_1.NotFoundException('Shipping not found');
        }
        else {
            return shipping;
        }
    }
    async getAllShipping(request) {
        const shippings = await this.shippingUseCase.getAllShipping(request);
        if (!shippings || shippings.length === 0) {
            throw new common_1.NotFoundException('Invoices not found');
        }
        return shippings;
    }
    async putProduct(shippingDTO, request) {
        return await this.shippingUseCase.putShipping(shippingDTO, request);
    }
    async deleteProduct(request, id) {
        try {
            return await this.shippingUseCase.deleteShipping(request, id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Product not deleted');
        }
    }
};
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiBody)({ type: shipping_model_dto_1.ShippingModelDTO, required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'New Shipping created',
        type: shipping_model_dto_1.ShippingModelDTO,
    }),
    (0, swagger_1.ApiOperation)({ description: 'Create a Shipping' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shipping_model_dto_1.ShippingModelDTO,
        Request]),
    __metadata("design:returntype", Promise)
], ShippingResource.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)(':code'),
    (0, swagger_1.ApiOperation)({ description: 'Get a Shipping by code' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Shipping found',
        type: shipping_model_dto_1.ShippingModelDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Shipping not found',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String]),
    __metadata("design:returntype", Promise)
], ShippingResource.prototype, "getShippingByCode", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ description: 'Get Shippings by tenant' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Shippings found',
        type: shipping_model_dto_1.ShippingModelDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Shippings not found',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], ShippingResource.prototype, "getAllShipping", null);
__decorate([
    (0, common_1.Put)('/'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'Shiiping update success' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'The shipping cannot be edited' }),
    (0, swagger_1.ApiOperation)({ summary: 'Edit shipping' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shipping_model_dto_1.ShippingModelDTO,
        Request]),
    __metadata("design:returntype", Promise)
], ShippingResource.prototype, "putProduct", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product to deleted not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Deleted product' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String]),
    __metadata("design:returntype", Promise)
], ShippingResource.prototype, "deleteProduct", null);
exports.ShippingResource = ShippingResource = __decorate([
    (0, swagger_1.ApiTags)('shipping'),
    (0, common_1.Controller)('shipping'),
    __metadata("design:paramtypes", [shipping_usecase_1.ShippingUsecase])
], ShippingResource);
//# sourceMappingURL=shipping.resource.js.map