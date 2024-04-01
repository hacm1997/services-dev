import { ApiProperty } from '@nestjs/swagger';

export class PaymentModelDTO {
  @ApiProperty({ type: String, example: 'TED-DTX131', required: true })
  tenantID: string;

  @ApiProperty({
    name: 'customer',
    description: 'Customer',
    type: String,
    example: 'KRU360',
    required: false,
  })
  customer: string;

  @ApiProperty({ type: String, example: 'nsgsfsjfjkbmaldalk', required: true })
  key_code: string;

  @ApiProperty({ type: 'Date', example: '2023-08-03', required: false })
  createdAt: Date;

  @ApiProperty({
    type: JSON,
    example: { des: 'extra info xd' },
    required: false,
  })
  extraInfo?: JSON;

  constructor(
    tenantID?: string,
    customer?: string,
    key_code?: string,
    createdAt?: Date,
  ) {
    this.tenantID = tenantID;
    this.customer = customer;
    this.key_code = key_code;
    this.createdAt = createdAt;
  }

  public setExtraInfo(extraInfo: any) {
    this.extraInfo = extraInfo;
  }

  public static builder() {
    return new PaymentModelDTOBuilder();
  }
}

export class PaymentModelDTOBuilder extends PaymentModelDTO {
  public TENANTID(tenantID: string): PaymentModelDTOBuilder {
    this.tenantID = tenantID ?? undefined;
    return this;
  }
  public CUSTOMER(customer: string): PaymentModelDTOBuilder {
    if (customer) this.customer = customer;
    return this;
  }
  public KEY_CODE(key_code: string): PaymentModelDTOBuilder {
    this.key_code = key_code;
    return this;
  }
  public CREATEDAT(createdAt: Date): PaymentModelDTOBuilder {
    if (createdAt) this.createdAt = createdAt;
    return this;
  }
  public EXTRAINFO(extraInfo: any): PaymentModelDTOBuilder {
    if (extraInfo) this.extraInfo = extraInfo;
    return this;
  }

  public build(): PaymentModelDTO {
    const productDTO = new PaymentModelDTO(
      this.tenantID,
      this.customer,
      this.key_code,
      this.createdAt,
    );
    if (this.extraInfo) productDTO.setExtraInfo(JSON.stringify(this.extraInfo));
    return productDTO;
  }
}
