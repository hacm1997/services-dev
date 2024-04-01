import { ProductInterface } from '../data/product.interface';
import { ProductGateway } from 'src/product/rest/product.gateway';
export declare class UpdateProductInventory {
    private productGateway;
    constructor(productGateway: ProductGateway);
    updateProductsInventory(tenantID: string, products: ProductInterface[], isSum?: string): Promise<any>;
}
