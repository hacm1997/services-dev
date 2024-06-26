import { CustomerInterface } from 'src/invoice/data/customer.interface';
import { ProductInterface } from 'src/invoice/data/product.interface';
import { InvoiceItem } from './invoice.item';
import { ShippingInterface } from 'src/invoice/data/shipping.interface';
export declare class InvoiceModelData {
    private _tenantID?;
    private _invoice_code?;
    private _reference;
    private _createdAt;
    private _customer;
    private _products;
    private _shipping;
    private _iva;
    private _total;
    private _payment_method;
    private _status;
    private _extraInfo?;
    constructor(tenantID: string, invoice_code: string, reference: string, createdAt: string, customer: CustomerInterface, products: ProductInterface[], shipping: ShippingInterface, iva: number, total: number, payment_method: string, status: string, extraInfo?: JSON);
    get tenantID(): string;
    get invoice_code(): string;
    get reference(): string;
    get createdAt(): string;
    get customer(): CustomerInterface;
    get products(): ProductInterface[];
    get shipping(): ShippingInterface;
    get iva(): number;
    get total(): number;
    get payment_method(): string;
    get status(): string;
    get extraInfo(): JSON;
    set tenantID(value: string);
    set invoice_code(value: string);
    set reference(value: string);
    set createdAt(value: string);
    set customer(value: CustomerInterface);
    set products(value: ProductInterface[]);
    set shipping(value: ShippingInterface);
    set iva(value: number);
    set total(value: number);
    set payment_method(value: string);
    set status(value: string);
    set extraInfo(value: JSON);
    getItem(): InvoiceItem;
}
