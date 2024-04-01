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
exports.CustomerFilters = void 0;
const common_1 = require("@nestjs/common");
const customer_usecase_1 = require("../rest/customer.usecase");
const cookies_1 = require("../../common/interceptors/getCookies/cookies");
let CustomerFilters = exports.CustomerFilters = class CustomerFilters {
    constructor(customerUseCase) {
        this.customerUseCase = customerUseCase;
    }
    async searchCustomerFilters(request, page, pageSize, options) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        try {
            const customer = await this.customerUseCase.getAllCustomerFilter(request);
            if (!customer || customer.length === 0) {
                throw new common_1.NotFoundException('Costomers not founds');
            }
            const parsedResult = customer.map((item) => {
                const extraInfo = JSON.parse(item.extraInfo);
                return { ...item, extraInfo };
            });
            const apllyFilters = await this.applyFilters(parsedResult, options);
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
            throw new common_1.NotFoundException('Customers for ' + getTenantId + ' not found');
        }
    }
    async applyFilters(filteredResult, options) {
        let result = filteredResult;
        if (options.email || options.city || options.id || options.customerName) {
            result = result.filter((item) => {
                const fullName = `${item.name} ${item.last_name}`;
                const result_fullName = fullName
                    .toLowerCase()
                    .includes(options.customerName);
                const idMatches = item.id.includes(options.id);
                const emailMatches = item.email.includes(options.email);
                const cityMatches = item.city.toLowerCase().includes(options.city);
                return emailMatches || cityMatches || idMatches || result_fullName;
            });
        }
        if (options.startDate && options.endDate) {
            result = result.filter((item) => item.createdAt >= options.startDate &&
                item.createdAt <= options.endDate);
        }
        return result;
    }
};
exports.CustomerFilters = CustomerFilters = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_usecase_1.CustomerUsecase])
], CustomerFilters);
//# sourceMappingURL=customer.filter.js.map