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
exports.InvoiceUsecase = void 0;
const common_1 = require("@nestjs/common");
const invoice_gateway_1 = require("./invoice.gateway");
const invoice_model_1 = require("../data/invoice.model");
const invoice_model_dto_1 = require("./invoice.model.dto");
const buildingInvoice_1 = require("../service/buildingInvoice");
const cookies_1 = require("../../common/interceptors/getCookies/cookies");
const Constants_1 = require("../../infrastructure/dynamodb/intializer/Constants");
const cron_util_1 = require("../util/cron.util");
const constans_1 = require("../util/constans");
const moment = require("moment");
let InvoiceUsecase = exports.InvoiceUsecase = class InvoiceUsecase {
    constructor(invoiceGateway, cronJobService) {
        this.invoiceGateway = invoiceGateway;
        this.cronJobService = cronJobService;
    }
    async createInvoice(invoiceDTO, request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const createdInvoice = await this.invoiceGateway.createInvoice(await this.mapDTOToDomain(invoiceDTO, getTenantId));
        await this.cronJobService.startCronJob(createdInvoice, getTenantId, request);
        return this.mapDomainToDTO(createdInvoice);
    }
    async getAllInvoices(request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const invoices = await this.invoiceGateway.getAllInvoices(getTenantId);
        return invoices.map(this.mapDomainToDTO);
    }
    async getInvoicesPerPage(request, page, size) {
        const Invoices = await this.invoiceGateway.fetchResultsWithPagination(request, page, size);
        const result = {
            data: Invoices.data.map(this.mapDomainToDTO),
            totalPage: Invoices.totalPage - 1,
        };
        return result;
    }
    async getAllInvoiceById(request, code) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const invoices = await this.invoiceGateway.getAllInvoiceById(code, getTenantId);
        return invoices.map(this.mapDomainToDTO);
    }
    async deleteInvoice(request, id) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const deleteInvoice = await this.invoiceGateway.deleteInvoice(id, getTenantId);
        return deleteInvoice;
    }
    async putInvoiceStatus(invoiceID, status, request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const putInvoiceStatus = await this.invoiceGateway.putInvoiceStatus(invoiceID, status, getTenantId);
        return putInvoiceStatus;
    }
    async putInvoiceReference(invoiceID, reference, payment_method, request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        if (invoiceID !== 'undefined' && reference !== 'undefined') {
            const putInvoiceReference = await this.invoiceGateway.putInvoiceReference(invoiceID, reference, payment_method, getTenantId);
            return putInvoiceReference;
        }
        else {
            return { message: 'Invoice and reference undefined' };
        }
    }
    async mapDTOToDomain(invoiceDTO, tenantID) {
        const bulidInvoice = new buildingInvoice_1.BuildingInvoice();
        const invoiceCode = bulidInvoice.generatorInvoiceCode(invoiceDTO.reference);
        const buildTenant = Constants_1.INVOICE_GROUP + '#' + tenantID;
        const currentDate = moment().subtract(5, 'hours');
        return invoice_model_1.InvoiceModel.builder()
            .TENANTID(buildTenant)
            .INVOICE_CODE(invoiceCode)
            .REFERENCE(invoiceDTO.reference)
            .CREATEDAT(currentDate.toISOString())
            .CUSTOMER(invoiceDTO.customer)
            .PRODUCTS(invoiceDTO.products)
            .SHIPPING(invoiceDTO.shipping)
            .IVA(invoiceDTO.iva)
            .TOTAL(invoiceDTO.total)
            .PAYMENT_METHOD(invoiceDTO.payment_method)
            .STATUS(constans_1.PENDING_STATUS)
            .EXTRAINFO(invoiceDTO.extraInfo)
            .build();
    }
    mapDomainToDTO(invoice) {
        return (invoice_model_dto_1.InvoiceModelDTO.builder()
            .INVOICE_CODE(invoice.invoice_code)
            .REFERENCE(invoice.reference)
            .CREATEDAT(invoice.createdAt)
            .CUSTOMER(invoice.customer)
            .PRODUCTS(invoice.products)
            .SHIPPING(invoice.shipping)
            .IVA(invoice.iva)
            .TOTAL(invoice.total)
            .PAYMENT_METHOD(invoice.payment_method)
            .STATUS(invoice.status)
            .EXTRAINFO(invoice.extraInfo)
            .build());
    }
};
exports.InvoiceUsecase = InvoiceUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [invoice_gateway_1.InvoiceGateway,
        cron_util_1.CronJobService])
], InvoiceUsecase);
//# sourceMappingURL=invoice.usecase.js.map