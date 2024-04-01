import { Inject, Injectable } from '@nestjs/common';
import { CustomerGateway } from 'src/client/rest/customer.gateway';
import { CustomerRepository } from 'src/client/data/customer.repository';
import { CustomerEnum } from 'src/infrastructure/model/customer/customer.enum';
import { CustomerModel } from 'src/client/data/customer.model';
import { CustomerModelData } from 'src/infrastructure/model/customer/customer.model.data';
import getCookies from 'src/common/interceptors/getCookies/cookies';

export interface resultPaginationCustomer {
  data: CustomerModel[];
  totalPage: number;
}

@Injectable()
export class CustomerAdapter extends CustomerGateway {
  constructor(
    @Inject('CustomerRepository')
    private customerRepository: CustomerRepository,
  ) {
    super();
  }

  public async createCustomer(client: CustomerModel): Promise<CustomerModel> {
    try {
      const storeClient = await this.customerRepository.createCustomer(
        this.mapToData(client, CustomerEnum.NEW),
      );
      return this.mapToDomain(storeClient);
    } catch (error) {
      throw new Error('Error to save client in db or Customer already exist');
    }
  }

  public async getAllCustomerByID(
    id: string,
    tenantID: string,
  ): Promise<CustomerModel[]> {
    try {
      const storeClients = await this.customerRepository.getAllCustomerByID(
        id,
        tenantID,
      );

      if (storeClients) {
        return storeClients.map(this.mapToDomain);
      } else {
        return []; // Devolver un arreglo vacío si no se encontraron clientes
      }
    } catch (error) {
      console.error('Error getting clients from db:', error);
      throw new Error('Error to get clients in db.');
    }
  }

  public async getAllCustomers(tenantID: string): Promise<CustomerModel[]> {
    try {
      const storeClients = await this.customerRepository.getAllCustomers(
        tenantID,
      );

      if (storeClients) {
        return storeClients.map(this.mapToDomain);
      } else {
        return []; // Devolver un arreglo vacío si no se encontraron clientes
      }
    } catch (error) {
      console.error('Error getting clients from db:', error);
      throw new Error('Error to get clients in db.');
    }
  }

  public async fetchResultsWithPagination(
    request: Request,
    pageNumber: number,
    pageSize: number,
  ): Promise<resultPaginationCustomer> {
    const tokenRequest = request.headers ?? request.headers;
    const tenant = getCookies(tokenRequest);
    const Customers: any =
      await this.customerRepository.fetchResultsWithPagination(
        tenant,
        pageNumber,
        pageSize,
      );
    let countNonEmptyItems = 1;

    const itemsPromises = Customers.results.map(async (result: any) => {
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

  public async putCustomer(client: any, tenantID: string): Promise<any> {
    try {
      const storeClient = await this.customerRepository.putCustomer(
        this.mapToData(client, CustomerEnum.NEW),
        tenantID,
        client.id,
      );
      return this.mapToDomain(storeClient);
    } catch (error) {
      console.log('Error to update client.');
      throw new Error(error);
    }
  }

  public async deleteCustomer(id: string, tenantID: string): Promise<void> {
    try {
      const storeCustomer = await this.customerRepository.deleteCustomer(
        id,
        tenantID,
      );
      return storeCustomer;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  public async saveDataToDynamoDB(data: any, tenantID: string): Promise<any> {
    try {
      const uploadProducts = await this.customerRepository.saveDataToDynamoDB(
        data,
        tenantID,
      );
      return uploadProducts;
    } catch (error) {
      throw new Error('Error to upload products in db.');
    }
  }

  private mapToData(
    customer: CustomerModel,
    behavior: CustomerEnum,
  ): CustomerModelData {
    const customerData = new CustomerModelData(
      customer.tenantID,
      customer.sid,
      customer.name,
      customer.last_name,
      customer.email,
      customer.phone,
      customer.city,
      customer.address,
      customer.createdAt,
      customer.extraInfo,
    );
    if (behavior === CustomerEnum.UPDATE) customerData.sid = customer.sid;
    customerData.extraInfo = customerData.extraInfo;
    return customerData;
  }

  private mapToDomain(customerData: CustomerModelData): CustomerModel {
    return CustomerModel.builder()
      .TENANTID(customerData.tenantID)
      .SID(customerData.sid)
      .NAME(customerData.name)
      .LAST_NAME(customerData.last_name)
      .EMAIL(customerData.email)
      .PHONE(customerData.phone)
      .CITY(customerData.city)
      .ADDRESS(customerData.address)
      .CREATEDAT(customerData.createdAt)
      .EXTRAINFO(customerData.extraInfo)
      .build();
  }
}
