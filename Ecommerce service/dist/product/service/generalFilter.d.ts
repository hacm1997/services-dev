import { ProductUsecase } from '../rest/product.usecase';
export interface FilterOptions {
    freeShipping?: boolean;
    discount?: boolean;
    availableShipping?: boolean;
    availablePickup?: boolean;
    minPrice?: number;
    maxPrice?: number;
    isNew?: boolean;
    isBest?: boolean;
    orderPrice?: boolean;
    disponibility?: boolean;
    categoriFilter?: string;
    sortBy?: string;
    keyword?: string;
    productType?: string;
}
export declare class GeneralFilterClass {
    private productUseCase;
    constructor(productUseCase: ProductUsecase);
    filterUnion(filteredResult: any, options: FilterOptions): Promise<any>;
    filterForFilters(request: Request, tenant: string, status: string, sentence: string, options?: FilterOptions): Promise<any>;
}
