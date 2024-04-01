import { DynamoDB } from 'aws-sdk';
import { InvoiceModel } from '../data/invoice.model';

export abstract class InvoiceGateway {
  abstract createInvoice(invoice: InvoiceModel): Promise<InvoiceModel>;
  abstract getAllInvoices(tenantID: string): Promise<InvoiceModel[]>;
  abstract fetchResultsWithPagination(
    request: Request,
    pageNumber: number,
    pageSize: number,
  ): Promise<any>;
  abstract getAllInvoiceById(
    code: string,
    tenantID: string,
  ): Promise<InvoiceModel[]>;
  abstract deleteInvoice(tenantID: string, id: string): Promise<any>;
  abstract putInvoiceStatus(
    invoiceID: string,
    status: string,
    tenantID: string,
  ): Promise<any>;
  abstract putInvoiceReference(
    invoiceID: string,
    reference: string,
    payment_method: string,
    tenantID: string,
  ): Promise<any>;
}
