import { ProductModelData } from '../../infrastructure/model/product/product.model.data';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientDynamodb } from '../../infrastructure/dynamodb/client';
import {
  PRODUCT_GROUP,
  TABLE_NAME,
} from '../../infrastructure/dynamodb/intializer/Constants';
import { PutItemCommandInput } from '@aws-sdk/client-dynamodb/dist-types/commands';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import transformData, { transformDataPaginate } from './transform-data';
import { AppService } from 'src/app.service';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ProductModel } from './product.model';
import * as moment from 'moment';
import generatorSID from '../util/idGenerator';

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
  getAllProductsById: (
    id: string,
    tenantID: string,
  ) => Promise<ProductModelData[] | null>;
  getAllProductsPerPage(
    getTenantId: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<any>;
  fetchResultsWithPagination(
    getTenantId: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<any>;
  putProduct: (
    product: ProductModelData,
    tenantID: string,
    id: string,
  ) => Promise<ProductModelData>;
  getProductsByParams: (
    city: string,
    status: string,
    minPrice: number,
    maxPrice: number,
    tenantID: string,
    freeShipping: number | boolean | string,
  ) => Promise<ProductModelData[] | null>;
  putProductStatus: (
    productID: string,
    status: string,
    tenantID: string,
  ) => Promise<any>;
  putProductInventory: (
    productID: string,
    quantity: number,
    tenantID: string,
    isSum?: string,
  ) => Promise<any>;
  deleteProduct: (id: string, tenantID: string) => Promise<any>;
  saveDataToDynamoDB: (data: any, tenantID: string) => Promise<any>;
}
@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  private readonly dynamoDb;
  // constructor(private s3Service: S3Service) {}
  constructor(private fullClientDynamodb: ClientDynamodb) {}
  static GROUP = PRODUCT_GROUP;
  static appService = new AppService();

  async saveDataToDynamoDB(
    data: ProductModel[],
    tenantID: string,
  ): Promise<any> {
    for (const item of data) {
      const buildSid = generatorSID(PRODUCT_GROUP);
      const items = this.createNewItemFromDomainModel(
        this.removeRowNum(item),
        tenantID,
        buildSid,
      );
      const putItemParams = {
        TableName: TABLE_NAME,
        Item: items,
      };
      await this.getAllProductsById(items.sid, tenantID)
        .then(async () => {
          const updateProduct = await this.putProduct(
            items,
            tenantID,
            items.sid,
          );
          return updateProduct;
        })
        .catch(async () => {
          try {
            const save = await this.fullClientDynamodb.fullClient.putItem(
              putItemParams,
            );
            return save;
          } catch (error) {
            console.log(error);
            return { message: 'Error to save products in DB: ' };
          }
        });
    }
  }
  private removeRowNum(data): any {
    const { __rowNum__, ...cleanedData } = data;
    return cleanedData;
  }

  public async createProduct(
    product: ProductModelData,
  ): Promise<ProductModelData> {
    const artifact: PutItemCommandInput = {
      TableName: TABLE_NAME,
      Item: product.getItem() as any,
    };
    console.log(`ARTIFACT TO CREATE ${JSON.stringify(artifact)}`);
    await this.fullClientDynamodb.fullClient.putItem(artifact);
    return product;
  }

  async getAllProducts(tenantID: string): Promise<ProductModelData[] | null> {
    const generateTenant = ProductRepositoryImpl.GROUP + '#' + tenantID;
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: 'pid = :tenant',
      ExpressionAttributeValues: {
        ':tenant': {
          S: generateTenant,
        },
      },
    };

    const resulTwo = await this.fullClientDynamodb.fullClient.query(params);
    const result = await ProductRepositoryImpl.appService.getAllData(
      params,
      resulTwo,
      [],
    );

    return transformData(result);
  }

  async getAllProductsPerPage(
    tenantID: string,
    pageNumber: number,
    pageSize: number,
    lastEvaluatedKey?: DocumentClient.Key,
  ): Promise<PaginationResult> {
    const generateTenant = ProductRepositoryImpl.GROUP + '#' + tenantID;
    const params: DocumentClient.QueryInput = {
      TableName: TABLE_NAME,
      KeyConditionExpression: 'pid = :tenant',
      ExpressionAttributeValues: {
        ':tenant': {
          S: generateTenant,
        },
      },
      Limit: pageSize,
    };

    if (lastEvaluatedKey) {
      params.ExclusiveStartKey = lastEvaluatedKey;
    }

    try {
      const data = await this.fullClientDynamodb.fullClient.query(params);

      // Aplica el filtrado por página
      const startItemIndex = lastEvaluatedKey ? 0 : (pageNumber - 1) * pageSize;
      const endItemIndex = startItemIndex + pageSize;
      const filteredItems = data.Items.slice(startItemIndex, endItemIndex);
      // Devuelve los resultados mapeados a tu dominio y la LastEvaluatedKey si existe
      const result: PaginationResult = {
        items: transformDataPaginate(filteredItems),
        lastEvaluatedKey: data.LastEvaluatedKey,
      };

      return result;
    } catch (error) {
      throw error;
    }

    // return transformData(result);
  }

  async fetchResultsWithPagination(
    tenant: string,
    pageNumber: number,
    pageSize: number,
    lastEvaluatedKey?: DocumentClient.Key,
    accumulatedResults: PaginationResult[] = [],
  ): Promise<ExtendedPaginationResult> {
    const result = await this.getAllProductsPerPage(
      tenant,
      pageNumber,
      pageSize,
      lastEvaluatedKey,
    );
    // Store the lastEvaluatedKey for the next call
    lastEvaluatedKey = result.lastEvaluatedKey;

    // Adds the current results to the accumulated array
    accumulatedResults.push(result);

    if (lastEvaluatedKey) {
      // Increment the page number only if there are more results
      pageNumber++;

      // Make another call if there are more results
      return this.fetchResultsWithPagination(
        tenant,
        pageNumber,
        pageSize,
        lastEvaluatedKey,
        accumulatedResults,
      );
    }

    return { results: accumulatedResults, totalPages: pageNumber };
  }

  async getAllProductsById(
    id: string,
    tenantID: string,
  ): Promise<ProductModelData[] | any> {
    // const buildId = ProductRepositoryImpl.GROUP + '-' + id;
    let final_tenant = '';
    if (tenantID.includes(ProductRepositoryImpl.GROUP)) {
      final_tenant = tenantID;
    } else {
      final_tenant = ProductRepositoryImpl.GROUP + '#' + tenantID;
    }

    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: 'pid = :tenant AND sid = :sid',
      ExpressionAttributeValues: {
        ':tenant': {
          S: final_tenant,
        },
        ':sid': {
          S: id,
        },
      },
    };

    const resulTwo = await this.fullClientDynamodb.fullClient.query(params);
    const result = await ProductRepositoryImpl.appService.getAllData(
      params,
      resulTwo,
      [],
    );

    return transformData(result);
  }

  async getProductsByParams(
    city?: string | null | undefined,
    status?: string,
    minPrice?: number | null,
    maxPrice?: number | null,
    tenantID?: string | null | undefined,
    freeShipping?: boolean | number,
  ): Promise<ProductModelData[] | null> {
    const generateTenant = ProductRepositoryImpl.GROUP + '#' + tenantID;
    // console.log('is free shipping => ', freeShipping);
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: 'pid = :pid',
      FilterExpression: '#product_status = :status',

      ExpressionAttributeNames: {
        '#product_status': 'status',
      },
      ExpressionAttributeValues: {
        ':pid': {
          S: generateTenant,
        },
        ':status': {
          S: status,
        },
      },
    };

    if (minPrice && maxPrice) {
      params.FilterExpression +=
        ' AND #product_price BETWEEN :minPrice AND :maxPrice';
      params.ExpressionAttributeNames['#product_price'] = 'price';
      params.ExpressionAttributeValues[':minPrice'] = {
        N: minPrice.toString(),
      };
      params.ExpressionAttributeValues[':maxPrice'] = {
        N: maxPrice.toString(),
      };
    }

    const resulTwo = await this.fullClientDynamodb.fullClient.query(params);

    const result = await ProductRepositoryImpl.appService.getAllData(
      params,
      resulTwo,
      [],
    );
    const parsedResult = result.map((item) => {
      const extraInfo = JSON.parse(item.extraInfo.S);
      return { ...item, extraInfo };
    });

    if (city) {
      // Filtrar por ciudad si existe
      const filteredResult = parsedResult.filter((item) => {
        const convertFreeShippint =
          typeof freeShipping === 'undefined' ? 0 : freeShipping;
        if (convertFreeShippint !== 0) {
          const convertBoolean = Number(freeShipping) === 1 ? true : false;
          return (
            item.extraInfo.city === city &&
            item.extraInfo.free_shipping === convertBoolean
          );
        } else {
          console.log('return 2');
          return item.extraInfo.city === city;
        }
      });
      return transformData(filteredResult);
    } else {
      return transformData(parsedResult);
    }
  }

  async putProduct(
    product: any,
    tenantID: string,
    id: string,
  ): Promise<ProductModelData> {
    const generateTenant = ProductRepositoryImpl.GROUP + '#' + tenantID;
    // const buildId = ProductRepositoryImpl.GROUP + '-' + product.id;

    const updateExpression =
      'SET #product_name = :name, image = :image, description = :description, price = :price, #product_status = :status, extraInfo = :extraInfo, inventory = :inventory';

    console.log('update => ', product.inventory);
    const expressionAttributeValues = {
      ':name': product.name,
      ':price': Number(product.price),
      ':image': product.image || '',
      ':description': product.description || '',
      ':status': product.status,
      ':extraInfo': product.extraInfo
        ? JSON.stringify(product.extraInfo)
        : { NULL: true },
      ':inventory': product.inventory ? Number(product.inventory) : 'undefined',
    };

    const expressionAttributeNames = {
      '#product_name': 'name', // Alias para el atributo "name"
      '#product_status': 'status', // Alias para el atributo "status"
    };

    const params = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        pid: generateTenant,
        sid: id,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });

    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getProductCategories(
    tenantID: string,
  ): Promise<ProductModelData[] | null> {
    const generateTenant = ProductRepositoryImpl.GROUP + '#' + tenantID;
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: 'pid = :pid',
      ExpressionAttributeValues: {
        ':pid': {
          S: generateTenant,
        },
      },
    };
    const resulTwo = await this.fullClientDynamodb.fullClient.query(params);
    const result = await ProductRepositoryImpl.appService.getAllData(
      params,
      resulTwo,
      [],
    );

    return transformData(result);
  }

  async putProductStatus(
    productID: string,
    status: string,
    tenantID: string,
  ): Promise<any> {
    const generateTenant = ProductRepositoryImpl.GROUP + '#' + tenantID;
    // const buildId = ProductRepositoryImpl.GROUP + '-' + productID;

    const updateExpression = 'SET #product_status = :status';
    const expressionAttributeValues = {
      ':status': status,
    };
    const expressionAttributeNames = {
      '#product_status': 'status',
    };

    const params = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        pid: generateTenant,
        sid: productID,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });

    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return { message: 'Product status updated successfull' };
    } catch (error) {
      throw error;
    }
  }

  async putProductInventory(
    productID: string,
    quantity: number,
    tenantID: string,
    isSum?: string,
  ): Promise<any> {
    const generateTenant = ProductRepositoryImpl.GROUP + '#' + tenantID;
    // const buildId = ProductRepositoryImpl.GROUP + '-' + productID;
    const updateOperator = isSum === 'true' ? '+' : '-';

    const params = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        pid: generateTenant,
        sid: productID,
      },
      UpdateExpression: `SET #inventory = #inventory ${updateOperator} :quantity`,
      ExpressionAttributeNames: {
        '#inventory': 'inventory',
      },
      ExpressionAttributeValues: {
        ':quantity': quantity,
      },
      ReturnValues: 'ALL_NEW',
    });

    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return { message: 'Product inventory updated successfull' };
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: string, tenantID: string): Promise<any> {
    const generateTenant = ProductRepositoryImpl.GROUP + '#' + tenantID;
    const params = {
      TableName: TABLE_NAME,
      Key: {
        pid: { S: generateTenant },
        sid: { S: id },
      },
    };
    try {
      const blogDelete = await this.fullClientDynamodb.fullClient.deleteItem(
        params,
      );
      if (blogDelete.ConsumedCapacity) {
        return { message: 'Product not found' };
      } else {
        return { message: 'Product deleted success' };
      }
    } catch (error) {
      throw new NotFoundException('Product to delete not found');
    }
  }

  private createNewItemFromDomainModel(
    c: ProductModel,
    tenantID: string,
    buildSid: string,
  ) {
    const currentDate = moment().subtract(5, 'hours');

    let item: any = {
      sid: { S: c.sid ? c.sid : buildSid },
      createdAt: { S: c.createdAt ? c.createdAt : currentDate.toISOString() },
      name: { S: c.name },
      price: { N: c.price },
      status: { S: c.status },
      image: { S: c.image },
      description: { S: c.description },
      inventory: { N: c.inventory },
    };
    if (c.extraInfo !== undefined) {
      item.extraInfo = { S: JSON.stringify(c.extraInfo) };
    }
    const generateTenant = ProductRepositoryImpl.GROUP + '#' + tenantID;
    item = { ...item, pid: { S: generateTenant } };
    return item;
  }
}
