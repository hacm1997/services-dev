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
exports.ProductAdapter = void 0;
const common_1 = require("@nestjs/common");
const product_enum_1 = require("../../model/product/product.enum");
const product_model_data_1 = require("../../model/product/product.model.data");
const product_model_1 = require("../../../product/data/product.model");
const product_gateway_1 = require("../../../product/rest/product.gateway");
const cookies_1 = require("../../../common/interceptors/getCookies/cookies");
let ProductAdapter = exports.ProductAdapter = class ProductAdapter extends product_gateway_1.ProductGateway {
    constructor(productRepository) {
        super();
        this.productRepository = productRepository;
    }
    async saveDataToDynamoDB(data, tenantID) {
        try {
            const uploadProducts = await this.productRepository.saveDataToDynamoDB(data, tenantID);
            return uploadProducts;
        }
        catch (error) {
            throw new Error('Error to upload products in db.');
        }
    }
    async createProduct(product) {
        try {
            const storeProduct = await this.productRepository.createProduct(this.mapToData(product, product_enum_1.ProductEnum.NEW));
            return this.mapToDomain(storeProduct);
        }
        catch (error) {
            console.log(error);
            throw new Error('Error to create product in db.');
        }
    }
    async putProduct(product, tenantID, id) {
        try {
            const storeProduct = await this.productRepository.putProduct(this.mapToData(product, product_enum_1.ProductEnum.NEW), tenantID, id);
            return this.mapToDomain(storeProduct);
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async putProductStatus(productID, status, tenantID) {
        try {
            const storeProduct = await this.productRepository.putProductStatus(productID, status, tenantID);
            return storeProduct;
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async putProductInventory(productID, quantity, tenantID, isSum) {
        try {
            const storeProduct = await this.productRepository.putProductInventory(productID, quantity, tenantID, isSum);
            return storeProduct;
        }
        catch (error) {
            console.log('Error en putProductInventory:');
            return null;
        }
    }
    async deleteProduct(id, tenantID) {
        try {
            const storeProduct = await this.productRepository.deleteProduct(id, tenantID);
            return storeProduct;
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async getAllProducts(tenantID) {
        try {
            const storeProducts = await this.productRepository.getAllProducts(tenantID);
            if (storeProducts) {
                return storeProducts.map(this.mapToDomain);
            }
            else {
                return [];
            }
        }
        catch (error) {
            console.error('Error getting products from db:', error);
            throw new Error('Error to get products in db.');
        }
    }
    async fetchResultsWithPagination(request, pageNumber, pageSize) {
        const tokenRequest = request.headers ?? request.headers;
        const tenant = (0, cookies_1.default)(tokenRequest);
        const Products = await this.productRepository.fetchResultsWithPagination(tenant, pageNumber, pageSize);
        let countNonEmptyItems = 1;
        const itemsPromises = Products.results.map(async (result) => {
            const resolvedItems = await result.items;
            countNonEmptyItems++;
            return {
                ...result,
                items: resolvedItems.map(this.mapToDomain),
            };
        });
        const resolvedResults = await Promise.all(itemsPromises);
        if (resolvedResults[pageNumber - 1]) {
            if (resolvedResults[pageNumber - 1].items.length > 0) {
                return {
                    data: resolvedResults[pageNumber - 1].items.map(this.mapToDomain),
                    totalPage: countNonEmptyItems,
                };
            }
            else {
                return {
                    data: [],
                    totalPage: 0,
                };
            }
        }
        else {
            return {
                data: [],
                totalPage: 0,
            };
        }
    }
    async getAllProductsById(productID, tenantID) {
        try {
            const storeProducts = await this.productRepository.getAllProductsById(productID, tenantID);
            if (storeProducts) {
                return storeProducts.map(this.mapToDomain);
            }
            else {
                return [];
            }
        }
        catch (error) {
            console.error('Error getting products from db:', error);
            throw new Error('Error to get products in db.');
        }
    }
    async getProductsByParams(city, status, minPrice, maxPrice, tenantID, freeShipping) {
        try {
            const storeProducts = await this.productRepository.getProductsByParams(city, status, minPrice, maxPrice, tenantID, freeShipping);
            if (storeProducts) {
                return storeProducts.map(this.mapToDomain);
            }
            else {
                return [];
            }
        }
        catch (error) {
            console.error('Error getting products from db:', error);
            throw new Error('Error to get products in db.');
        }
    }
    mapToData(product, behavior) {
        const productData = new product_model_data_1.ProductModelData(product.tenantID, product.sid, product.name, product.price, product.createdAt, product.status);
        if (behavior === product_enum_1.ProductEnum.UPDATE)
            productData.sid = product.sid;
        productData.image = product.image;
        productData.description = product.description;
        productData.extraInfo = product.extraInfo;
        productData.inventory = product.inventory;
        return productData;
    }
    mapToDomain(productData) {
        return product_model_1.ProductModel.builder()
            .TENANTID(productData.tenantID)
            .SID(productData.sid)
            .NAME(productData.name)
            .IMAGE(productData.image)
            .DESCRIPTION(productData.description)
            .PRICE(productData.price)
            .CREATEDAT(productData.createdAt)
            .STATUS(productData.status)
            .EXTRAINFO(productData.extraInfo)
            .INVENTORY(productData.inventory)
            .build();
    }
};
exports.ProductAdapter = ProductAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ProductRepository')),
    __metadata("design:paramtypes", [Object])
], ProductAdapter);
//# sourceMappingURL=product.adapter.js.map