import { Inject, Injectable } from '@nestjs/common';
import getCookies from 'src/common/interceptors/getCookies/cookies';
import { InvoiceEnum } from 'src/infrastructure/model/invoice/invoice.enum';
import { InvoiceModelData } from 'src/infrastructure/model/invoice/invoice.model.data';
import { InvoiceModel } from 'src/invoice/data/invoice.model';
import { InvoiceRepository } from 'src/invoice/data/invoice.repository';
import { InvoiceGateway } from 'src/invoice/rest/invoice.gateway';

export interface resultPaginationInvoice {
  data: InvoiceModel[];
  totalPage: number;
}

@Injectable()
export class InvoiceAdapter extends InvoiceGateway {
  constructor(
    @Inject('InvoiceRepository') private invoiceRepository: InvoiceRepository,
  ) {
    super();
  }

  public async createInvoice(invoice: InvoiceModel): Promise<InvoiceModel> {
    try {
      const storeInvoice = await this.invoiceRepository.createInvoice(
        this.mapToData(invoice, InvoiceEnum.NEW),
      );
      return this.mapToDomain(storeInvoice);
    } catch (error) {
      console.log(error);
      throw new Error('Error to save invoice in db.');
    }
  }

  public async getAllInvoices(tenantID: string): Promise<InvoiceModel[]> {
    try {
      const storeInvoices = await this.invoiceRepository.getAllInvoices(
        tenantID,
      );

      if (storeInvoices) {
        return storeInvoices.map(this.mapToDomain);
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error getting invoice from db:', error);
      throw new Error('Error to get invoice in db.');
    }
  }

  public async fetchResultsWithPagination(
    request: Request,
    pageNumber: number,
    pageSize: number,
  ): Promise<resultPaginationInvoice> {
    const tokenRequest = request.headers ?? request.headers;
    const tenant = getCookies(tokenRequest);
    const invoices: any =
      await this.invoiceRepository.fetchResultsWithPagination(
        tenant,
        pageNumber,
        pageSize,
      );
    let countNonEmptyItems = 1;

    const itemsPromises = invoices.results.map(async (result: any) => {
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

  public async getAllInvoiceById(
    code: string,
    tenantID: string,
  ): Promise<InvoiceModel[]> {
    try {
      const storeInvoice = await this.invoiceRepository.getAllInvoiceById(
        code,
        tenantID,
      );

      if (storeInvoice) {
        return storeInvoice.map(this.mapToDomain);
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error getting invoice from db:', error);
      throw new Error('Error to get invoice in db.');
    }
  }

  public async deleteInvoice(id: string, tenantID: string): Promise<void> {
    try {
      const storeInvoice = await this.invoiceRepository.deleteInvoice(
        id,
        tenantID,
      );
      return storeInvoice;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  public async putInvoiceStatus(
    invoiceID: string,
    status: string,
    tenantID: string,
  ): Promise<any> {
    try {
      const storeInvoice = await this.invoiceRepository.putInvoiceStatus(
        invoiceID,
        status,
        tenantID,
      );
      return storeInvoice;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  public async putInvoiceReference(
    invoiceID: string,
    reference: string,
    payment_method: string,
    tenantID: string,
  ): Promise<any> {
    try {
      const storeInvoice = await this.invoiceRepository.putInvoiceReference(
        invoiceID,
        reference,
        payment_method,
        tenantID,
      );
      return storeInvoice;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  private mapToData(
    invoice: InvoiceModel,
    behavior: InvoiceEnum,
  ): InvoiceModelData {
    const invoiceData = new InvoiceModelData(
      invoice.tenantID,
      invoice.invoice_code,
      invoice.reference,
      invoice.createdAt,
      invoice.customer,
      invoice.products,
      invoice.shipping,
      invoice.iva,
      invoice.total,
      invoice.payment_method,
      invoice.status,
    );
    if (behavior === InvoiceEnum.UPDATE)
      invoiceData.invoice_code = invoice.invoice_code;
    invoiceData.extraInfo = invoice.extraInfo;
    return invoiceData;
  }

  private mapToDomain(invoiceData: InvoiceModelData): InvoiceModel {
    return InvoiceModel.builder()
      .TENANTID(invoiceData.tenantID)
      .INVOICE_CODE(invoiceData.invoice_code)
      .REFERENCE(invoiceData.reference)
      .CREATEDAT(invoiceData.createdAt)
      .CUSTOMER(invoiceData.customer)
      .PRODUCTS(invoiceData.products)
      .SHIPPING(invoiceData.shipping)
      .IVA(invoiceData.iva)
      .TOTAL(invoiceData.total)
      .PAYMENT_METHOD(invoiceData.payment_method)
      .STATUS(invoiceData.status)
      .EXTRAINFO(invoiceData.extraInfo)
      .build();
  }
}
