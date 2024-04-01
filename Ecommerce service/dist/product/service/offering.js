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
exports.OfferingRules = void 0;
const common_1 = require("@nestjs/common");
const product_usecase_1 = require("../rest/product.usecase");
const cookies_1 = require("../../common/interceptors/getCookies/cookies");
const generalFilter_1 = require("./generalFilter");
const discount_service_1 = require("./discount.service");
let OfferingRules = exports.OfferingRules = class OfferingRules {
    constructor(productUseCase, generalFIlterClass) {
        this.productUseCase = productUseCase;
        this.generalFIlterClass = generalFIlterClass;
    }
    async getProductsParams(status, request, isNew, isBest, page, pageSize) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        try {
            const products = await this.productUseCase.getAllProducts(request);
            const discountProducts = products.map((item) => (0, discount_service_1.detecteDiscountProducts)(item));
            if (!discountProducts || discountProducts.length === 0) {
                throw new common_1.NotFoundException('Product not found');
            }
            const parsedResult = discountProducts.map((item) => {
                const extraInfo = JSON.parse(item.extraInfo);
                return { ...item, extraInfo };
            });
            let filteredResult;
            if (isNew) {
                filteredResult = parsedResult
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .filter((item) => {
                    if (Boolean(item.extraInfo.isNew) === Boolean(isNew)) {
                        const statusMatches = !status || item.status === status;
                        return statusMatches;
                    }
                });
            }
            if (isBest) {
                filteredResult = parsedResult
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .filter((item) => {
                    if (Boolean(item.extraInfo.isBest) === Boolean(isBest)) {
                        const statusMatches = !status || item.status === status;
                        return statusMatches;
                    }
                });
            }
            const totalPages = Math.ceil(filteredResult.length / pageSize);
            if (page && (page < 1 || page > totalPages)) {
                throw new common_1.NotFoundException('Invalid page number');
            }
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedResult = filteredResult.slice(startIndex, endIndex);
            return {
                data: paginatedResult,
                totalPages: totalPages,
                currentPage: page,
            };
        }
        catch {
            throw new common_1.NotFoundException('Products or category for ' + getTenantId + ' not found');
        }
    }
    async getProductCategories(categories, request, city, status, minPrice, maxPrice, freeShipping, page, pageSize) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        try {
            const products = await this.productUseCase.getProductsByParams(request, city, status, minPrice, maxPrice, freeShipping);
            const discountProducts = products.map((item) => (0, discount_service_1.detecteDiscountProducts)(item));
            if (!discountProducts || discountProducts.length === 0) {
                throw new common_1.NotFoundException('Product not found');
            }
            const parsedResult = discountProducts.map((item) => {
                const extraInfo = JSON.parse(item.extraInfo);
                return { ...item, extraInfo };
            });
            let filteredResult;
            if (categories.list_categories !== undefined &&
                categories.list_categories.length > 0) {
                filteredResult = parsedResult
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .filter((item) => {
                    const categoryMatches = categories.list_categories.some((category) => item.extraInfo.categories.includes(category));
                    const statusMatches = !status || item.status === status;
                    return categoryMatches && statusMatches;
                });
            }
            else {
                filteredResult = discountProducts
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .filter((item) => {
                    const statusMatches = !status || item.status === status;
                    return statusMatches;
                });
            }
            const totalPages = Math.ceil(filteredResult.length / pageSize);
            if (page && (page < 1 || page > totalPages)) {
                throw new common_1.NotFoundException('Invalid page number');
            }
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedResult = filteredResult.slice(startIndex, endIndex);
            return {
                data: paginatedResult,
                totalPages: totalPages,
                currentPage: page,
            };
        }
        catch {
            throw new common_1.NotFoundException('Products or category for ' + getTenantId + ' not found');
        }
    }
    async getByCategories(categories, request, page, pageSize, status, name) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        try {
            const products = await this.productUseCase.getAllProducts(request);
            const discountProducts = products.map((item) => (0, discount_service_1.detecteDiscountProducts)(item));
            if (!discountProducts || discountProducts.length === 0) {
                throw new common_1.NotFoundException('Product not found');
            }
            const parsedResult = discountProducts.map((item) => {
                const extraInfo = JSON.parse(item.extraInfo);
                return { ...item, extraInfo };
            });
            let filteredResult;
            if (categories.list_categories !== undefined &&
                categories.list_categories.length > 0) {
                filteredResult = parsedResult
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .filter((item) => {
                    const categoryMatches = categories.list_categories.some((category) => item.extraInfo.categories.includes(category));
                    const statusMatches = !status || item.status === status;
                    return categoryMatches && statusMatches;
                });
            }
            else {
                filteredResult = discountProducts
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .filter((item) => {
                    if (name !== undefined && name.length > 2) {
                        const someName = item.name
                            .toLowerCase()
                            .includes(name.toLowerCase());
                        const statusMatches = !status || item.status === status;
                        return statusMatches && someName;
                    }
                    else {
                        const statusMatches = !status || item.status === status;
                        return statusMatches;
                    }
                });
            }
            const totalPages = Math.ceil(filteredResult.length / pageSize);
            if (page && (page < 1 || page > totalPages)) {
                throw new common_1.NotFoundException('Invalid page number');
            }
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedResult = filteredResult.slice(startIndex, endIndex);
            return {
                data: paginatedResult,
                totalPages: totalPages,
                currentPage: page,
            };
        }
        catch {
            throw new common_1.NotFoundException('Products or category for ' + getTenantId + ' not found');
        }
    }
    async searchFilter(status, textSearch, request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        try {
            const products = await this.productUseCase.getAllProducts(request);
            const discountProducts = products.map((item) => (0, discount_service_1.detecteDiscountProducts)(item));
            if (!discountProducts || discountProducts.length === 0) {
                throw new common_1.NotFoundException('Product not found');
            }
            const parsedResult = discountProducts.map((item) => {
                const extraInfo = JSON.parse(item.extraInfo);
                return { ...item, extraInfo };
            });
            let filteredResult;
            if (textSearch.length > 0) {
                filteredResult = parsedResult
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .filter((item) => {
                    const someName = item.name
                        .toLowerCase()
                        .includes(textSearch.toLowerCase());
                    const someProductType = item.extraInfo.product_type
                        .toLowerCase()
                        .includes(textSearch.toLowerCase());
                    const tagToString = item.extraInfo.categories.toString();
                    const someProductTag = tagToString.includes(textSearch.toLowerCase());
                    const statusMatches = !status || item.status === status;
                    if (item.extraInfo.keywords) {
                        const someKeywords = item.extraInfo.keywords.includes(textSearch);
                        return ((someName ||
                            someProductType ||
                            someProductTag ||
                            someKeywords) &&
                            statusMatches);
                    }
                    else {
                        return ((someName || someProductType || someProductTag) && statusMatches);
                    }
                });
            }
            else {
                filteredResult = discountProducts
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .filter((item) => {
                    const statusMatches = !status || item.status === status;
                    return statusMatches;
                });
            }
            return {
                data: filteredResult,
            };
        }
        catch {
            throw new common_1.NotFoundException('Products or category for ' + getTenantId + ' not found');
        }
    }
    async getDiscountProducts(status, request, page, pageSize) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        try {
            const products = await this.productUseCase.getAllProducts(request);
            const discountProducts = products.map((item) => (0, discount_service_1.detecteDiscountProducts)(item));
            if (!discountProducts || discountProducts.length === 0) {
                throw new common_1.NotFoundException('Product not found');
            }
            const parsedResult = discountProducts.map((item) => {
                const extraInfo = JSON.parse(item.extraInfo);
                return { ...item, extraInfo };
            });
            const filteredResult = parsedResult
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .filter((item) => {
                const isDiscount = item.price_discount != undefined;
                const statusMatches = !status || item.status === status;
                return statusMatches && isDiscount;
            });
            const totalPages = Math.ceil(filteredResult.length / pageSize);
            if (page && (page < 1 || page > totalPages)) {
                throw new common_1.NotFoundException('Invalid page number');
            }
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedResult = filteredResult.slice(startIndex, endIndex);
            return {
                data: paginatedResult,
                totalPages: totalPages,
                currentPage: page,
            };
        }
        catch {
            throw new common_1.NotFoundException('Products or category for ' + getTenantId + ' not found');
        }
    }
    async generalFilters(status, request, sentence, page, pageSize, options) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        let resultFilters;
        try {
            const result = await this.generalFIlterClass.filterForFilters(request, getTenantId, status, sentence, options);
            resultFilters = result;
            const totalPages = Math.ceil(resultFilters.length / pageSize);
            if (page && (page < 1 || page > totalPages)) {
                throw new common_1.NotFoundException('Invalid page number');
            }
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedResult = resultFilters.slice(startIndex, endIndex);
            return {
                data: paginatedResult,
                totalPages: totalPages,
                currentPage: page,
            };
        }
        catch (error) {
            throw new common_1.NotFoundException('Products or category for ' + getTenantId + ' not found');
        }
    }
};
exports.OfferingRules = OfferingRules = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_usecase_1.ProductUsecase,
        generalFilter_1.GeneralFilterClass])
], OfferingRules);
//# sourceMappingURL=offering.js.map