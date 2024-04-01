import { ProductGateway } from './product.gateway';
import { ProductModelDTO } from './product.model.dto';
import { S3Service } from 'src/product/service/s3service';
import { Response } from 'express';
export interface pagination {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    createdAt: Date;
    status: string;
    extraInfo: string;
    totalPages: number;
}
export declare class ProductUsecase {
    private productGateway;
    private s3Service;
    constructor(productGateway: ProductGateway, s3Service: S3Service);
    getAllProducts(request: Request): Promise<ProductModelDTO[]>;
    getProductsPerPage(request: Request, page: number, size: number): Promise<any>;
    createProduct(productDTO: ProductModelDTO, request: Request): Promise<ProductModelDTO>;
    getAllProductsById(id: string, request: Request): Promise<ProductModelDTO[]>;
    getProductsByParams(request: Request, city: string, status?: string, minPrice?: number, maxPrice?: number, freeShipping?: number | boolean): Promise<ProductModelDTO[]>;
    putProduct(productDTO: ProductModelDTO, request: Request, id: string): Promise<ProductModelDTO>;
    putProductStatus(productID: string, status: string, request: Request): Promise<any>;
    putProductInventory(productID: string, quantity: number, request: Request, isSum?: string): Promise<any>;
    deleteProduct(request: Request, id: string): Promise<any>;
    saveDataToDynamoDB(file: any, request: Request): Promise<{
        message: string;
    }>;
    exportProducts(request: Request, response: Response): Promise<{
        message: string;
    }>;
    private mapDTOToDomain;
    private mapDomainToDTO;
}
