import { InvoiceGateway } from '../rest/invoice.gateway';
import { UpdateProductInventory } from './update-invenory';
import { CreateCustomerFromInvoice } from 'src/client/util/createCustomerFromInvoice';
import { InvoiceModel } from '../data/invoice.model';
export declare class WompiService {
    private invoiceGateway;
    private updateProductInventory;
    private createCustomer;
    constructor(invoiceGateway: InvoiceGateway, updateProductInventory: UpdateProductInventory, createCustomer: CreateCustomerFromInvoice);
    generteUniqueCode(): Promise<string>;
    encodeSignature(datos: string): Promise<string>;
    generateSignature(currency: string, price: number | string, w_integrity: string): Promise<any>;
    wompiResponse(invoiceDto: InvoiceModel, tenantID: string, referenceID: string, request: Request): Promise<string>;
}
