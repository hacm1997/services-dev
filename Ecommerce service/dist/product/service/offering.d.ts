import { ProductUsecase } from '../rest/product.usecase';
import { Categories } from '../rest/categories';
import { FilterOptions, GeneralFilterClass } from './generalFilter';
export declare class OfferingRules {
    private productUseCase;
    private generalFIlterClass;
    constructor(productUseCase: ProductUsecase, generalFIlterClass: GeneralFilterClass);
    getProductsParams(status: string, request: Request, isNew?: boolean, isBest?: boolean, page?: number, pageSize?: number): Promise<{
        data: any[];
        totalPages: number;
        currentPage: number;
    }>;
    getProductCategories(categories: Categories, request: Request, city: string, status: string, minPrice?: number, maxPrice?: number, freeShipping?: number | boolean, page?: number, pageSize?: number): Promise<{
        data: any[];
        totalPages: number;
        currentPage: number;
    }>;
    getByCategories(categories: Categories, request: Request, page?: number, pageSize?: number, status?: string, name?: string): Promise<{
        data: any[];
        totalPages: number;
        currentPage: number;
    }>;
    searchFilter(status: string, textSearch: string, request: Request): Promise<{
        data: any[];
    }>;
    getDiscountProducts(status: string, request: Request, page?: number, pageSize?: number): Promise<{
        data: any[];
        totalPages: number;
        currentPage: number;
    }>;
    generalFilters(status: string, request: Request, sentence: string, page?: number, pageSize?: number, options?: FilterOptions): Promise<{
        data: any[];
        totalPages: number;
        currentPage: number;
    }>;
}
