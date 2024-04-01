import { ProductUsecase } from './product.usecase';
import { ProductModelDTO } from 'src/product/rest/product.model.dto';
import { OfferingRules } from '../service/offering';
import { Categories } from './categories';
import { FilterOptions } from '../service/generalFilter';
import { Response } from 'express';
export declare class ProductResource {
    private productUseCase;
    private offeringRules;
    constructor(productUseCase: ProductUsecase, offeringRules: OfferingRules);
    getAllProducts(request: Request): Promise<ProductModelDTO[] | null>;
    getProductPerPage(request: Request, page: string, size: string): Promise<any>;
    getAllProductsById(id: string, request: Request): Promise<ProductModelDTO[] | null>;
    getProductsByParams(status: string, request: Request, isNew: boolean, isBest: boolean, page: string, pageSize: string): Promise<any>;
    createProduct(productDTO: ProductModelDTO, request: Request): Promise<ProductModelDTO>;
    getByCategories(city: string, status: string, freeShipping: number, minPrice: number, maxPrice: number, page: string, size: string, categories: Categories, request: Request): Promise<any>;
    getByTags(categories: Categories, request: Request, page: string, size: string, status: string, name: string): Promise<any>;
    putProduct(id: string, productDTO: any, request: Request): Promise<ProductModelDTO>;
    putProductStatus(productID: string, status: string, request: Request): Promise<ProductModelDTO>;
    putProductInventory(productID: string, quantity: string, isSum: string, request: Request): Promise<ProductModelDTO>;
    deleteProduct(request: Request, id: string): Promise<any>;
    searchFilter(status: string, textSearch: string, request: Request): Promise<any>;
    getDiscountProducts(status: string, request: Request, page: string, pageSize: string): Promise<any>;
    getFilterParams(status: string, request: Request, sentence: string, page: string, pageSize: string, filterOptions: FilterOptions): Promise<any>;
    uploadFile(file: any, request: Request): Promise<{
        message: string;
    }>;
    exportProducts(request: Request, response: Response): Promise<any>;
}
