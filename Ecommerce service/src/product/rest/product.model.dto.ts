import { ApiProperty } from '@nestjs/swagger';

export class ProductModelDTO {
  @ApiProperty({ type: String, example: 'TED-DTX131', required: true })
  tenantID: string;

  @ApiProperty({
    name: 'id',
    description: 'Procut ID',
    type: String,
    example: 'USR-31N4r123',
    required: false,
  })
  id: string;

  @ApiProperty({ type: String, example: 'PRODUCT EXAMPLE', required: true })
  name: string;

  @ApiProperty({
    type: Number,
    example: 20000,
    required: true,
  })
  price: number;

  @ApiProperty({
    type: String,
    example:
      'https://s3.amazonaws.com/gomedi.kru360.com/DEVELOPMFR/1677591913273portada2.jpg',
    required: false,
  })
  image?: string;

  @ApiProperty({
    type: String,
    example: 'PRODUCT DESCRIPTION',
    required: true,
  })
  description?: string;

  @ApiProperty({ type: String, example: '2023-08-03', required: false })
  createdAt: string;

  @ApiProperty({ type: String, example: 'STATUS PRODUCT', required: true })
  status: string;

  @ApiProperty({
    type: JSON,
    example: { des: 'extra info xd' },
    required: false,
  })
  extraInfo?: any;

  @ApiProperty({
    type: Number,
    example: 100,
    required: true,
  })
  inventory?: number;

  constructor(
    tenantID?: string,
    id?: string,
    name?: string,
    price?: number,
    createdAt?: string,
    status?: string,
  ) {
    this.tenantID = tenantID;
    this.id = id;
    this.name = name;
    this.price = price;
    this.createdAt = createdAt;
    this.status = status;
  }

  public setImage(image: string) {
    this.image = image;
  }
  public setDescription(description: string) {
    this.description = description;
  }
  public setExtraInfo(extraInfo: any) {
    this.extraInfo = extraInfo;
  }
  public setInventory(inventory: number) {
    this.inventory = inventory;
  }

  public static builder() {
    return new ProductModelDTOBuilder();
  }
}

export class ProductModelDTOBuilder extends ProductModelDTO {
  public TENANTID(tenantID: string): ProductModelDTOBuilder {
    this.tenantID = tenantID ?? undefined;
    return this;
  }
  public ID(id: string): ProductModelDTOBuilder {
    if (id) this.id = id;
    return this;
  }
  public NAME(name: string): ProductModelDTOBuilder {
    this.name = name;
    return this;
  }
  public IMAGE(image: string): ProductModelDTOBuilder {
    this.image = image;
    return this;
  }
  public DESCRIPTION(description: string): ProductModelDTOBuilder {
    this.description = description;
    return this;
  }
  public PRICE(price: number): ProductModelDTOBuilder {
    this.price = price;
    return this;
  }
  public CREATEDAT(createdAt: string): ProductModelDTOBuilder {
    if (createdAt) this.createdAt = createdAt;
    return this;
  }
  public STATUS(status: string): ProductModelDTOBuilder {
    if (status) this.status = status;
    return this;
  }
  public EXTRAINFO(extraInfo: any): ProductModelDTOBuilder {
    if (extraInfo) this.extraInfo = extraInfo;
    return this;
  }
  public INVENTORY(inventory: number): ProductModelDTOBuilder {
    this.inventory = inventory;
    return this;
  }

  public build(): ProductModelDTO {
    const productDTO = new ProductModelDTO(
      this.tenantID,
      this.id,
      this.name,
      this.price,
      this.createdAt,
      this.status,
    );
    if (this.image) productDTO.setImage(this.image);
    if (this.description) productDTO.setDescription(this.description);
    if (this.extraInfo) productDTO.setExtraInfo(JSON.stringify(this.extraInfo));
    if (this.inventory) productDTO.setInventory(this.inventory);
    return productDTO;
  }
}
