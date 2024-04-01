import { PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientDynamodb } from 'src/infrastructure/dynamodb/client';
import {
  CUSTOMER_GROUP,
  TABLE_CUSTOMER_NAME,
} from 'src/infrastructure/dynamodb/intializer/Constants';
import { CustomerModelData } from 'src/infrastructure/model/customer/customer.model.data';
import transformCustomerData from './transform-data';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { AppService } from 'src/app.service';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import generatorSID from 'src/product/util/idGenerator';
import { CustomerModel } from './customer.model';
import * as moment from 'moment';

interface PaginationResult {
  items: CustomerModelData[] | any;
  lastEvaluatedKey: DocumentClient.Key;
}

interface ExtendedPaginationResult {
  results: PaginationResult[];
  totalPages: number;
}

export interface CustomerRepository {
  createCustomer: (customer: CustomerModelData) => Promise<CustomerModelData>;
  getAllCustomerByID: (
    id: string,
    tenantID: string,
  ) => Promise<CustomerModelData[]>;
  getAllCustomers: (tenantID: string) => Promise<CustomerModelData[]>;
  putCustomer: (
    customer: CustomerModelData,
    tenantID: string,
    customerID?: string,
  ) => Promise<CustomerModelData>;
  fetchResultsWithPagination(
    getTenantId: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<any>;
  deleteCustomer: (id: string, tenantID: string) => Promise<any>;
  saveDataToDynamoDB: (data: any, tenantID: string) => Promise<any>;
}

@Injectable()
export class CustomerRepositoryImpl implements CustomerRepository {
  constructor(private fullClientDynamodb: ClientDynamodb) {}
  static GROUP = CUSTOMER_GROUP;
  static appService = new AppService();

  public async createCustomer(
    customer: CustomerModelData,
  ): Promise<CustomerModelData> {
    const userExistis = await this.getAllCustomerByID(
      customer['_sid'],
      customer.tenantID,
    );
    try {
      if (userExistis.length === 0) {
        const artifact: PutItemCommandInput = {
          TableName: TABLE_CUSTOMER_NAME,
          Item: customer.getItem() as any,
        };
        // console.log('artifact => ', artifact);
        console.log(`CUSTOMER TO CREATE ${JSON.stringify(artifact)}`);
        await this.fullClientDynamodb.fullClient.putItem(artifact);
        return customer;
      } else {
        // console.log('im hereee');
        await this.putCustomer(
          customer,
          customer.tenantID.replace(`${CustomerRepositoryImpl.GROUP}#`, ''),
        );
        return customer;
      }
    } catch (error) {
      throw new Error('The user already exist');
    }
  }

  public async getAllCustomerByID(
    id: string,
    tenantID: string,
  ): Promise<CustomerModelData[] | any> {
    let final_tenant = '';
    if (tenantID.includes(CustomerRepositoryImpl.GROUP)) {
      final_tenant = tenantID;
    } else {
      final_tenant = CustomerRepositoryImpl.GROUP + '#' + tenantID;
    }
    const params = {
      TableName: TABLE_CUSTOMER_NAME,
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
    const result = await CustomerRepositoryImpl.appService.getAllData(
      params,
      resulTwo,
      [],
    );
    return transformCustomerData(result);
  }

  public async getAllCustomers(
    tenantID: string,
  ): Promise<CustomerModelData[] | null> {
    const generateTenant = CustomerRepositoryImpl.GROUP + '#' + tenantID;
    const params = {
      TableName: TABLE_CUSTOMER_NAME,
      KeyConditionExpression: 'pid = :tenant',
      ExpressionAttributeValues: {
        ':tenant': {
          S: generateTenant,
        },
      },
    };

    const resulTwo = await this.fullClientDynamodb.fullClient.query(params);
    const result = await CustomerRepositoryImpl.appService.getAllData(
      params,
      resulTwo,
      [],
    );

    return transformCustomerData(result);
  }

  async getAllCustomersPerPage(
    tenantID: string,
    pageNumber: number,
    pageSize: number,
    lastEvaluatedKey?: DocumentClient.Key,
  ): Promise<PaginationResult> {
    const generateTenant = CustomerRepositoryImpl.GROUP + '#' + tenantID;
    const params: DocumentClient.QueryInput = {
      TableName: TABLE_CUSTOMER_NAME,
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
        items: transformCustomerData(filteredItems),
        lastEvaluatedKey: data.LastEvaluatedKey,
      };

      return result;
    } catch (error) {
      throw error;
    }
  }

  async fetchResultsWithPagination(
    tenant: string,
    pageNumber: number,
    pageSize: number,
    lastEvaluatedKey?: DocumentClient.Key,
    accumulatedResults: PaginationResult[] = [],
  ): Promise<ExtendedPaginationResult> {
    const result = await this.getAllCustomersPerPage(
      tenant,
      pageNumber,
      pageSize,
      lastEvaluatedKey,
    );

    lastEvaluatedKey = result.lastEvaluatedKey;

    accumulatedResults.push(result);

    if (lastEvaluatedKey) {
      pageNumber++;

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

  async putCustomer(
    customer: CustomerModelData | any,
    tenantID: string,
    customerID?: string,
  ): Promise<CustomerModelData> {
    const generateTenant = CustomerRepositoryImpl.GROUP + '#' + tenantID;
    // const buildId = CustomerRepositoryImpl.GROUP + '-' + customer.id;
    let updateExpression = '';
    let expressionAttributeValues = {};
    if (
      customer.extraInfo &&
      customer.extraInfo.S &&
      customer.extraInfo.S === '{}'
    ) {
      updateExpression =
        'SET #customer_name = :name, last_name = :last_name, email = :email, phone = :phone, city = :city, address = :address';
      expressionAttributeValues = {
        ':name': customer.name.S,
        ':last_name': customer.last_name.S,
        ':email': customer.email.S,
        ':phone': customer.phone.N || 0,
        ':city': customer.city.S,
        ':address': customer.address.S,
      };
    } else if (!customer.extraInfo) {
      updateExpression =
        'SET #customer_name = :name, last_name = :last_name, email = :email, phone = :phone, city = :city, address = :address';
      expressionAttributeValues = {
        ':name': customer.name,
        ':last_name': customer.last_name,
        ':email': customer.email,
        ':phone': customer.phone || 0,
        ':city': customer.city,
        ':address': customer.address,
      };
    } else {
      updateExpression =
        'SET #customer_name = :name, last_name = :last_name, email = :email, phone = :phone, city = :city, address = :address, extraInfo = :extraInfo';
      expressionAttributeValues = {
        ':name': customer.name,
        ':last_name': customer.last_name,
        ':email': customer.email,
        ':phone': customer.phone || 0,
        ':city': customer.city,
        ':address': customer.address,
        ':extraInfo': customer.extraInfo
          ? JSON.stringify(customer.extraInfo)
          : { NULL: true },
      };
    }
    const expressionAttributeNames = {
      '#customer_name': 'name',
    };

    if (customer.sid && customer.sid.S) {
      const params = new UpdateCommand({
        TableName: TABLE_CUSTOMER_NAME,
        Key: {
          pid: generateTenant,
          sid: customer.sid.S,
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      });
      try {
        await this.fullClientDynamodb.fullClient.send(params);
        return customer;
      } catch (error) {
        throw error;
      }
    } else {
      const params = new UpdateCommand({
        TableName: TABLE_CUSTOMER_NAME,
        Key: {
          pid: generateTenant,
          sid: customer.sid ? customer.sid : customerID,
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      });
      try {
        await this.fullClientDynamodb.fullClient.send(params);
        return customer;
      } catch (error) {
        throw error;
      }
    }
  }

  async deleteCustomer(id: string, tenantID: string): Promise<any> {
    const generateTenant = CustomerRepositoryImpl.GROUP + '#' + tenantID;
    const params = {
      TableName: TABLE_CUSTOMER_NAME,
      Key: {
        pid: { S: generateTenant },
        sid: { S: id },
      },
    };
    try {
      const customerDelete =
        await this.fullClientDynamodb.fullClient.deleteItem(params);
      if (customerDelete.ConsumedCapacity) {
        return { message: 'Customer not found' };
      } else {
        return { message: 'Customer deleted success' };
      }
    } catch (error) {
      throw new NotFoundException('Customer to delete not found');
    }
  }

  async saveDataToDynamoDB(data: CustomerModel[], tenantID: string) {
    for (const item of data) {
      const buildSid = generatorSID(CUSTOMER_GROUP);
      const items = this.createNewItemFromDomainModel(
        this.removeRowNum(item),
        tenantID,
        buildSid,
      );
      const putItemParams = {
        TableName: TABLE_CUSTOMER_NAME,
        Item: items,
      };
      await this.getAllCustomerByID(items.sid.S, tenantID)
        .then(async (res) => {
          if (res.length > 0) {
            const updateCustomer = await this.putCustomer(
              items,
              tenantID,
              items.sid,
            );
            return updateCustomer;
          } else {
            try {
              const save = await this.fullClientDynamodb.fullClient.putItem(
                putItemParams,
              );
              return save;
            } catch (error) {
              console.error('Error to save customers in DB: ', error);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  private removeRowNum(data): any {
    const { __rowNum__, ...cleanedData } = data;
    return cleanedData;
  }

  private createNewItemFromDomainModel(
    c: CustomerModel,
    tenantID: string,
    buildSid: string,
  ) {
    const currentDate = moment().subtract(5, 'hours');

    let item: any = {
      sid: { S: c.sid ? c.sid : buildSid },
      createdAt: { S: c.createdAt ? c.createdAt : currentDate.toISOString() },
      name: { S: c.name },
      last_name: { S: c.last_name },
      email: { S: c.email },
      phone: { N: c.phone },
      city: { S: c.city },
      address: { S: c.address },
    };
    if (c.extraInfo !== undefined) {
      item.extraInfo = { S: JSON.stringify(c.extraInfo) };
    }
    const generateTenant = CustomerRepositoryImpl.GROUP + '#' + tenantID;
    item = { ...item, pid: { S: generateTenant } };
    return item;
  }
}
