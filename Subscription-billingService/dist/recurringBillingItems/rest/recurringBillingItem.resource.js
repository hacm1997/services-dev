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
exports.RecurringBillingItemResource = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const recurringBillingItem_service_1 = require("../service/recurringBillingItem.service");
const cookies_interceptor_1 = require("../../common/getCookies/cookies.interceptor");
let RecurringBillingItemResource = class RecurringBillingItemResource {
    constructor(rbiService) {
        this.rbiService = rbiService;
    }
    async createBlog(RecurringBillingItemDTO) {
        const rbi = await this.rbiService.RecurringBillingItemCreate(RecurringBillingItemDTO);
        if (!rbi) {
            throw new common_1.NotFoundException("recurring billing item not created");
        }
        return rbi;
    }
    async getLastRecurringBill(tenant) {
        const rbi = await this.rbiService.getLastRecurringBill(tenant);
        if (!rbi) {
            throw new common_1.NotFoundException("recurring bill item not found");
        }
        return rbi;
    }
    async deleteRecurring(id, tenant) {
        try {
            return await this.rbiService.deleteRecurring(id, tenant);
        }
        catch (error) {
            throw new common_1.NotFoundException("Recurring bill item not deleted");
        }
    }
};
exports.RecurringBillingItemResource = RecurringBillingItemResource;
__decorate([
    (0, common_1.Post)(""),
    (0, swagger_1.ApiBody)({ type: "RecurringBillingItemDTO", required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: "RecurringBillingItemDTO",
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Cannot create recurring billing item.",
    }),
    (0, swagger_1.ApiOperation)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecurringBillingItemResource.prototype, "createBlog", null);
__decorate([
    (0, common_1.Get)(""),
    (0, swagger_1.ApiResponse)({ status: 200, type: "string" }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "recurring bill item not found",
    }),
    (0, swagger_1.ApiOperation)({ summary: "get last recurring bill item" }),
    __param(0, (0, common_1.Query)("tenant")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecurringBillingItemResource.prototype, "getLastRecurringBill", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    (0, swagger_1.ApiResponse)({ status: 200, type: "string" }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "recurring bill item to deleted not found",
    }),
    (0, swagger_1.ApiOperation)({ summary: "Deleted recurringbill item" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)("tenant")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RecurringBillingItemResource.prototype, "deleteRecurring", null);
exports.RecurringBillingItemResource = RecurringBillingItemResource = __decorate([
    (0, swagger_1.ApiTags)("recurring"),
    (0, common_1.Controller)("recurring"),
    (0, common_1.UseInterceptors)(cookies_interceptor_1.CookiesInterceptor),
    __metadata("design:paramtypes", [recurringBillingItem_service_1.RecurringBillingItemService])
], RecurringBillingItemResource);
//# sourceMappingURL=recurringBillingItem.resource.js.map