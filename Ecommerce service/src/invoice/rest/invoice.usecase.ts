import { Injectable } from '@nestjs/common';
import { InvoiceGateway } from './invoice.gateway';
import { InvoiceModel } from '../data/invoice.model';
import { InvoiceModelDTO } from './invoice.model.dto';
import { BuildingInvoice } from '../service/buildingInvoice';
import getCookies from 'src/common/interceptors/getCookies/cookies';
import { INVOICE_GROUP } from 'src/infrastructure/dynamodb/intializer/Constants';
import { CronJobService } from '../util/cron.util';
import { PENDING_STATUS } from '../util/constans';
import * as moment from 'moment';
// import { CreateCustomerFromInvoice } from 'src/client/util/createCustomerFromInvoice';

@Injectable()
export class InvoiceUsecase {
  constructor(
    private invoiceGateway: InvoiceGateway,
    // private createCustomer: CreateCustomerFromInvoice,
    private cronJobService: CronJobService,
  ) {}

  public async createInvoice(
    invoiceDTO: InvoiceModelDTO,
    request: Request,
  ): Promise<InvoiceModelDTO> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const createdInvoice: InvoiceModel =
      await this.invoiceGateway.createInvoice(
        await this.mapDTOToDomain(invoiceDTO, getTenantId),
      );
    // const customerData = invoiceDTO.customer;
    // const productsData = invoiceDTO.products;
    // await this.createCustomer.saveCustomer(
    //   customerData,
    //   request,
    //   getTenantId,
    //   productsData,
    // );
    await this.cronJobService.startCronJob(
      createdInvoice,
      getTenantId,
      request,
    );
    return this.mapDomainToDTO(createdInvoice);
  }

  public async getAllInvoices(request: Request): Promise<InvoiceModelDTO[]> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const invoices: InvoiceModel[] = await this.invoiceGateway.getAllInvoices(
      getTenantId,
    );

    return invoices.map(this.mapDomainToDTO);
  }

  public async getInvoicesPerPage(
    request: Request,
    page: number,
    size: number,
  ): Promise<any> {
    const Invoices = await this.invoiceGateway.fetchResultsWithPagination(
      request,
      page,
      size,
    );
    const result = {
      data: Invoices.data.map(this.mapDomainToDTO),
      totalPage: Invoices.totalPage - 1,
    };

    return result;
  }

  public async getAllInvoiceById(
    request: Request,
    code: string,
  ): Promise<InvoiceModelDTO[]> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const invoices: InvoiceModel[] =
      await this.invoiceGateway.getAllInvoiceById(code, getTenantId);

    return invoices.map(this.mapDomainToDTO);
  }

  public async deleteInvoice(request: Request, id: string): Promise<any> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const deleteInvoice: any = await this.invoiceGateway.deleteInvoice(
      id,
      getTenantId,
    );
    return deleteInvoice;
  }

  public async putInvoiceStatus(
    invoiceID: string,
    status: string,
    request: Request,
  ): Promise<any> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    const putInvoiceStatus: any = await this.invoiceGateway.putInvoiceStatus(
      invoiceID,
      status,
      getTenantId,
    );
    return putInvoiceStatus;
  }

  public async putInvoiceReference(
    invoiceID: string,
    reference: string,
    payment_method: string,
    request: Request,
  ): Promise<any> {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);
    if (invoiceID !== 'undefined' && reference !== 'undefined') {
      const putInvoiceReference: any =
        await this.invoiceGateway.putInvoiceReference(
          invoiceID,
          reference,
          payment_method,
          getTenantId,
        );

      return putInvoiceReference;
    } else {
      return { message: 'Invoice and reference undefined' };
    }
  }

  private async mapDTOToDomain(
    invoiceDTO: InvoiceModelDTO,
    tenantID: string,
  ): Promise<InvoiceModel> {
    const bulidInvoice = new BuildingInvoice();
    const invoiceCode = bulidInvoice.generatorInvoiceCode(invoiceDTO.reference);
    const buildTenant = INVOICE_GROUP + '#' + tenantID;

    const currentDate = moment().subtract(5, 'hours');

    return InvoiceModel.builder()
      .TENANTID(buildTenant)
      .INVOICE_CODE(invoiceCode)
      .REFERENCE(invoiceDTO.reference)
      .CREATEDAT(currentDate.toISOString())
      .CUSTOMER(invoiceDTO.customer)
      .PRODUCTS(invoiceDTO.products)
      .SHIPPING(invoiceDTO.shipping)
      .IVA(invoiceDTO.iva)
      .TOTAL(invoiceDTO.total)
      .PAYMENT_METHOD(invoiceDTO.payment_method)
      .STATUS(PENDING_STATUS)
      .EXTRAINFO(invoiceDTO.extraInfo)
      .build();
  }
  private mapDomainToDTO(invoice: InvoiceModel): InvoiceModelDTO {
    return (
      InvoiceModelDTO.builder()
        //.TENANTID(invoice.tenantID)
        .INVOICE_CODE(invoice.invoice_code)
        .REFERENCE(invoice.reference)
        .CREATEDAT(invoice.createdAt)
        .CUSTOMER(invoice.customer)
        .PRODUCTS(invoice.products)
        .SHIPPING(invoice.shipping)
        .IVA(invoice.iva)
        .TOTAL(invoice.total)
        .PAYMENT_METHOD(invoice.payment_method)
        .STATUS(invoice.status)
        .EXTRAINFO(invoice.extraInfo)
        .build()
    );
  }
}
