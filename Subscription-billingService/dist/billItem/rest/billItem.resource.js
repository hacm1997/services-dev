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
exports.BillItemResource = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const billItem_service_1 = require("../service/billItem.service");
const cookies_interceptor_1 = require("../../common/getCookies/cookies.interceptor");
let BillItemResource = class BillItemResource {
    constructor(billItemService) {
        this.billItemService = billItemService;
    }
    async createBlog(BillItemDTO, newTenant) {
        const bill = await this.billItemService.BillItemCreate(BillItemDTO, newTenant);
        if (!bill) {
            throw new common_1.NotFoundException("bill not created");
        }
        return bill;
    }
    async deleteBillItem(id, tenant) {
        try {
            return await this.billItemService.deleteBillItem(id, tenant);
        }
        catch (error) {
            throw new common_1.NotFoundException("Bill item not deleted");
        }
    }
};
exports.BillItemResource = BillItemResource;
__decorate([
    (0, common_1.Post)(""),
    (0, swagger_1.ApiBody)({ type: "BillItemDTO", required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: "BillItemDTO",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Cannot create bill." }),
    (0, swagger_1.ApiOperation)({}),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)("newTenant")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BillItemResource.prototype, "createBlog", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    (0, swagger_1.ApiResponse)({ status: 200, type: "string" }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "bill item to deleted not found",
    }),
    (0, swagger_1.ApiOperation)({ summary: "Deleted bill item" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)("tenant")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BillItemResource.prototype, "deleteBillItem", null);
exports.BillItemResource = BillItemResource = __decorate([
    (0, swagger_1.ApiTags)("bill"),
    (0, common_1.Controller)("bill"),
    (0, common_1.UseInterceptors)(cookies_interceptor_1.CookiesInterceptor),
    __metadata("design:paramtypes", [billItem_service_1.BillItemService])
], BillItemResource);
//# sourceMappingURL=billItem.resource.js.map