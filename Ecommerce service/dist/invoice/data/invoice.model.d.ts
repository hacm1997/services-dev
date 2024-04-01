import { CustomerInterface } from './customer.interface';
import { ProductInterface } from './product.interface';
import { ShippingInterface } from './shipping.interface';
export declare class InvoiceModel {
    tenantID: string;
    invoice_code?: string;
    reference: string;
    createdAt: string;
    customer: CustomerInterface;
    products: ProductInterface[];
    shipping: ShippingInterface;
    iva: number;
    total: number;
    payment_method: string;
    status: string;
    extraInfo?: any;
    constructor(tenantID?: string, invoice_code?: string, reference?: string, createdAt?: string, customer?: CustomerInterface, products?: ProductInterface[], shipping?: ShippingInterface, iva?: number, total?: number, payment_method?: string, status?: string, extraInfo?: any);
    setExtraInfo(extraInfo: any): void;
    static builder(): InvoiceModelBuilder;
}
export declare class InvoiceModelBuilder extends InvoiceModel {
    TENANTID(tenantID: string): InvoiceModelBuilder;
    INVOICE_CODE(invoice_code: string): InvoiceModelBuilder;
    REFERENCE(reference: string): InvoiceModelBuilder;
    CREATEDAT(createdAt: string): InvoiceModelBuilder;
    CUSTOMER(customer: CustomerInterface): InvoiceModelBuilder;
    PRODUCTS(products: ProductInterface[]): InvoiceModelBuilder;
    SHIPPING(shipping: ShippingInterface): InvoiceModelBuilder;
    IVA(iva: number): InvoiceModelBuilder;
    TOTAL(total: number): InvoiceModelBuilder;
    PAYMENT_METHOD(payment_method: string): InvoiceModelBuilder;
    STATUS(status: string): InvoiceModelBuilder;
    EXTRAINFO(extraInfo: any): InvoiceModelBuilder;
    build(): InvoiceModel;
}
