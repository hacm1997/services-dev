import { CustomerInterface } from './customer.interface';
import { ProductInterface } from './product.interface';
import { ShippingInterface } from './shipping.interface';

export class InvoiceModel {
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

  constructor(
    tenantID?: string,
    invoice_code?: string,
    reference?: string,
    createdAt?: string,
    customer?: CustomerInterface,
    products?: ProductInterface[],
    shipping?: ShippingInterface,
    iva?: number,
    total?: number,
    payment_method?: string,
    status?: string,
    extraInfo?: any,
  ) {
    this.tenantID = tenantID;
    this.invoice_code = invoice_code;
    this.reference = reference;
    this.createdAt = createdAt;
    this.customer = customer;
    this.products = products;
    this.shipping = shipping;
    this.iva = iva;
    this.total = total;
    this.payment_method = payment_method;
    this.status = status;
    this.extraInfo = extraInfo;
  }

  public setExtraInfo(extraInfo: any) {
    this.extraInfo = extraInfo;
  }

  public static builder() {
    return new InvoiceModelBuilder();
  }
}

export class InvoiceModelBuilder extends InvoiceModel {
  public TENANTID(tenantID: string): InvoiceModelBuilder {
    this.tenantID = tenantID ?? undefined;
    return this;
  }
  public INVOICE_CODE(invoice_code: string): InvoiceModelBuilder {
    this.invoice_code = invoice_code;
    return this;
  }
  public REFERENCE(reference: string): InvoiceModelBuilder {
    this.reference = reference;
    return this;
  }
  public CREATEDAT(createdAt: string): InvoiceModelBuilder {
    this.createdAt = createdAt;
    return this;
  }
  public CUSTOMER(customer: CustomerInterface): InvoiceModelBuilder {
    this.customer = customer;
    return this;
  }
  public PRODUCTS(products: ProductInterface[]): InvoiceModelBuilder {
    this.products = products;
    return this;
  }
  public SHIPPING(shipping: ShippingInterface): InvoiceModelBuilder {
    this.shipping = shipping;
    return this;
  }
  public IVA(iva: number): InvoiceModelBuilder {
    this.iva = iva;
    return this;
  }
  public TOTAL(total: number): InvoiceModelBuilder {
    this.total = total;
    return this;
  }
  public PAYMENT_METHOD(payment_method: string): InvoiceModelBuilder {
    this.payment_method = payment_method;
    return this;
  }
  public STATUS(status: string): InvoiceModelBuilder {
    this.status = status;
    return this;
  }
  public EXTRAINFO(extraInfo: any): InvoiceModelBuilder {
    if (extraInfo) this.extraInfo = extraInfo;
    return this;
  }

  public build(): InvoiceModel {
    const invoiceDTO = new InvoiceModel(
      this.tenantID,
      this.invoice_code,
      this.reference,
      this.createdAt,
      this.customer,
      this.products,
      this.shipping,
      this.iva,
      this.total,
      this.payment_method,
      this.status,
      this.extraInfo,
    );
    if (this.extraInfo) invoiceDTO.setExtraInfo(this.extraInfo);
    console.log(`BUILDER INVOICE MODEL: ${JSON.stringify(invoiceDTO)}`);
    return invoiceDTO;
  }
}
