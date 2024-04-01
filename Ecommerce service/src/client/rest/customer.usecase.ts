import { Injectable } from '@nestjs/common';
import { CustomerGateway } from './customer.gateway';
import { CustomerModelDTO } from './customer.model.dto';
import { CustomerModel } from '../data/customer.model';
import * as moment from 'moment';
import getCookies from 'src/common/interceptors/getCookies/cookies';
import { CUSTOMER_GROUP } from 'src/infrastructure/dynamodb/intializer/Constants';
import generatorSID from 'src/product/util/idGenerator';
import { CustomerInterface } from '../util/customer.interfaces';
import { Response } from 'express';
import {
  exportCustomersFunction,
  importCustomersFunction,
} from '../util/customerImportExport';

@Injectable()
export class CustomerUsecase {
  constructor(private customerGateway: CustomerGateway) {}

  public async createCustomer(
    customerDTO: CustomerModelDTO,
    request: Request,
  ): Promise<CustomerModelDTO> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const createdCustomer: CustomerModel =
      await this.customerGateway.createCustomer(
        this.mapDTOToDomain(customerDTO, getTenantId),
      );
    return this.mapDomainToDTO(createdCustomer);
  }

  public async getAllCustomerByID(
    id: string,
    request: Request,
  ): Promise<CustomerModelDTO[]> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const customer: CustomerModel[] =
      await this.customerGateway.getAllCustomerByID(id, getTenantId);

    return customer.map(this.mapDomainToDTO);
  }
  public async getAllCustomers(
    request: Request,
    page: number,
    size: number,
  ): Promise<any> {
    const customer = await this.customerGateway.fetchResultsWithPagination(
      request,
      page,
      size,
    );

    const result = {
      data: customer.data.map(this.mapDomainToDTO),
      totalPage: customer.totalPage - 1,
    };

    return result;
  }

  public async getAllCustomerFilter(
    request: Request,
  ): Promise<CustomerModelDTO[]> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const customers: CustomerModel[] =
      await this.customerGateway.getAllCustomers(getTenantId);

    return customers.map(this.mapDomainToDTO);
  }

  public async putCustomer(
    customerDTO: CustomerModelDTO,
    request: Request,
  ): Promise<CustomerModelDTO> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const putCustomer: CustomerModel = await this.customerGateway.putCustomer(
      customerDTO,
      getTenantId,
    );
    return this.mapDomainToDTO(putCustomer);
  }

  public async deleteCustomer(request: Request, id: string): Promise<any> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const deleteCustomer: any = await this.customerGateway.deleteCustomer(
      id,
      getTenantId,
    );
    return deleteCustomer;
  }

  public async importCustomers(file: any, request: Request) {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);

    try {
      const data = await importCustomersFunction(file);
      try {
        await this.customerGateway.saveDataToDynamoDB(data, getTenantId);
        return { message: 'Import customers successful' };
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      return { message: 'Failed to import customers' };
    }
  }

  public async exportCustomers(request: Request, response: Response) {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const customers: CustomerModel[] =
      await this.customerGateway.getAllCustomers(getTenantId);

    const allCustomers: CustomerInterface[] = customers.map(
      this.mapDomainToDTO,
    );
    try {
      await exportCustomersFunction(response, allCustomers, getTenantId);
      return { message: 'Export of customers successful' };
    } catch (error) {
      console.log(error.message);
      return { message: 'Failed export of customers' };
    }
  }

  private mapDTOToDomain(
    customerDTO: CustomerModelDTO,
    tenantID: string,
  ): CustomerModel {
    const buildSid = generatorSID(CUSTOMER_GROUP);
    const currentDate = moment().subtract(5, 'hours');
    return CustomerModel.builder()
      .TENANTID(CUSTOMER_GROUP + '#' + tenantID)
      .SID(customerDTO.id ? customerDTO.id : buildSid)
      .NAME(customerDTO.name)
      .LAST_NAME(customerDTO.last_name)
      .EMAIL(customerDTO.email)
      .PHONE(customerDTO.phone)
      .CITY(customerDTO.city)
      .ADDRESS(customerDTO.address)
      .CREATEDAT(currentDate.toISOString())
      .EXTRAINFO(customerDTO.extraInfo)
      .build();
  }

  private mapDomainToDTO(customer: CustomerModel): CustomerModelDTO {
    return (
      CustomerModelDTO.builder()
        .ID(customer.sid)
        //.TENANTID(customer.tenantID)
        .NAME(customer.name)
        .LAST_NAME(customer.last_name)
        .EMAIL(customer.email)
        .PHONE(customer.phone)
        .CITY(customer.city)
        .ADDRESS(customer.address)
        .CREATEDAT(customer.createdAt)
        .EXTRAINFO(customer.extraInfo)
        .build()
    );
  }
}
