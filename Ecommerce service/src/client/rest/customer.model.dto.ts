import { ApiProperty } from '@nestjs/swagger';

export class CustomerModelDTO {
  @ApiProperty({ type: String, example: 'TED-DTX131', required: false })
  tenantID: string;

  @ApiProperty({
    name: 'id',
    description: 'client ID',
    type: String,
    example: 1234567890,
    required: false,
  })
  id: string;

  @ApiProperty({ type: String, example: 'CLIENT NAME', required: true })
  name: string;

  @ApiProperty({ type: String, example: 'CLIENT LAST NAME', required: false })
  last_name: string;

  @ApiProperty({ type: String, example: 'user@example.com', required: true })
  email: string;

  @ApiProperty({
    type: Number,
    example: 3105005000,
    required: false,
  })
  phone: number;

  @ApiProperty({
    type: String,
    example: 'CITY NAME',
    required: true,
  })
  city: string;

  @ApiProperty({ type: String, example: 'ADDRESS NAME', required: false })
  address: string;

  @ApiProperty({ type: String, example: '2023-10-27', required: true })
  createdAt: string;

  @ApiProperty({
    type: String,
    example: { des: 'CLIENT EXTRA INFO' },
    required: false,
  })
  extraInfo?: any;

  constructor(
    tenantID?: string,
    id?: string,
    name?: string,
    last_name?: string,
    email?: string,
    phone?: number,
    city?: string,
    address?: string,
    createdAt?: string,
  ) {
    this.tenantID = tenantID;
    this.id = id;
    this.name = name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.city = city;
    this.address = address;
    this.createdAt = createdAt;
  }

  public setExtraInfo(extraInfo: any) {
    this.extraInfo = extraInfo;
  }

  public static builder() {
    return new CustomerModelDTOBuilder();
  }
  public static builderFromInvoice() {
    return new CustomerModelDTOBuilderFromInvoice();
  }
}

export class CustomerModelDTOBuilder extends CustomerModelDTO {
  public TENANTID(tenantID: string): CustomerModelDTOBuilder {
    this.tenantID = tenantID ?? undefined;
    return this;
  }
  public ID(id: string): CustomerModelDTOBuilder {
    this.id = id;
    return this;
  }
  public NAME(name: string): CustomerModelDTOBuilder {
    this.name = name;
    return this;
  }
  public LAST_NAME(last_name: string): CustomerModelDTOBuilder {
    this.last_name = last_name;
    return this;
  }
  public EMAIL(email: string): CustomerModelDTOBuilder {
    this.email = email;
    return this;
  }
  public PHONE(phone: number): CustomerModelDTOBuilder {
    this.phone = phone;
    return this;
  }
  public CITY(city: string): CustomerModelDTOBuilder {
    this.city = city;
    return this;
  }
  public ADDRESS(address: string): CustomerModelDTOBuilder {
    this.address = address;
    return this;
  }
  public CREATEDAT(createdAt: string): CustomerModelDTOBuilder {
    this.createdAt = createdAt;
    return this;
  }
  public EXTRAINFO(extraInfo: any): CustomerModelDTOBuilder {
    if (extraInfo) this.extraInfo = extraInfo;
    return this;
  }

  public build(): CustomerModelDTO {
    const clientDTO = new CustomerModelDTO(
      this.tenantID,
      this.id,
      this.name,
      this.last_name,
      this.email,
      this.phone,
      this.city,
      this.address,
      this.createdAt,
    );
    if (this.extraInfo) clientDTO.setExtraInfo(JSON.stringify(this.extraInfo));
    return clientDTO;
  }
}

export class CustomerModelDTOBuilderFromInvoice extends CustomerModelDTO {
  public TENANTID(tenantID: string): CustomerModelDTOBuilder {
    this.tenantID = tenantID ?? undefined;
    return this;
  }
  public ID(id: string): CustomerModelDTOBuilder {
    this.id = id;
    return this;
  }
  public NAME(name: string): CustomerModelDTOBuilder {
    this.name = name;
    return this;
  }
  public LAST_NAME(last_name: string): CustomerModelDTOBuilder {
    this.last_name = last_name;
    return this;
  }
  public EMAIL(email: string): CustomerModelDTOBuilder {
    this.email = email;
    return this;
  }
  public PHONE(phone: number): CustomerModelDTOBuilder {
    this.phone = phone;
    return this;
  }
  public CITY(city: string): CustomerModelDTOBuilder {
    this.city = city;
    return this;
  }
  public ADDRESS(address: string): CustomerModelDTOBuilder {
    this.address = address;
    return this;
  }
  public CREATEDAT(createdAt: string): CustomerModelDTOBuilder {
    this.createdAt = createdAt;
    return this;
  }
  public EXTRAINFO(extraInfo: any): CustomerModelDTOBuilder {
    if (extraInfo) this.extraInfo = extraInfo;
    return this;
  }

  public build(): CustomerModelDTO {
    const clientDTO = new CustomerModelDTO(
      this.tenantID,
      this.id,
      this.name,
      this.last_name,
      this.email,
      this.phone,
      this.city,
      this.address,
      this.createdAt,
    );
    if (this.extraInfo) clientDTO.setExtraInfo(this.extraInfo);
    return clientDTO;
  }
}
