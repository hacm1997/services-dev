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
exports.GeneralFilterClass = void 0;
const common_1 = require("@nestjs/common");
const product_usecase_1 = require("../rest/product.usecase");
const discount_service_1 = require("./discount.service");
let GeneralFilterClass = exports.GeneralFilterClass = class GeneralFilterClass {
    constructor(productUseCase) {
        this.productUseCase = productUseCase;
    }
    async filterUnion(filteredResult, options) {
        let result = filteredResult;
        if (options.minPrice !== undefined && options.maxPrice !== undefined) {
            result = result.filter((item) => item.price >= options.minPrice && item.price <= options.maxPrice);
        }
        if (Boolean(options.discount) === true) {
            result = result.filter((item) => item.price_discount > 0);
        }
        if (options.availableShipping) {
            result = result.filter((item) => item.extraInfo.available_shipping === true);
        }
        if (options.availablePickup) {
            result = result.filter((item) => item.extraInfo.available_pickup === true);
        }
        if (options.freeShipping) {
            result = result.filter((item) => item.extraInfo.free_shipping === true);
        }
        if (options.isBest) {
            result = result.filter((item) => item.extraInfo.isBest === true);
        }
        if (options.isNew) {
            result = result.filter((item) => item.extraInfo.isNew === true);
        }
        if (options.categoriFilter) {
            result = result.filter((item) => item.extraInfo.categories.includes(options.categoriFilter));
        }
        if (options.sortBy === 'desc') {
            result = result.sort((a, b) => b.price - a.price);
        }
        if (options.sortBy === 'asc') {
            result = result.sort((a, b) => a.price - b.price);
        }
        if (options.keyword) {
            result = result.filter((item) => item.extraInfo.keywords.some((keyword) => keyword.toLowerCase().includes(options.keyword)));
        }
        if (options.productType) {
            result = result.filter((item) => item.extraInfo.product_type.includes(options.productType));
        }
        return result;
    }
    async filterForFilters(request, tenant, status, sentence, options) {
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
                if (sentence) {
                    const productTypeMatches = item.extraInfo.product_type.includes(sentence);
                    const statusMatches = !status || item.status === status;
                    return productTypeMatches && statusMatches;
                }
                else {
                    const statusMatches = !status || item.status === status;
                    return statusMatches;
                }
            });
            const apllyFilters = await this.filterUnion(filteredResult, options);
            return apllyFilters;
        }
        catch {
            throw new common_1.NotFoundException('Products or category for ' + tenant + ' not found');
        }
    }
};
exports.GeneralFilterClass = GeneralFilterClass = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_usecase_1.ProductUsecase])
], GeneralFilterClass);
//# sourceMappingURL=generalFilter.js.map