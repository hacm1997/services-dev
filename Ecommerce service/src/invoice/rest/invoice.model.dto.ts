import { ApiProperty } from '@nestjs/swagger';
import { CustomerInterface } from '../data/customer.interface';
import { ProductInterface } from '../data/product.interface';
import { ShippingInterface } from '../data/shipping.interface';

export class InvoiceModelDTO {
  @ApiProperty({ type: String, example: 'TED-DTX131', required: true })
  tenantID: string;

  @ApiProperty({
    name: 'invoice_code',
    description: 'Invoice code',
    type: String,
    example: 'MTFT-31N4r123',
    required: false,
  })
  invoice_code: string;

  @ApiProperty({ type: String, example: '#sfs-ahb10-2120aj', required: true })
  reference: string;

  @ApiProperty({ type: String, example: '2023-10-30', required: false })
  createdAt: string;

  @ApiProperty({
    type: 'ClientInterface',
    example: {
      id: 1,
      name: 'juan',
      phone: 123456,
      email: 'example@gmail.com',
      address: 'dir #1',
    },
    required: true,
  })
  customer: CustomerInterface;

  @ApiProperty({
    type: 'ProductInterface',
    example: {
      id: 1,
      product_name: 'product 1',
      amount: 10,
      price: 50000,
    },
    required: true,
  })
  products: ProductInterface[];

  @ApiProperty({
    type: 'ShippingInterface',
    example: {
      shipping_code: 'hfdsm',
      city: 'city 1',
      phone: 5000,
      neighborhood: 'neighborhood address',
      postal_code: 11002,
    },
    required: true,
  })
  shipping: ShippingInterface;

  @ApiProperty({
    type: Number,
    example: 15,
    required: false,
  })
  iva: number;

  @ApiProperty({
    type: Number,
    example: 20000,
    required: true,
  })
  total: number;

  @ApiProperty({ type: String, example: 'TDC', required: false })
  payment_method: string;

  @ApiProperty({ type: String, example: 'pending', required: true })
  status: string;

  @ApiProperty({
    type: String,
    example: { des: 'extra info xd' },
    required: false,
  })
  extraInfo?: JSON;

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
  }

  public setExtraInfo(extraInfo: JSON) {
    this.extraInfo = extraInfo;
  }

  public static builder() {
    return new InvoiceModelDTOBuilder();
  }
}

export class InvoiceModelDTOBuilder extends InvoiceModelDTO {
  public TENANTID(tenantID: string): InvoiceModelDTOBuilder {
    this.tenantID = tenantID ?? undefined;
    return this;
  }
  public INVOICE_CODE(invoice_code: string): InvoiceModelDTOBuilder {
    this.invoice_code = invoice_code;
    return this;
  }
  public REFERENCE(reference: string): InvoiceModelDTOBuilder {
    this.reference = reference;
    return this;
  }
  public CREATEDAT(createdAt: string): InvoiceModelDTOBuilder {
    this.createdAt = createdAt;
    return this;
  }
  public CUSTOMER(customer: CustomerInterface): InvoiceModelDTOBuilder {
    this.customer = customer;
    return this;
  }
  public PRODUCTS(products: ProductInterface[]): InvoiceModelDTOBuilder {
    this.products = products;
    return this;
  }
  public SHIPPING(shipping: ShippingInterface): InvoiceModelDTOBuilder {
    this.shipping = shipping;
    return this;
  }
  public IVA(iva: number): InvoiceModelDTOBuilder {
    this.iva = iva;
    return this;
  }
  public TOTAL(total: number): InvoiceModelDTOBuilder {
    this.total = total;
    return this;
  }
  public PAYMENT_METHOD(payment_method: string): InvoiceModelDTOBuilder {
    this.payment_method = payment_method;
    return this;
  }
  public STATUS(status: string): InvoiceModelDTOBuilder {
    this.status = status;
    return this;
  }
  public EXTRAINFO(extraInfo: JSON): InvoiceModelDTOBuilder {
    if (extraInfo) this.extraInfo = extraInfo;
    return this;
  }

  public build(): InvoiceModelDTO {
    const invoiceDTO = new InvoiceModelDTO(
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
    );
    if (this.extraInfo) invoiceDTO.setExtraInfo(this.extraInfo);
    return invoiceDTO;
  }
}
