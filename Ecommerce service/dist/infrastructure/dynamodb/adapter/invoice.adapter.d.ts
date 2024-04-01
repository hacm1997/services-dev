import { InvoiceModel } from 'src/invoice/data/invoice.model';
import { InvoiceRepository } from 'src/invoice/data/invoice.repository';
import { InvoiceGateway } from 'src/invoice/rest/invoice.gateway';
export interface resultPaginationInvoice {
    data: InvoiceModel[];
    totalPage: number;
}
export declare class InvoiceAdapter extends InvoiceGateway {
    private invoiceRepository;
    constructor(invoiceRepository: InvoiceRepository);
    createInvoice(invoice: InvoiceModel): Promise<InvoiceModel>;
    getAllInvoices(tenantID: string): Promise<InvoiceModel[]>;
    fetchResultsWithPagination(request: Request, pageNumber: number, pageSize: number): Promise<resultPaginationInvoice>;
    getAllInvoiceById(code: string, tenantID: string): Promise<InvoiceModel[]>;
    deleteInvoice(id: string, tenantID: string): Promise<void>;
    putInvoiceStatus(invoiceID: string, status: string, tenantID: string): Promise<any>;
    putInvoiceReference(invoiceID: string, reference: string, payment_method: string, tenantID: string): Promise<any>;
    private mapToData;
    private mapToDomain;
}
