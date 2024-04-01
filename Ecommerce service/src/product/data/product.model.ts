export class ProductModel {
  tenantID?: string;
  sid?: string;
  name: string;
  price: number;
  createdAt: string;
  status: string;
  image?: string;
  description?: string;
  extraInfo?: JSON;
  inventory?: number | undefined;

  constructor(
    tenantID?: string,
    sid?: string,
    name?: string,
    price?: number,
    createdAt?: string,
    status?: string,
    image?: string,
    description?: string,
    extraInfo?: JSON,
    inventory?: number | undefined,
  ) {
    this.tenantID = tenantID;
    this.sid = sid;
    this.name = name;
    this.price = price;
    this.createdAt = createdAt;
    this.status = status;
    this.image = image;
    this.description = description;
    this.extraInfo = extraInfo;
    this.inventory = inventory;
  }

  public setImage(image: string) {
    this.image = image;
  }
  public setDescription(description: string) {
    this.description = description;
  }
  public setExtraInfo(extraInfo: JSON) {
    this.extraInfo = extraInfo;
  }
  public setInventory(inventory: number | undefined) {
    this.inventory = inventory;
  }

  public static builder() {
    return new ProductModelBuilder();
  }
}

export class ProductModelBuilder extends ProductModel {
  public TENANTID(tenantID: string): ProductModelBuilder {
    this.tenantID = tenantID ?? undefined;
    return this;
  }
  public SID(sid: string): ProductModelBuilder {
    this.sid = sid;
    return this;
  }
  public NAME(name: string): ProductModelBuilder {
    this.name = name;
    return this;
  }
  public PRICE(price: number): ProductModelBuilder {
    this.price = price;
    return this;
  }
  public CREATEDAT(createdAt: string): ProductModelBuilder {
    this.createdAt = createdAt;
    return this;
  }
  public STATUS(status: string): ProductModelBuilder {
    this.status = status;
    return this;
  }
  public IMAGE(image: string): ProductModelBuilder {
    if (image) this.image = image;
    return this;
  }
  public DESCRIPTION(description: string): ProductModelBuilder {
    if (description) this.description = description;
    return this;
  }
  public EXTRAINFO(extraInfo: JSON): ProductModelBuilder {
    if (extraInfo) this.extraInfo = extraInfo;
    return this;
  }
  public INVENTORY(inventory: number | undefined): ProductModelBuilder {
    this.inventory = inventory;
    return this;
  }

  public build(): ProductModel {
    const productDTO = new ProductModel(
      this.tenantID,
      this.sid,
      this.name,
      this.price,
      this.createdAt,
      this.status,
    );
    if (this.image) productDTO.setImage(this.image);
    if (this.description) productDTO.setDescription(this.description);
    if (this.extraInfo) productDTO.setExtraInfo(this.extraInfo);
    if (this.inventory) productDTO.setInventory(this.inventory);
    console.log(`BUILDER MODEL: ${JSON.stringify(productDTO)}`);
    return productDTO;
  }
}
