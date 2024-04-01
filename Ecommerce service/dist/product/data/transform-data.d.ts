import { ProductModelData } from 'src/infrastructure/model/product/product.model.data';
export default function transformData(productObject: any): Promise<ProductModelData[]>;
export declare function transformDataPaginate(productObject: any): Promise<ProductModelData[]>;
