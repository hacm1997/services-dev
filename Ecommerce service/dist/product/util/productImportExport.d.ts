import { Response } from 'express';
import { ProductInterface } from './product.interface';
export declare function importProductsFunction(file: any): Promise<ProductInterface[]>;
export declare function exportProductsFunction(response: Response, products: ProductInterface[], tenantID: string): Promise<void>;
