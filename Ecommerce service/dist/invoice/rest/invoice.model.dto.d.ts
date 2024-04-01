import { CustomerInterface } from '../data/customer.interface';
import { ProductInterface } from '../data/product.interface';
import { ShippingInterface } from '../data/shipping.interface';
export declare class InvoiceModelDTO {
    tenantID: string;
    invoice_code: string;
    reference: string;
    createdAt: string;
    customer: CustomerInterface;
    products: ProductInterface[];
    shipping: ShippingInterface;
    iva: number;
    total: number;
    payment_method: string;
    status: string;
    extraInfo?: JSON;
    constructor(tenantID?: string, invoice_code?: string, reference?: string, createdAt?: string, customer?: CustomerInterface, products?: ProductInterface[], shipping?: ShippingInterface, iva?: number, total?: number, payment_method?: string, status?: string);
    setExtraInfo(extraInfo: JSON): void;
    static builder(): InvoiceModelDTOBuilder;
}
export declare class InvoiceModelDTOBuilder extends InvoiceModelDTO {
    TENANTID(tenantID: string): InvoiceModelDTOBuilder;
    INVOICE_CODE(invoice_code: string): InvoiceModelDTOBuilder;
    REFERENCE(reference: string): InvoiceModelDTOBuilder;
    CREATEDAT(createdAt: string): InvoiceModelDTOBuilder;
    CUSTOMER(customer: CustomerInterface): InvoiceModelDTOBuilder;
    PRODUCTS(products: ProductInterface[]): InvoiceModelDTOBuilder;
    SHIPPING(shipping: ShippingInterface): InvoiceModelDTOBuilder;
    IVA(iva: number): InvoiceModelDTOBuilder;
    TOTAL(total: number): InvoiceModelDTOBuilder;
    PAYMENT_METHOD(payment_method: string): InvoiceModelDTOBuilder;
    STATUS(status: string): InvoiceModelDTOBuilder;
    EXTRAINFO(extraInfo: JSON): InvoiceModelDTOBuilder;
    build(): InvoiceModelDTO;
}
