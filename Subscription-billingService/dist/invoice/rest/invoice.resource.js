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
exports.InvoiceResource = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cookies_interceptor_1 = require("../../common/getCookies/cookies.interceptor");
const invoice_service_1 = require("../service/invoice.service");
let InvoiceResource = class InvoiceResource {
    constructor(invoiceService) {
        this.invoiceService = invoiceService;
    }
    async createBlog(invoiceDTO) {
        const invoice = await this.invoiceService.createInvoice(invoiceDTO);
        if (!invoice) {
            throw new common_1.NotFoundException("invoice could not be created");
        }
        return invoice;
    }
    async deleteInvoice(id, tenant) {
        try {
            return await this.invoiceService.deleteInvoice(id, tenant);
        }
        catch (error) {
            throw new common_1.NotFoundException("Invoice not deleted");
        }
    }
};
exports.InvoiceResource = InvoiceResource;
__decorate([
    (0, common_1.Post)(""),
    (0, swagger_1.ApiBody)({ type: "InvoiceDTO", required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: "InvoiceDTO",
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Cannot create invoice",
    }),
    (0, swagger_1.ApiOperation)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvoiceResource.prototype, "createBlog", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    (0, swagger_1.ApiResponse)({ status: 200, type: "string" }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "invoice to deleted not found",
    }),
    (0, swagger_1.ApiOperation)({ summary: "Deleted invoice" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)("tenant")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InvoiceResource.prototype, "deleteInvoice", null);
exports.InvoiceResource = InvoiceResource = __decorate([
    (0, swagger_1.ApiTags)("invoice"),
    (0, common_1.Controller)("invoice"),
    (0, common_1.UseInterceptors)(cookies_interceptor_1.CookiesInterceptor),
    __metadata("design:paramtypes", [invoice_service_1.InvoiceService])
], InvoiceResource);
//# sourceMappingURL=invoice.resource.js.map