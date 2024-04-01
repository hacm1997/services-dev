/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { CustomerInterface } from 'src/invoice/data/customer.interface';
import { ProductInterface } from 'src/invoice/data/product.interface';
import { InvoiceItem } from './invoice.item';
import { ShippingInterface } from 'src/invoice/data/shipping.interface';

export class InvoiceModelData {
  private _tenantID?: string;
  private _invoice_code?: string;
  private _reference: string;
  private _createdAt: string;
  private _customer: CustomerInterface;
  private _products: ProductInterface[];
  private _shipping: ShippingInterface;
  private _iva: number;
  private _total: number;
  private _payment_method: string;
  private _status: string;
  private _extraInfo?: any;

  constructor(
    tenantID: string,
    invoice_code: string,
    reference: string,
    createdAt: string,
    customer: CustomerInterface,
    products: ProductInterface[],
    shipping: ShippingInterface,
    iva: number,
    total: number,
    payment_method: string,
    status: string,
    extraInfo?: JSON,
  ) {
    this._tenantID = tenantID;
    this._invoice_code = invoice_code;
    this._reference = reference;
    this._createdAt = createdAt;
    this._customer = customer;
    this._products = products;
    this._shipping = shipping;
    this._iva = iva;
    this._total = total;
    this._payment_method = payment_method;
    this._status = status;
    this._extraInfo = extraInfo;
  }

  //Getters
  get tenantID(): string {
    return this._tenantID;
  }
  get invoice_code(): string {
    return this._invoice_code;
  }
  get reference(): string {
    return this._reference;
  }
  get createdAt(): string {
    return this._createdAt;
  }
  get customer(): CustomerInterface {
    return this._customer;
  }
  get products(): ProductInterface[] {
    return this._products;
  }
  get shipping(): ShippingInterface {
    return this._shipping;
  }
  get iva(): number {
    return this._iva;
  }
  get total(): number {
    return this._total;
  }
  get payment_method(): string {
    return this._payment_method;
  }
  get status(): string {
    return this._status;
  }
  get extraInfo(): JSON {
    return this._extraInfo;
  }

  //Setters
  set tenantID(value: string) {
    this._tenantID = value;
  }
  set invoice_code(value: string) {
    this._invoice_code = value;
  }
  set reference(value: string) {
    this._reference = value;
  }
  set createdAt(value: string) {
    this._createdAt = value;
  }
  set customer(value: CustomerInterface) {
    this._customer = value;
  }
  set products(value: ProductInterface[]) {
    this._products = value;
  }
  set shipping(value: ShippingInterface) {
    this._shipping = value;
  }
  set iva(value: number) {
    this._iva = value;
  }
  set total(value: number) {
    this._total = value;
  }
  set payment_method(value: string) {
    this._payment_method = value;
  }
  set status(value: string) {
    this._status = value;
  }
  set extraInfo(value: JSON) {
    this._extraInfo = value;
  }

  getItem(): InvoiceItem {
    const item: InvoiceItem = {
      pid: { S: this._tenantID },
      sid: { S: this._invoice_code },
      reference: { S: this._reference },
      createdAt: { S: this._createdAt },
      customer: { S: JSON.stringify(this._customer) },
      products: { S: JSON.stringify(this._products) },
      shipping: { S: JSON.stringify(this._shipping) },
      iva: { N: this._iva },
      total: { N: this._total },
      payment_method: { S: this._payment_method },
      status: { S: this._status },
      extraInfo: { S: JSON.stringify(this._extraInfo) ?? '' },
    };
    return item;
  }
}
