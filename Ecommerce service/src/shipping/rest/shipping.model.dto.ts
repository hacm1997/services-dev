import { ApiProperty } from '@nestjs/swagger';

export class ShippingModelDTO {
  @ApiProperty({ type: String, example: 'TED-DTX131', required: true })
  tenantID: string;

  @ApiProperty({
    name: 'code',
    description: 'Shipping code',
    type: String,
    example: 'USR-31N4r123',
    required: true,
  })
  code: string;

  @ApiProperty({ type: String, example: 'sdsds-dfds-sdfds', required: true })
  shipping_code: string;

  @ApiProperty({
    type: String,
    example: 'Cartagena',
    required: true,
  })
  city: string;

  @ApiProperty({
    type: String,
    example: 'Neighborhood address',
    required: false,
  })
  neighborhood?: string;

  @ApiProperty({ type: Number, example: 110005, required: false })
  postal_code: number;

  @ApiProperty({
    type: Number,
    example: 25000,
    required: true,
  })
  price: number;

  @ApiProperty({
    type: String,
    example: { des: 'extra info xd' },
    required: false,
  })
  extraInfo?: JSON;

  constructor(
    tenantID?: string,
    shipping_code?: string,
    city?: string,
    price?: number,
  ) {
    this.tenantID = tenantID;
    this.shipping_code = shipping_code;
    this.city = city;
    this.price = price;
  }

  public setNeighborhood(neighborhood: string) {
    this.neighborhood = neighborhood;
  }
  public setPostalCode(postal_code: number) {
    this.postal_code = postal_code;
  }
  public setExtraInfo(extraInfo: JSON) {
    this.extraInfo = extraInfo;
  }

  public static builder() {
    return new ShippingModelDTOBuilder();
  }
}

export class ShippingModelDTOBuilder extends ShippingModelDTO {
  public TENANTID(tenantID: string): ShippingModelDTOBuilder {
    this.tenantID = tenantID ?? undefined;
    return this;
  }
  public SHIPPING_CODE(shipping_code: string): ShippingModelDTOBuilder {
    this.shipping_code = shipping_code;
    return this;
  }
  public CITY(city: string): ShippingModelDTOBuilder {
    this.city = city;
    return this;
  }
  public PRICE(price: number): ShippingModelDTOBuilder {
    this.price = price;
    return this;
  }
  public NEIGHBORHOOD(neighborhood: string): ShippingModelDTOBuilder {
    if (neighborhood) this.neighborhood = neighborhood;
    return this;
  }
  public POSTAL_CODE(postal_code: number): ShippingModelDTOBuilder {
    if (postal_code) this.postal_code = postal_code;
    return this;
  }
  public EXTRAINFO(extraInfo: JSON): ShippingModelDTOBuilder {
    if (extraInfo) this.extraInfo = extraInfo;
    return this;
  }

  public build(): ShippingModelDTO {
    const shippingDTO = new ShippingModelDTO(
      this.tenantID,
      this.shipping_code,
      this.city,
      this.price,
    );
    if (this.neighborhood) shippingDTO.setNeighborhood(this.neighborhood);
    if (this.postal_code) shippingDTO.setPostalCode(this.postal_code);
    if (this.extraInfo) shippingDTO.setExtraInfo(this.extraInfo);
    return shippingDTO;
  }
}
