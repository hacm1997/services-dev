import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../../product/data/product.repository';
import { ProductEnum } from 'src/infrastructure/model/product/product.enum';
import { ProductModelData } from 'src/infrastructure/model/product/product.model.data';
import { ProductModel } from 'src/product/data/product.model';
import { ProductGateway } from 'src/product/rest/product.gateway';
import getCookies from 'src/common/interceptors/getCookies/cookies';

export interface resultPaginationProducts {
  data: ProductModel[];
  totalPage: number;
}

@Injectable()
export class ProductAdapter extends ProductGateway {
  constructor(
    @Inject('ProductRepository') private productRepository: ProductRepository,
  ) {
    super();
  }

  public async saveDataToDynamoDB(data: any, tenantID: string): Promise<any> {
    try {
      const uploadProducts = await this.productRepository.saveDataToDynamoDB(
        data,
        tenantID,
      );
      return uploadProducts;
    } catch (error) {
      throw new Error('Error to upload products in db.');
    }
  }

  public async createProduct(product: ProductModel): Promise<ProductModel> {
    try {
      const storeProduct = await this.productRepository.createProduct(
        this.mapToData(product, ProductEnum.NEW),
      );
      return this.mapToDomain(storeProduct);
    } catch (error) {
      console.log(error);
      throw new Error('Error to create product in db.');
    }
  }
  public async putProduct(
    product: ProductModel,
    tenantID: string,
    id: string,
  ): Promise<ProductModel> {
    try {
      const storeProduct = await this.productRepository.putProduct(
        this.mapToData(product, ProductEnum.NEW),
        tenantID,
        id,
      );
      return this.mapToDomain(storeProduct);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  public async putProductStatus(
    productID: string,
    status: string,
    tenantID: string,
  ): Promise<any> {
    try {
      const storeProduct = await this.productRepository.putProductStatus(
        productID,
        status,
        tenantID,
      );
      return storeProduct;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  public async putProductInventory(
    productID: string,
    quantity: number,
    tenantID: string,
    isSum: string,
  ): Promise<any> {
    try {
      const storeProduct = await this.productRepository.putProductInventory(
        productID,
        quantity,
        tenantID,
        isSum,
      );
      return storeProduct;
    } catch (error) {
      console.log('Error en putProductInventory:');
      return null;
    }
  }

  public async deleteProduct(id: string, tenantID: string): Promise<void> {
    try {
      const storeProduct = await this.productRepository.deleteProduct(
        id,
        tenantID,
      );
      return storeProduct;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  public async getAllProducts(tenantID: string): Promise<ProductModel[]> {
    try {
      const storeProducts = await this.productRepository.getAllProducts(
        tenantID,
      );

      if (storeProducts) {
        return storeProducts.map(this.mapToDomain);
      } else {
        return []; // Devolver un arreglo vacío si no se encontraron productos
      }
    } catch (error) {
      console.error('Error getting products from db:', error);
      throw new Error('Error to get products in db.');
    }
  }

  public async fetchResultsWithPagination(
    request: Request,
    pageNumber: number,
    pageSize: number,
  ): Promise<resultPaginationProducts> {
    const tokenRequest = request.headers ?? request.headers;
    const tenant = getCookies(tokenRequest);
    const Products: any =
      await this.productRepository.fetchResultsWithPagination(
        tenant,
        pageNumber,
        pageSize,
      );
    let countNonEmptyItems = 1;

    const itemsPromises = Products.results.map(async (result: any) => {
      const resolvedItems = await result.items;
      countNonEmptyItems++;
      return {
        ...result,
        items: resolvedItems.map(this.mapToDomain),
      };
    });
    const resolvedResults = await Promise.all(itemsPromises);

    if (resolvedResults[pageNumber - 1]) {
      if (resolvedResults[pageNumber - 1].items.length > 0) {
        return {
          data: resolvedResults[pageNumber - 1].items.map(this.mapToDomain),
          totalPage: countNonEmptyItems,
        };
      } else {
        return {
          data: [],
          totalPage: 0,
        };
      }
    } else {
      return {
        data: [],
        totalPage: 0,
      };
    }
  }
  public async getAllProductsById(
    productID: string,
    tenantID: string,
  ): Promise<ProductModel[]> {
    try {
      const storeProducts = await this.productRepository.getAllProductsById(
        productID,
        tenantID,
      );

      if (storeProducts) {
        return storeProducts.map(this.mapToDomain);
      } else {
        return []; // return empyt array if products not found
      }
    } catch (error) {
      console.error('Error getting products from db:', error);
      throw new Error('Error to get products in db.');
    }
  }

  public async getProductsByParams(
    city: string,
    status: string,
    minPrice: number,
    maxPrice: number,
    tenantID: string,
    freeShipping: number | boolean,
  ): Promise<ProductModel[]> {
    try {
      const storeProducts = await this.productRepository.getProductsByParams(
        city,
        status,
        minPrice,
        maxPrice,
        tenantID,
        freeShipping,
      );

      if (storeProducts) {
        return storeProducts.map(this.mapToDomain);
      } else {
        return []; // Devolver un arreglo vacío si no se encontraron productos
      }
    } catch (error) {
      console.error('Error getting products from db:', error);
      throw new Error('Error to get products in db.');
    }
  }

  private mapToData(
    product: ProductModel,
    behavior: ProductEnum,
  ): ProductModelData {
    const productData = new ProductModelData(
      product.tenantID,
      product.sid,
      product.name,
      product.price,
      product.createdAt,
      product.status,
    );
    if (behavior === ProductEnum.UPDATE) productData.sid = product.sid;
    productData.image = product.image;
    productData.description = product.description;
    productData.extraInfo = product.extraInfo;
    productData.inventory = product.inventory;
    return productData;
  }

  private mapToDomain(productData: ProductModelData): ProductModel {
    return ProductModel.builder()
      .TENANTID(productData.tenantID)
      .SID(productData.sid)
      .NAME(productData.name)
      .IMAGE(productData.image)
      .DESCRIPTION(productData.description)
      .PRICE(productData.price)
      .CREATEDAT(productData.createdAt)
      .STATUS(productData.status)
      .EXTRAINFO(productData.extraInfo)
      .INVENTORY(productData.inventory)
      .build();
  }
}
