import { ProductModelData } from '../../infrastructure/model/product/product.model.data';
import { ClientDynamodb } from '../../infrastructure/dynamodb/client';
import { AppService } from 'src/app.service';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ProductModel } from './product.model';
interface PaginationResult {
    items: ProductModelData[] | any;
    lastEvaluatedKey: DocumentClient.Key;
}
interface ExtendedPaginationResult {
    results: PaginationResult[];
    totalPages: number;
}
export interface ProductRepository {
    createProduct: (product: ProductModelData) => Promise<ProductModelData>;
    getAllProducts: (tenantID: string) => Promise<ProductModelData[] | null>;
    getAllProductsById: (id: string, tenantID: string) => Promise<ProductModelData[] | null>;
    getAllProductsPerPage(getTenantId: string, pageNumber: number, pageSize: number): Promise<any>;
    fetchResultsWithPagination(getTenantId: string, pageNumber: number, pageSize: number): Promise<any>;
    putProduct: (product: ProductModelData, tenantID: string, id: string) => Promise<ProductModelData>;
    getProductsByParams: (city: string, status: string, minPrice: number, maxPrice: number, tenantID: string, freeShipping: number | boolean | string) => Promise<ProductModelData[] | null>;
    putProductStatus: (productID: string, status: string, tenantID: string) => Promise<any>;
    putProductInventory: (productID: string, quantity: number, tenantID: string, isSum?: string) => Promise<any>;
    deleteProduct: (id: string, tenantID: string) => Promise<any>;
    saveDataToDynamoDB: (data: any, tenantID: string) => Promise<any>;
}
export declare class ProductRepositoryImpl implements ProductRepository {
    private fullClientDynamodb;
    private readonly dynamoDb;
    constructor(fullClientDynamodb: ClientDynamodb);
    static GROUP: string;
    static appService: AppService;
    saveDataToDynamoDB(data: ProductModel[], tenantID: string): Promise<any>;
    private removeRowNum;
    createProduct(product: ProductModelData): Promise<ProductModelData>;
    getAllProducts(tenantID: string): Promise<ProductModelData[] | null>;
    getAllProductsPerPage(tenantID: string, pageNumber: number, pageSize: number, lastEvaluatedKey?: DocumentClient.Key): Promise<PaginationResult>;
    fetchResultsWithPagination(tenant: string, pageNumber: number, pageSize: number, lastEvaluatedKey?: DocumentClient.Key, accumulatedResults?: PaginationResult[]): Promise<ExtendedPaginationResult>;
    getAllProductsById(id: string, tenantID: string): Promise<ProductModelData[] | any>;
    getProductsByParams(city?: string | null | undefined, status?: string, minPrice?: number | null, maxPrice?: number | null, tenantID?: string | null | undefined, freeShipping?: boolean | number): Promise<ProductModelData[] | null>;
    putProduct(product: any, tenantID: string, id: string): Promise<ProductModelData>;
    getProductCategories(tenantID: string): Promise<ProductModelData[] | null>;
    putProductStatus(productID: string, status: string, tenantID: string): Promise<any>;
    putProductInventory(productID: string, quantity: number, tenantID: string, isSum?: string): Promise<any>;
    deleteProduct(id: string, tenantID: string): Promise<any>;
    private createNewItemFromDomainModel;
}
export {};
