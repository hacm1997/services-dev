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
exports.EpaycoResource = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const epayco_service_1 = require("../service/epayco.service");
let EpaycoResource = class EpaycoResource {
    constructor(epaycoService) {
        this.epaycoService = epaycoService;
    }
    async createPlan(planDTO) {
        const plan = await this.epaycoService.createPlan(planDTO);
        if (!plan) {
            throw new common_1.NotFoundException("plan not created");
        }
        return plan;
    }
    async getPlan(id) {
        const plan = await this.epaycoService.getPlan(id);
        if (!plan) {
            throw new common_1.NotFoundException("plan not found");
        }
        return plan;
    }
    async createCustomer(CustomerDTO) {
        const customer = await this.epaycoService.createCustomer(CustomerDTO);
        if (!customer) {
            throw new common_1.NotFoundException("customer not created");
        }
        return customer;
    }
    async createTokenCard(card) {
        const tokenCard = await this.epaycoService.createTokenCard(card);
        if (!tokenCard) {
            throw new common_1.NotFoundException("token card not created");
        }
        return tokenCard;
    }
};
exports.EpaycoResource = EpaycoResource;
__decorate([
    (0, common_1.Post)("plan"),
    (0, swagger_1.ApiBody)({ type: "PlanDTO", required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: "PlanDTO",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Cannot create plan." }),
    (0, swagger_1.ApiOperation)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EpaycoResource.prototype, "createPlan", null);
__decorate([
    (0, common_1.Get)("plan/:id"),
    (0, swagger_1.ApiBody)({ type: "PlanDTO", required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: "PlanDTO",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Cannot create plan." }),
    (0, swagger_1.ApiOperation)({}),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EpaycoResource.prototype, "getPlan", null);
__decorate([
    (0, common_1.Post)("customer"),
    (0, swagger_1.ApiBody)({ type: "CustomerDTO", required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: "CustomerDTO",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Cannot create customer." }),
    (0, swagger_1.ApiOperation)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EpaycoResource.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Post)("token-card"),
    (0, swagger_1.ApiBody)({ type: "CardDTO", required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: "CardDTO",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Cannot create token card." }),
    (0, swagger_1.ApiOperation)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EpaycoResource.prototype, "createTokenCard", null);
exports.EpaycoResource = EpaycoResource = __decorate([
    (0, swagger_1.ApiTags)("epayco"),
    (0, common_1.Controller)("epayco"),
    __metadata("design:paramtypes", [epayco_service_1.EpaycoService])
], EpaycoResource);
//# sourceMappingURL=epayco.resource.js.map