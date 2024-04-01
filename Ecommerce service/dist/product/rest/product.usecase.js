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
exports.ProductUsecase = void 0;
const common_1 = require("@nestjs/common");
const product_gateway_1 = require("./product.gateway");
const product_model_1 = require("../data/product.model");
const product_model_dto_1 = require("./product.model.dto");
const s3service_1 = require("../service/s3service");
const moment = require("moment");
const cookies_1 = require("../../common/interceptors/getCookies/cookies");
const Constants_1 = require("../../infrastructure/dynamodb/intializer/Constants");
const idGenerator_1 = require("../util/idGenerator");
const productImportExport_1 = require("../util/productImportExport");
let ProductUsecase = exports.ProductUsecase = class ProductUsecase {
    constructor(productGateway, s3Service) {
        this.productGateway = productGateway;
        this.s3Service = s3Service;
    }
    async getAllProducts(request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const products = await this.productGateway.getAllProducts(getTenantId);
        return products.map(this.mapDomainToDTO);
    }
    async getProductsPerPage(request, page, size) {
        const products = await this.productGateway.fetchResultsWithPagination(request, page, size);
        const result = {
            data: products.data.map(this.mapDomainToDTO),
            totalPage: products.totalPage - 1,
        };
        return result;
    }
    async createProduct(productDTO, request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const createdProduct = await this.productGateway.createProduct(this.mapDTOToDomain(productDTO, getTenantId));
        return this.mapDomainToDTO(createdProduct);
    }
    async getAllProductsById(id, request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const products = await this.productGateway.getAllProductsById(id, getTenantId);
        return products.map(this.mapDomainToDTO);
    }
    async getProductsByParams(request, city, status, minPrice, maxPrice, freeShipping) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const products = await this.productGateway.getProductsByParams(city, status, minPrice, maxPrice, getTenantId, freeShipping);
        return products.map(this.mapDomainToDTO);
    }
    async putProduct(productDTO, request, id) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const putProduct = await this.productGateway.putProduct(productDTO, getTenantId, id);
        return this.mapDomainToDTO(putProduct);
    }
    async putProductStatus(productID, status, request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const putProductStatus = await this.productGateway.putProductStatus(productID, status, getTenantId);
        return putProductStatus;
    }
    async putProductInventory(productID, quantity, request, isSum) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const putProductInventory = await this.productGateway.putProductInventory(productID, quantity, getTenantId, isSum);
        return putProductInventory;
    }
    async deleteProduct(request, id) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const deleteProduct = await this.productGateway.deleteProduct(id, getTenantId);
        return deleteProduct;
    }
    async saveDataToDynamoDB(file, request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        try {
            const data = await (0, productImportExport_1.importProductsFunction)(file);
            try {
                await this.productGateway.saveDataToDynamoDB(data, getTenantId);
                return { message: 'import products success' };
            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
            return { message: 'Import of products failed' };
        }
    }
    async exportProducts(request, response) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const products = await this.productGateway.getAllProducts(getTenantId);
        const allProducts = products.map(this.mapDomainToDTO);
        try {
            await (0, productImportExport_1.exportProductsFunction)(response, allProducts, getTenantId);
            return { message: 'Export of products successful' };
        }
        catch (error) {
            return { message: 'Export of products failed' };
        }
    }
    mapDTOToDomain(productDTO, tenantID) {
        const buildSid = (0, idGenerator_1.default)(Constants_1.PRODUCT_GROUP);
        const currentDate = moment().subtract(5, 'hours');
        return (product_model_1.ProductModel.builder()
            .TENANTID(Constants_1.PRODUCT_GROUP + '#' + tenantID)
            .SID(buildSid)
            .NAME(productDTO.name)
            .IMAGE(productDTO.image)
            .DESCRIPTION(productDTO.description)
            .PRICE(productDTO.price)
            .CREATEDAT(currentDate.toISOString())
            .STATUS(productDTO.status)
            .EXTRAINFO(productDTO.extraInfo)
            .INVENTORY(productDTO.inventory)
            .build());
    }
    mapDomainToDTO(product) {
        return (product_model_dto_1.ProductModelDTO.builder()
            .ID(product.sid)
            .NAME(product.name)
            .IMAGE(product.image)
            .DESCRIPTION(product.description)
            .PRICE(product.price)
            .INVENTORY(product.inventory)
            .CREATEDAT(product.createdAt)
            .STATUS(product.status)
            .EXTRAINFO(product.extraInfo)
            .INVENTORY(product.inventory)
            .build());
    }
};
exports.ProductUsecase = ProductUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_gateway_1.ProductGateway,
        s3service_1.S3Service])
], ProductUsecase);
//# sourceMappingURL=product.usecase.js.map