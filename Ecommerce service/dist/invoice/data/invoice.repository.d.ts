import { ClientDynamodb } from '../../infrastructure/dynamodb/client';
import { InvoiceModelData } from 'src/infrastructure/model/invoice/invoice.model.data';
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
    fetchResultsWithPagination(getTenantId: string, pageNumber: number, pageSize: number): Promise<any>;
    getAllInvoiceById: (tenantID: string, code: string) => Promise<InvoiceModelData[]>;
    deleteInvoice: (id: string, tenantID: string) => Promise<any>;
    putInvoiceStatus: (invoiceID: string, status: string, tenantID: string) => Promise<any>;
    putInvoiceReference: (invoiceID: string, reference: string, payment_method: string, tenantID: string) => Promise<any>;
}
export declare class InvoiceRepositoryImpl implements InvoiceRepository {
    private fullClientDynamodb;
    constructor(fullClientDynamodb: ClientDynamodb);
    static GROUP: string;
    static appService: AppService;
    createInvoice(invoice: InvoiceModelData): Promise<InvoiceModelData>;
    getAllInvoices(tenantID: string): Promise<InvoiceModelData[] | null>;
    getAllInvoicesPerPage(tenantID: string, pageNumber: number, pageSize: number, lastEvaluatedKey?: DocumentClient.Key): Promise<PaginationResult>;
    fetchResultsWithPagination(tenant: string, pageNumber: number, pageSize: number, lastEvaluatedKey?: DocumentClient.Key, accumulatedResults?: PaginationResult[]): Promise<ExtendedPaginationResult>;
    getAllInvoiceById(code: string, tenantID: string): Promise<InvoiceModelData[] | null>;
    deleteInvoice(id: string, tenantID: string): Promise<any>;
    putInvoiceStatus(invoiceID: string, status: string, tenantID: string): Promise<any>;
    putInvoiceReference(invoiceID: string, reference: string, payment_method: string, tenantID: string): Promise<any>;
}
export {};
