import { Injectable } from '@nestjs/common';
import { ProductGateway } from './product.gateway';
import { ProductModel } from '../data/product.model';
import { ProductModelDTO } from './product.model.dto';
import { S3Service } from 'src/product/service/s3service';
import * as moment from 'moment';
import getCookies from 'src/common/interceptors/getCookies/cookies';
import { PRODUCT_GROUP } from 'src/infrastructure/dynamodb/intializer/Constants';
import generatorSID from '../util/idGenerator';
import { ProductInterface } from '../util/product.interface';
import { Response } from 'express';
import {
  exportProductsFunction,
  importProductsFunction,
} from '../util/productImportExport';

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

@Injectable()
export class ProductUsecase {
  constructor(
    private productGateway: ProductGateway,
    private s3Service: S3Service,
  ) {}

  public async getAllProducts(request: Request): Promise<ProductModelDTO[]> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const products: ProductModel[] = await this.productGateway.getAllProducts(
      getTenantId,
    );
    return products.map(this.mapDomainToDTO);
  }

  public async getProductsPerPage(
    request: Request,
    page: number,
    size: number,
  ): Promise<any> {
    const products = await this.productGateway.fetchResultsWithPagination(
      request,
      page,
      size,
    );

    const result = {
      data: products.data.map(this.mapDomainToDTO),
      totalPage: products.totalPage - 1,
    };

    return result;
  }

  public async createProduct(
    productDTO: ProductModelDTO,
    request: Request,
  ): Promise<ProductModelDTO> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    // console.log(getTenantId);
    // const imageSave = '';

    // try {
    //   imageSave = await this.s3Service.upload('pedrito');
    //   productDTO.image = imageSave;
    // } catch (error) {
    //   // console.log(error);
    // }
    const createdProduct: ProductModel =
      await this.productGateway.createProduct(
        this.mapDTOToDomain(productDTO, getTenantId),
      );
    return this.mapDomainToDTO(createdProduct);
  }

  public async getAllProductsById(
    id: string,
    request: Request,
  ): Promise<ProductModelDTO[]> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const products: ProductModel[] =
      await this.productGateway.getAllProductsById(id, getTenantId);

    return products.map(this.mapDomainToDTO);
  }

  public async getProductsByParams(
    request: Request,
    city: string,
    status?: string,
    minPrice?: number,
    maxPrice?: number,
    freeShipping?: number | boolean,
  ): Promise<ProductModelDTO[]> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const products: ProductModel[] =
      await this.productGateway.getProductsByParams(
        city,
        status,
        minPrice,
        maxPrice,
        getTenantId,
        freeShipping,
      );

    return products.map(this.mapDomainToDTO);
  }

  public async putProduct(
    productDTO: ProductModelDTO,
    request: Request,
    id: string,
  ): Promise<ProductModelDTO> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const putProduct: ProductModel = await this.productGateway.putProduct(
      productDTO,
      getTenantId,
      id,
    );
    return this.mapDomainToDTO(putProduct);
  }

  public async putProductStatus(
    productID: string,
    status: string,
    request: Request,
  ): Promise<any> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const putProductStatus: any = await this.productGateway.putProductStatus(
      productID,
      status,
      getTenantId,
    );
    return putProductStatus;
  }

  public async putProductInventory(
    productID: string,
    quantity: number,
    request: Request,
    isSum?: string,
  ): Promise<any> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const putProductInventory: any =
      await this.productGateway.putProductInventory(
        productID,
        quantity,
        getTenantId,
        isSum,
      );
    return putProductInventory;
  }

  public async deleteProduct(request: Request, id: string): Promise<any> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const deleteProduct: any = await this.productGateway.deleteProduct(
      id,
      getTenantId,
    );
    return deleteProduct;
  }

  public async saveDataToDynamoDB(file: any, request: Request) {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);

    try {
      const data = await importProductsFunction(file);
      try {
        await this.productGateway.saveDataToDynamoDB(data, getTenantId);
        return { message: 'import products success' };
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      return { message: 'Import of products failed' };
    }
  }

  public async exportProducts(request: Request, response: Response) {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);

    const products: ProductModel[] = await this.productGateway.getAllProducts(
      getTenantId,
    );

    const allProducts: ProductInterface[] = products.map(this.mapDomainToDTO);

    try {
      await exportProductsFunction(response, allProducts, getTenantId);
      return { message: 'Export of products successful' };
    } catch (error) {
      return { message: 'Export of products failed' };
    }
  }

  private mapDTOToDomain(
    productDTO: ProductModelDTO,
    tenantID: string,
  ): ProductModel {
    const buildSid = generatorSID(PRODUCT_GROUP);
    const currentDate = moment().subtract(5, 'hours');
    // const productIdBuiled = PRODUCT_GROUP + '-' + buildSid;
    // const item = this.createNewItemFromDomainModel(productDTO);
    return (
      ProductModel.builder()
        .TENANTID(PRODUCT_GROUP + '#' + tenantID)
        .SID(buildSid)
        // .ID(buildSid)
        .NAME(productDTO.name)
        .IMAGE(productDTO.image)
        .DESCRIPTION(productDTO.description)
        .PRICE(productDTO.price)
        .CREATEDAT(currentDate.toISOString())
        .STATUS(productDTO.status)
        .EXTRAINFO(productDTO.extraInfo)
        .INVENTORY(productDTO.inventory)
        .build()
    );
  }

  private mapDomainToDTO(product: ProductModel): ProductModelDTO {
    return (
      ProductModelDTO.builder()
        .ID(product.sid)
        //.TENANTID(product.tenantID)
        .NAME(product.name)
        .IMAGE(product.image)
        .DESCRIPTION(product.description)
        .PRICE(product.price)
        .INVENTORY(product.inventory)
        .CREATEDAT(product.createdAt)
        .STATUS(product.status)
        .EXTRAINFO(product.extraInfo)
        .INVENTORY(product.inventory)
        .build()
    );
  }

  // private mapDomainPaginatedToDTO(
  //   product: pagination,
  //   totalPage: number,
  // ): ProductModelDTO {
  //   return (
  //     ProductModelDTO.builder()
  //       .ID(product.id)
  //       //.TENANTID(product.tenantID)
  //       .NAME(product.name)
  //       .IMAGE(product.image)
  //       .DESCRIPTION(product.description)
  //       .PRICE(product.price)
  //       .CREATEDAT(product.createdAt)
  //       .STATUS(product.status)
  //       .EXTRAINFO(product.extraInfo)
  //       .build()
  //   );
  // }
}
