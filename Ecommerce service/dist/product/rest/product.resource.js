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
exports.ProductResource = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_usecase_1 = require("./product.usecase");
const product_model_dto_1 = require("./product.model.dto");
const offering_1 = require("../service/offering");
const discount_service_1 = require("../service/discount.service");
const platform_express_1 = require("@nestjs/platform-express");
let ProductResource = exports.ProductResource = class ProductResource {
    constructor(productUseCase, offeringRules) {
        this.productUseCase = productUseCase;
        this.offeringRules = offeringRules;
    }
    async getAllProducts(request) {
        const products = await this.productUseCase.getAllProducts(request);
        if (!products || products.length === 0) {
            throw new common_1.NotFoundException('Products not found');
        }
        return products;
    }
    async getProductPerPage(request, page, size) {
        const product = await this.productUseCase.getProductsPerPage(request, Number(page), Number(size));
        if (!product) {
            throw new common_1.NotFoundException('Product was not found');
        }
        return product;
    }
    async getAllProductsById(id, request) {
        const products = await this.productUseCase.getAllProductsById(id, request);
        const discountProducts = (0, discount_service_1.detecteDiscountProducts)(products[0]);
        if (!discountProducts || discountProducts.length === 0) {
            throw new common_1.NotFoundException('Product not found');
        }
        else {
            return discountProducts;
        }
    }
    async getProductsByParams(status, request, isNew, isBest, page, pageSize) {
        const getProductsRules = this.offeringRules.getProductsParams(status, request, isNew, isBest, Number(page), Number(pageSize));
        return getProductsRules;
    }
    async createProduct(productDTO, request) {
        return await this.productUseCase.createProduct(productDTO, request);
    }
    async getByCategories(city, status, freeShipping, minPrice, maxPrice, page, size, categories, request) {
        const getProducts = await this.offeringRules.getProductCategories(categories, request, city, status, minPrice, maxPrice, freeShipping, Number(page), Number(size));
        return getProducts;
    }
    async getByTags(categories, request, page, size, status, name) {
        const getProducts = await this.offeringRules.getByCategories(categories, request, Number(page), Number(size), status, name);
        return getProducts;
    }
    async putProduct(id, productDTO, request) {
        return await this.productUseCase.putProduct(productDTO, request, id);
    }
    async putProductStatus(productID, status, request) {
        return await this.productUseCase.putProductStatus(productID, status, request);
    }
    async putProductInventory(productID, quantity, isSum, request) {
        return await this.productUseCase.putProductInventory(productID, Number(quantity), request, isSum);
    }
    async deleteProduct(request, id) {
        try {
            return await this.productUseCase.deleteProduct(request, id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Product not deleted');
        }
    }
    async searchFilter(status, textSearch, request) {
        const getProductsRules = this.offeringRules.searchFilter(status, textSearch, request);
        return getProductsRules;
    }
    async getDiscountProducts(status, request, page, pageSize) {
        const getProductsRules = this.offeringRules.getDiscountProducts(status, request, Number(page), Number(pageSize));
        return getProductsRules;
    }
    async getFilterParams(status, request, sentence, page, pageSize, filterOptions) {
        const getProductsRules = this.offeringRules.generalFilters(status, request, sentence, Number(page), Number(pageSize), filterOptions);
        return getProductsRules;
    }
    async uploadFile(file, request) {
        const importData = await this.productUseCase.saveDataToDynamoDB(file, request);
        return importData;
    }
    async exportProducts(request, response) {
        const exportProducts = await this.productUseCase.exportProducts(request, response);
        return exportProducts;
    }
};
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ description: 'Get a products by tenant' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Products found',
        type: product_model_dto_1.ProductModelDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Products not found',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], ProductResource.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)('/pagination'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'ProductDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product was not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get products by tenant' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String, String]),
    __metadata("design:returntype", Promise)
], ProductResource.prototype, "getProductPerPage", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ description: 'Get a product by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Product found',
        type: product_model_dto_1.ProductModelDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Product not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", Promise)
], ProductResource.prototype, "getAllProductsById", null);
__decorate([
    (0, common_1.Get)('search/params'),
    (0, swagger_1.ApiOperation)({ description: 'Get a product by Params' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Products by params found',
        type: product_model_dto_1.ProductModelDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Product params not found',
    }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)('new')),
    __param(3, (0, common_1.Query)('best')),
    __param(4, (0, common_1.Query)('page')),
    __param(5, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request, Boolean, Boolean, String, String]),
    __metadata("design:returntype", Promise)
], ProductResource.prototype, "getProductsByParams", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiBody)({ type: product_model_dto_1.ProductModelDTO, required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'New product created',
        type: product_model_dto_1.ProductModelDTO,
    }),
    (0, swagger_1.ApiOperation)({ description: 'Create a product' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_model_dto_1.ProductModelDTO,
        Request]),
    __metadata("design:returntype", Promise)
], ProductResource.prototype, "createProduct", null);
__decorate([
    (0, common_1.Post)('/filters'),
    (0, swagger_1.ApiBody)({ type: product_model_dto_1.ProductModelDTO, required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Products found',
        type: product_model_dto_1.ProductModelDTO,
    }),
    (0, swagger_1.ApiOperation)({ description: 'Get products by categories' }),
    __param(0, (0, common_1.Query)('city')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('free-shipping')),
    __param(3, (0, common_1.Query)('minPrice')),
    __param(4, (0, common_1.Query)('maxPrice')),
    __param(5, (0, common_1.Query)('page')),
    __param(6, (0, common_1.Query)('limit')),
    __param(7, (0, common_1.Body)()),
    __param(8, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, Number, String, String, Object, Request]),
    __metadata("design:returntype", Promise)
], ProductResource.prototype, "getByCategories", null);
__decorate([
    (0, common_1.Post)('/category'),
    (0, swagger_1.ApiBody)({ type: 'ProductsDTO', required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'products found',
        type: 'ProductsDTO',
    }),
    (0, swagger_1.ApiOperation)({ description: 'Get products by categories' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('status')),
    __param(5, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ProductResource.prototype, "getByTags", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'Product update success' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'The product cannot be edited' }),
    (0, swagger_1.ApiOperation)({ summary: 'Edit product' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Request]),
    __metadata("design:returntype", Promise)
], ProductResource.prototype, "putProduct", null);
__decorate([
    (0, common_1.Put)('/update/status'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'Product status update success' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Product status cannot be updated',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Edit product status' }),
    __param(0, (0, common_1.Query)('product-id')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Request]),
    __metadata("design:returntype", Promise)
], ProductResource.prototype, "putProductStatus", null);
__decorate([
    (0, common_1.Put)('/inventory'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'Product inventory update success' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Product inventory cannot be updated',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Edit product status' }),
    __param(0, (0, common_1.Query)('product-id')),
    __param(1, (0, common_1.Query)('quantity')),
    __param(2, (0, common_1.Query)('isSum')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Request]),
    __metadata("design:returntype", Promise)
], ProductResource.prototype, "putProductInventory", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product to deleted not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Deleted product' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String]),
    __metadata("design:returntype", Promise)
], ProductResource.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, swagger_1.ApiOperation)({ description: 'Get a product by Params' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Products by params found',
        type: product_model_dto_1.ProductModelDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Product params not found',
    }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('text')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Request]),
    __metadata("design:returntype", Promise)
], ProductResource.prototype, "searchFilter", null);
__decorate([
    (0, common_1.Get)('single/offert'),
    (0, swagger_1.ApiOperation)({ description: 'Get a product with discount' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'ProductDTO' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Product with discount not found',
    }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request, String, String]),
    __metadata("design:returntype", Promise)
], ProductResource.prototype, "getDiscountProducts", null);
__decorate([
    (0, common_1.Post)('filter/params'),
    (0, swagger_1.ApiOperation)({ description: 'Get a product with discount' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'ProductDTO' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Product with discount not found',
    }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)('text_key')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __param(5, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductResource.prototype, "getFilterParams", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], ProductResource.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('/export/file'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], ProductResource.prototype, "exportProducts", null);
exports.ProductResource = ProductResource = __decorate([
    (0, swagger_1.ApiTags)('product'),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_usecase_1.ProductUsecase,
        offering_1.OfferingRules])
], ProductResource);
//# sourceMappingURL=product.resource.js.map