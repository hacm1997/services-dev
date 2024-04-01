import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientDynamodb } from '../../infrastructure/dynamodb/client';
import { AttributeMap } from 'aws-sdk/clients/dynamodb';
import {
  INVOICE_GROUP,
  TABLE_INVOICE_NAME,
} from '../../infrastructure/dynamodb/intializer/Constants';
import { PutItemCommandInput } from '@aws-sdk/client-dynamodb/dist-types/commands';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { InvoiceModelData } from 'src/infrastructure/model/invoice/invoice.model.data';
import transformData from './transform-data';
import { AppService } from 'src/app.service';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

interface PaginationResult {
  items: InvoiceModelData[] | any;
  lastEvaluatedKey: DocumentClient.Key;
}

interface ExtendedPaginationResult {
  results: PaginationResult[];
  totalPages: number;
}

export interface InvoiceRepository {
  createInvoice: (invoice: InvoiceModelData) => Promise<InvoiceModelData>;
  getAllInvoices: (tenantID: string) => Promise<InvoiceModelData[] | null>;
  fetchResultsWithPagination(
    getTenantId: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<any>;
  getAllInvoiceById: (
    tenantID: string,
    code: string,
  ) => Promise<InvoiceModelData[]>;
  deleteInvoice: (id: string, tenantID: string) => Promise<any>;
  putInvoiceStatus: (
    invoiceID: string,
    status: string,
    tenantID: string,
  ) => Promise<any>;
  putInvoiceReference: (
    invoiceID: string,
    reference: string,
    payment_method: string,
    tenantID: string,
  ) => Promise<any>;
}
@Injectable()
export class InvoiceRepositoryImpl implements InvoiceRepository {
  constructor(private fullClientDynamodb: ClientDynamodb) {}
  static GROUP = INVOICE_GROUP;
  static appService = new AppService();

  public async createInvoice(
    invoice: InvoiceModelData,
  ): Promise<InvoiceModelData> {
    const artifact: PutItemCommandInput = {
      TableName: TABLE_INVOICE_NAME,
      Item: invoice.getItem() as any,
    };
    console.log(`ARTIFACT INVOICE TO CREATE ${JSON.stringify(artifact)}`);
    await this.fullClientDynamodb.fullClient.putItem(artifact);
    return invoice;
  }

  async getAllInvoices(tenantID: string): Promise<InvoiceModelData[] | null> {
    const generateTenant = InvoiceRepositoryImpl.GROUP + '#' + tenantID;
    const params = {
      TableName: TABLE_INVOICE_NAME,
      KeyConditionExpression: 'pid = :tenant',
      ExpressionAttributeValues: {
        ':tenant': {
          S: generateTenant,
        },
      },
    };

    const resulTwo = await this.fullClientDynamodb.fullClient.query(params);
    const result = await InvoiceRepositoryImpl.appService.getAllData(
      params,
      resulTwo,
      [],
    );

    return transformData(result);
  }

  async getAllInvoicesPerPage(
    tenantID: string,
    pageNumber: number,
    pageSize: number,
    lastEvaluatedKey?: DocumentClient.Key,
  ): Promise<PaginationResult> {
    const generateTenant = InvoiceRepositoryImpl.GROUP + '#' + tenantID;
    const params: DocumentClient.QueryInput = {
      TableName: TABLE_INVOICE_NAME,
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
        items: transformData(filteredItems),
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
    const result = await this.getAllInvoicesPerPage(
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

  async getAllInvoiceById(
    code: string,
    tenantID: string,
  ): Promise<InvoiceModelData[] | null> {
    // const buildCode = InvoiceRepositoryImpl.GROUP + '-' + code;
    let final_tenant = '';
    if (tenantID.includes(InvoiceRepositoryImpl.GROUP)) {
      final_tenant = tenantID;
    } else {
      final_tenant = InvoiceRepositoryImpl.GROUP + '#' + tenantID;
    }

    const params = {
      TableName: TABLE_INVOICE_NAME,
      KeyConditionExpression: 'pid = :tenant AND sid = :code',
      ExpressionAttributeValues: {
        ':tenant': {
          S: final_tenant,
        },
        ':code': {
          S: code,
        },
      },
    };

    const resulTwo = await this.fullClientDynamodb.fullClient.query(params);
    const appService = new AppService();
    const result = await appService.getAllData(params, resulTwo, []);

    return transformData(result);
  }

  async deleteInvoice(id: string, tenantID: string): Promise<any> {
    const generateTenant = InvoiceRepositoryImpl.GROUP + '#' + tenantID;
    const params = {
      TableName: TABLE_INVOICE_NAME,
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
        return { message: 'Invoice not found' };
      } else {
        return { message: 'Invoice deleted success' };
      }
    } catch (error) {
      throw new NotFoundException('Invoice to delete not found');
    }
  }

  async putInvoiceStatus(
    invoiceID: string,
    status: string,
    tenantID: string,
  ): Promise<any> {
    const generateTenant = InvoiceRepositoryImpl.GROUP + '#' + tenantID;

    const updateExpression = 'SET #product_status = :status';
    const expressionAttributeValues = {
      ':status': status,
    };
    const expressionAttributeNames = {
      '#product_status': 'status',
    };

    const params = new UpdateCommand({
      TableName: TABLE_INVOICE_NAME,
      Key: {
        pid: generateTenant,
        sid: invoiceID,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });

    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return { message: 'Invoice status updated successfull' };
    } catch (error) {
      throw error;
    }
  }

  async putInvoiceReference(
    invoiceID: string,
    reference: string,
    payment_method: string,
    tenantID: string,
  ): Promise<any> {
    const generateTenant = InvoiceRepositoryImpl.GROUP + '#' + tenantID;

    const getPaymentMethod = payment_method ? payment_method : '';

    const updateExpression =
      'SET #product_reference = :reference, #product_payment_method = :payment_method';
    const expressionAttributeValues = {
      ':reference': reference,
      ':payment_method': getPaymentMethod,
    };
    const expressionAttributeNames = {
      '#product_reference': 'reference',
      '#product_payment_method': 'payment_method',
    };

    const params = new UpdateCommand({
      TableName: TABLE_INVOICE_NAME,
      Key: {
        pid: generateTenant,
        sid: invoiceID,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    });

    try {
      await this.fullClientDynamodb.fullClient.send(params);
      return { message: 'Invoice reference updated successfull' };
    } catch (error) {
      throw error;
    }
  }
}
