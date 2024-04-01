import { ProductModel } from '../data/product.model';
export declare abstract class ProductGateway {
    abstract createProduct(product: ProductModel): Promise<ProductModel>;
    private readonly dynamoDB;
    abstract getAllProducts(getTenantId: string): Promise<ProductModel[]>;
    abstract fetchResultsWithPagination(request: Request, pageNumber: number, pageSize: number): Promise<any>;
    abstract getAllProductsById(productID: string, tenantID: string): Promise<ProductModel[]>;
    abstract putProduct(product: ProductModel, tenantID: string, id: string): Promise<ProductModel>;
    abstract getProductsByParams(city: string, status: string, minPrice: number, maxPrice: number, tenantID: string, freeShipping: number | boolean): Promise<ProductModel[]>;
    abstract putProductStatus(productID: string, status: string, tenantID: string): Promise<any>;
    abstract putProductInventory(productID: string, quantity: number, tenantID: string, isSum?: string): Promise<any>;
    abstract deleteProduct(tenantID: string, id: string): Promise<any>;
    abstract saveDataToDynamoDB(file: any, tenantID: string): Promise<any>;
}
