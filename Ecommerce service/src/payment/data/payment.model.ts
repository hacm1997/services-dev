export class PaymentModel {
  tenantID: string;
  customer: string;
  key_code: string;
  createdAt: Date;
  extraInfo?: JSON;

  constructor(
    tenantID?: string,
    customer?: string,
    key_code?: string,
    createdAt?: Date,
    extraInfo?: any,
  ) {
    this.tenantID = tenantID;
    this.customer = customer;
    this.key_code = key_code;
    this.createdAt = createdAt;
    this.extraInfo = extraInfo;
  }

  public setExtraInfo(extraInfo: JSON) {
    this.extraInfo = extraInfo;
  }

  public static builder() {
    return new PaymentModelBuilder();
  }
}

export class PaymentModelBuilder extends PaymentModel {
  public TENANTID(tenantID: string): PaymentModelBuilder {
    this.tenantID = tenantID ?? undefined;
    return this;
  }
  public CUSTOMER(customer: string): PaymentModelBuilder {
    this.customer = customer;
    return this;
  }
  public KEY_CODE(key_code: string): PaymentModelBuilder {
    this.key_code = key_code;
    return this;
  }
  public CREATEDAT(createdAt: Date): PaymentModelBuilder {
    this.createdAt = createdAt;
    return this;
  }
  public EXTRAINFO(extraInfo: JSON): PaymentModelBuilder {
    if (extraInfo) this.extraInfo = extraInfo;
    return this;
  }

  public build(): PaymentModel {
    const paymentDTO = new PaymentModel(
      this.tenantID,
      this.customer,
      this.key_code,
      this.createdAt,
    );
    if (this.extraInfo) paymentDTO.setExtraInfo(this.extraInfo);
    console.log(`BUILDER PAYMENT MODEL: ${JSON.stringify(paymentDTO)}`);
    return paymentDTO;
  }
}
