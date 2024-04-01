export class ShippingModel {
  tenantID: string;
  shipping_code?: string;
  city: string;
  price: number;
  extraInfo?: JSON;

  constructor(
    tenantID?: string,
    shipping_code?: string,
    city?: string,
    price?: number,
    extraInfo?: JSON,
  ) {
    this.tenantID = tenantID;
    this.shipping_code = shipping_code;
    this.city = city;
    this.price = price;
    this.extraInfo = extraInfo;
  }
  public setExtraInfo(extraInfo: JSON) {
    this.extraInfo = extraInfo;
  }
  public static builder() {
    return new ShippingModelBuilder();
  }
}

export class ShippingModelBuilder extends ShippingModel {
  public TENANTID(tenantID: string): ShippingModelBuilder {
    this.tenantID = tenantID ?? undefined;
    return this;
  }
  public SHIPPING_CODE(shipping_code: string): ShippingModelBuilder {
    this.shipping_code = shipping_code;
    return this;
  }
  public CITY(city: string): ShippingModelBuilder {
    this.city = city;
    return this;
  }
  public PRICE(price: number): ShippingModelBuilder {
    this.price = price;
    return this;
  }
  public EXTRAINFO(extraInfo: JSON): ShippingModelBuilder {
    if (extraInfo) this.extraInfo = extraInfo;
    return this;
  }

  public build(): ShippingModel {
    const shippingDTO = new ShippingModel(
      this.tenantID,
      this.shipping_code,
      this.city,
      this.price,
    );
    if (this.extraInfo) shippingDTO.setExtraInfo(this.extraInfo);
    console.log(`BUILDER MODEL: ${JSON.stringify(shippingDTO)}`);
    return shippingDTO;
  }
}
