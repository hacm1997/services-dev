import { ProductRepository } from '../../../product/data/product.repository';
import { ProductModel } from 'src/product/data/product.model';
import { ProductGateway } from 'src/product/rest/product.gateway';
export interface resultPaginationProducts {
    data: ProductModel[];
    totalPage: number;
}
export declare class ProductAdapter extends ProductGateway {
    private productRepository;
    constructor(productRepository: ProductRepository);
    saveDataToDynamoDB(data: any, tenantID: string): Promise<any>;
    createProduct(product: ProductModel): Promise<ProductModel>;
    putProduct(product: ProductModel, tenantID: string, id: string): Promise<ProductModel>;
    putProductStatus(productID: string, status: string, tenantID: string): Promise<any>;
    putProductInventory(productID: string, quantity: number, tenantID: string, isSum: string): Promise<any>;
    deleteProduct(id: string, tenantID: string): Promise<void>;
    getAllProducts(tenantID: string): Promise<ProductModel[]>;
    fetchResultsWithPagination(request: Request, pageNumber: number, pageSize: number): Promise<resultPaginationProducts>;
    getAllProductsById(productID: string, tenantID: string): Promise<ProductModel[]>;
    getProductsByParams(city: string, status: string, minPrice: number, maxPrice: number, tenantID: string, freeShipping: number | boolean): Promise<ProductModel[]>;
    private mapToData;
    private mapToDomain;
}
