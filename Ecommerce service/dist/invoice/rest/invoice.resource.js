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
const invoice_usecase_1 = require("./invoice.usecase");
const invoice_model_dto_1 = require("./invoice.model.dto");
const filters_invoice_1 = require("../service/filters.invoice");
const wompi_service_1 = require("../util/wompi.service");
let InvoiceResource = exports.InvoiceResource = class InvoiceResource {
    constructor(invoiceUseCase, invoiceFilters, wompiService) {
        this.invoiceUseCase = invoiceUseCase;
        this.invoiceFilters = invoiceFilters;
        this.wompiService = wompiService;
    }
    async createInvoice(invoiceDTO, request) {
        return await this.invoiceUseCase.createInvoice(invoiceDTO, request);
    }
    async getAllInvoices(request) {
        const invoices = await this.invoiceUseCase.getAllInvoices(request);
        if (!invoices || invoices.length === 0) {
            throw new common_1.NotFoundException('Invoices not found');
        }
        return invoices;
    }
    async getInvoicesPerPage(request, page, size) {
        const invoice = await this.invoiceUseCase.getInvoicesPerPage(request, Number(page), Number(size));
        if (!invoice) {
            throw new common_1.NotFoundException('Invoice was not found');
        }
        return invoice;
    }
    async getAllInvoicesById(request, code) {
        const invoice = await this.invoiceUseCase.getAllInvoiceById(request, code);
        if (!invoice || invoice.length === 0) {
            throw new common_1.NotFoundException('Invoice not found');
        }
        else {
            return invoice;
        }
    }
    async deleteInvoice(request, id) {
        try {
            return await this.invoiceUseCase.deleteInvoice(request, id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Invoice not deleted');
        }
    }
    async putInvoiceStatus(InvoiceID, status, request) {
        return await this.invoiceUseCase.putInvoiceStatus(InvoiceID, status, request);
    }
    async putInvoiceRef(InvoiceID, reference, payment_method, request) {
        return await this.invoiceUseCase.putInvoiceReference(InvoiceID, reference, payment_method, request);
    }
    async getFilterParams(request, page, pageSize, filterOptions) {
        const getInvoiceByFilter = this.invoiceFilters.searchFiltersInvoice(request, Number(page), Number(pageSize), filterOptions);
        return getInvoiceByFilter;
    }
    async getWompiSignature(currency, price, integrity) {
        try {
            return await this.wompiService.generateSignature(currency, price, integrity);
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiBody)({ type: invoice_model_dto_1.InvoiceModelDTO, required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'New invoice created',
        type: invoice_model_dto_1.InvoiceModelDTO,
    }),
    (0, swagger_1.ApiOperation)({ description: 'Create a invoice' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invoice_model_dto_1.InvoiceModelDTO,
        Request]),
    __metadata("design:returntype", Promise)
], InvoiceResource.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ description: 'Get Invoices by tenant' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Invoices found',
        type: invoice_model_dto_1.InvoiceModelDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Invoices not found',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], InvoiceResource.prototype, "getAllInvoices", null);
__decorate([
    (0, common_1.Get)('/pagination'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'invoiceDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'invoice was not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get Invoices by tenant' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String, String]),
    __metadata("design:returntype", Promise)
], InvoiceResource.prototype, "getInvoicesPerPage", null);
__decorate([
    (0, common_1.Get)(':code'),
    (0, swagger_1.ApiOperation)({ description: 'Get a Invoice by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Invoice found',
        type: invoice_model_dto_1.InvoiceModelDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Invoice not found',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String]),
    __metadata("design:returntype", Promise)
], InvoiceResource.prototype, "getAllInvoicesById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Invoice to deleted not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Invoice' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String]),
    __metadata("design:returntype", Promise)
], InvoiceResource.prototype, "deleteInvoice", null);
__decorate([
    (0, common_1.Put)('/status'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'Invoice status update success' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Invoice status cannot be updated',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Edit Invoice status' }),
    __param(0, (0, common_1.Query)('invoice')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Request]),
    __metadata("design:returntype", Promise)
], InvoiceResource.prototype, "putInvoiceStatus", null);
__decorate([
    (0, common_1.Put)('/reference'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'Invoice status update success' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Invoice status cannot be updated',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Edit Invoice status' }),
    __param(0, (0, common_1.Query)('invoice')),
    __param(1, (0, common_1.Query)('reference')),
    __param(2, (0, common_1.Query)('payment_method')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Request]),
    __metadata("design:returntype", Promise)
], InvoiceResource.prototype, "putInvoiceRef", null);
__decorate([
    (0, common_1.Post)('filters'),
    (0, swagger_1.ApiOperation)({ description: 'Get a Invoices' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'InvoiceDTO' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Invoices not founds',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String, String, Object]),
    __metadata("design:returntype", Promise)
], InvoiceResource.prototype, "getFilterParams", null);
__decorate([
    (0, common_1.Get)('wompi/signature'),
    (0, swagger_1.ApiOperation)({ description: 'Get wompi signature' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'signature create',
        type: 'wompi signature',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'signature not getting',
    }),
    __param(0, (0, common_1.Query)('currency')),
    __param(1, (0, common_1.Query)('price')),
    __param(2, (0, common_1.Query)('integrity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], InvoiceResource.prototype, "getWompiSignature", null);
exports.InvoiceResource = InvoiceResource = __decorate([
    (0, swagger_1.ApiTags)('invoice'),
    (0, common_1.Controller)('invoice'),
    __metadata("design:paramtypes", [invoice_usecase_1.InvoiceUsecase,
        filters_invoice_1.InvoiceFilters,
        wompi_service_1.WompiService])
], InvoiceResource);
//# sourceMappingURL=invoice.resource.js.map