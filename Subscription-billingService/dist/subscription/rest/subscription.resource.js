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
exports.SubscriptionResource = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const subscription_service_1 = require("../service/subscription.service");
const cookies_interceptor_1 = require("../../common/getCookies/cookies.interceptor");
let SubscriptionResource = class SubscriptionResource {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }
    async createBlog(SubscriptionDTO) {
        const subscription = await this.subscriptionService.createSubscription(SubscriptionDTO);
        if (!subscription) {
            throw new common_1.NotFoundException("subscription not created");
        }
        return subscription;
    }
    async getAllSubs(page, pageSize) {
        const subs = await this.subscriptionService.getAllSubscriptions(Number(page), Number(pageSize));
        if (!subs) {
            throw new common_1.NotFoundException("Subscription not found");
        }
        return subs;
    }
    async getSubByTenant(tenant) {
        const subscription = await this.subscriptionService.getSubscriptionsByTenant(tenant);
        if (!subscription) {
            throw new common_1.NotFoundException("Subscription not found");
        }
        return subscription;
    }
    async updateSubs(subscriptionDTO) {
        return await this.subscriptionService.updateSubscription(subscriptionDTO);
    }
    async updateSubsPendingPayment(tenant, payment) {
        return await this.subscriptionService.updateSubsPendingPayment(tenant, payment);
    }
    async cancelSubscription(tenant) {
        return await this.subscriptionService.cancelSubscription(tenant);
    }
    async reactivateSubscription(tenant) {
        return await this.subscriptionService.reactivateSubscription(tenant);
    }
    async activateSubscription(tenant) {
        return await this.subscriptionService.activateSubscription(tenant);
    }
    async deleteSubscription(tenant) {
        try {
            return await this.subscriptionService.deleteSubscription(tenant);
        }
        catch (error) {
            throw new common_1.NotFoundException("Subscription not deleted");
        }
    }
};
exports.SubscriptionResource = SubscriptionResource;
__decorate([
    (0, common_1.Post)(""),
    (0, swagger_1.ApiBody)({ type: "SubscriptionDTO", required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: "SubscriptionDTO",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Cannot create subscription." }),
    (0, swagger_1.ApiOperation)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionResource.prototype, "createBlog", null);
__decorate([
    (0, common_1.Get)(""),
    (0, swagger_1.ApiResponse)({ status: 200, type: "SubsDTO" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Subs not found" }),
    (0, swagger_1.ApiOperation)({ summary: "Get Subscription" }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SubscriptionResource.prototype, "getAllSubs", null);
__decorate([
    (0, common_1.Get)("/tenant/:tenant"),
    (0, swagger_1.ApiResponse)({ status: 200, type: "SubsDTO" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Subs not found" }),
    (0, swagger_1.ApiOperation)({ summary: "Get Subscription" }),
    __param(0, (0, common_1.Param)("tenant")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionResource.prototype, "getSubByTenant", null);
__decorate([
    (0, common_1.Put)(""),
    (0, swagger_1.ApiResponse)({ status: 200, type: "SubscriptionDTO" }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "The subscription cannot be edited",
    }),
    (0, swagger_1.ApiOperation)({ summary: "Edit subscription" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionResource.prototype, "updateSubs", null);
__decorate([
    (0, common_1.Put)("/payment/:tenant"),
    (0, swagger_1.ApiResponse)({ status: 200, type: "SubscriptionDTO" }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "The subscription cannot be edited",
    }),
    (0, swagger_1.ApiOperation)({ summary: "Edit subscription" }),
    __param(0, (0, common_1.Param)("tenant")),
    __param(1, (0, common_1.Query)("payment")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SubscriptionResource.prototype, "updateSubsPendingPayment", null);
__decorate([
    (0, common_1.Put)("/cancel"),
    (0, swagger_1.ApiResponse)({ status: 200, type: "SubscriptionDTO" }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "The subscription cannot be canceled",
    }),
    (0, swagger_1.ApiOperation)({ summary: "Cancel subscription" }),
    __param(0, (0, common_1.Query)("tenant")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionResource.prototype, "cancelSubscription", null);
__decorate([
    (0, common_1.Put)("/reactive"),
    (0, swagger_1.ApiResponse)({ status: 200, type: "SubscriptionDTO" }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "The subscription cannot be reactivate",
    }),
    (0, swagger_1.ApiOperation)({ summary: "Reactivate subscription" }),
    __param(0, (0, common_1.Query)("tenant")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionResource.prototype, "reactivateSubscription", null);
__decorate([
    (0, common_1.Put)("/active"),
    (0, swagger_1.ApiResponse)({ status: 200, type: "SubscriptionDTO" }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "The subscription cannot be activate",
    }),
    (0, swagger_1.ApiOperation)({ summary: "Activate subscription" }),
    __param(0, (0, common_1.Query)("tenant")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionResource.prototype, "activateSubscription", null);
__decorate([
    (0, common_1.Delete)(""),
    (0, swagger_1.ApiResponse)({ status: 200, type: "string" }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "subscription to deleted not found",
    }),
    (0, swagger_1.ApiOperation)({ summary: "Deleted subscription" }),
    __param(0, (0, common_1.Query)("tenant")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionResource.prototype, "deleteSubscription", null);
exports.SubscriptionResource = SubscriptionResource = __decorate([
    (0, swagger_1.ApiTags)("subscription"),
    (0, common_1.Controller)("subscription"),
    (0, common_1.UseInterceptors)(cookies_interceptor_1.CookiesInterceptor),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionService])
], SubscriptionResource);
//# sourceMappingURL=subscription.resource.js.map