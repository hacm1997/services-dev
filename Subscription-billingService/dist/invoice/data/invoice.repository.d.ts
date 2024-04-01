import { ClientDynamodb } from "src/infrastructure/dynamodb/client.dynamodb";
import { InvoiceModel } from "./invoice.model";
export declare class InvoiceRepository {
    private fullClientDynamodb;
    static GROUP: string;
    constructor(fullClientDynamodb: ClientDynamodb);
    createInvoice(invoice: InvoiceModel, tenant: string): Promise<InvoiceModel>;
    updateInvoice(invoiceCode: string, invoiceId: string, tenant: string, invoiceData: any): Promise<{
        message: string;
    }>;
    private createNewItemFromDomainModel;
    deleteInvoice(InvoiceId: string, tenant: string): Promise<any>;
    private mapToDomain;
}
