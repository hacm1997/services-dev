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
exports.InvoiceFilters = void 0;
const common_1 = require("@nestjs/common");
const invoice_usecase_1 = require("../rest/invoice.usecase");
const cookies_1 = require("../../common/interceptors/getCookies/cookies");
let InvoiceFilters = exports.InvoiceFilters = class InvoiceFilters {
    constructor(invoiceUseCase) {
        this.invoiceUseCase = invoiceUseCase;
    }
    async searchFiltersInvoice(request, page, pageSize, options) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        try {
            const invoices = await this.invoiceUseCase.getAllInvoices(request);
            if (!invoices || invoices.length === 0) {
                throw new common_1.NotFoundException('Invoices not found');
            }
            const apllyFilters = await this.applyFilters(invoices, options);
            const totalPages = Math.ceil(apllyFilters.length / pageSize);
            if (page && (page < 1 || page > totalPages)) {
                throw new common_1.NotFoundException('Invalid page number');
            }
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedResult = apllyFilters.slice(startIndex, endIndex);
            return {
                data: paginatedResult,
                totalPages: totalPages,
                currentPage: page,
            };
        }
        catch (error) {
            throw new common_1.NotFoundException('Invoice for ' + getTenantId + ' not found');
        }
    }
    async applyFilters(filteredResult, options) {
        let result = filteredResult;
        if (options.status) {
            result = result.filter((item) => item.status === options.status);
        }
        if (options.startDate && options.endDate) {
            result = result.filter((item) => (item.createdAt >= options.startDate &&
                item.createdAt <= options.endDate) ||
                (item.createdAt.includes(options.startDate) &&
                    item.createdAt.includes(options.endDate)));
        }
        if (options.customerName || options.id) {
            result = result.filter((item) => {
                if (item.customer) {
                    const resulName = item.customer?.name
                        .toLowerCase()
                        .includes(options.customerName);
                    const resulLastName = item.customer?.last_name
                        .toLowerCase()
                        .includes(options.customerName);
                    const resulFullName = `${item.customer?.name} ${item.customer?.last_name}`
                        .toLowerCase()
                        .includes(options.customerName);
                    const resulID = item.invoice_code.includes(options.id);
                    return resulName || resulID || resulLastName || resulFullName;
                }
            });
        }
        if (options.maxPrice && options.minPrice) {
            result = result.filter((item) => item.total >= options.minPrice && item.total <= options.maxPrice);
        }
        return result;
    }
};
exports.InvoiceFilters = InvoiceFilters = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [invoice_usecase_1.InvoiceUsecase])
], InvoiceFilters);
//# sourceMappingURL=filters.invoice.js.map