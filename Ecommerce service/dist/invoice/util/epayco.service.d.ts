import { InvoiceModel } from '../data/invoice.model';
import { UpdateProductInventory } from './update-invenory';
import { InvoiceGateway } from '../rest/invoice.gateway';
import { CreateCustomerFromInvoice } from 'src/client/util/createCustomerFromInvoice';
export declare class EpaycoService {
    private invoiceGateway;
    private updateProductInventory;
    private createCustomer;
    constructor(invoiceGateway: InvoiceGateway, updateProductInventory: UpdateProductInventory, createCustomer: CreateCustomerFromInvoice);
    epaycoResponse(invoiceDto: InvoiceModel, tenantID: string, reference: string, request: Request): Promise<string>;
}
