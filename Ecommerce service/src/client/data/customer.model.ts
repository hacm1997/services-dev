export class CustomerModel {
  tenantID: string;
  sid?: string;
  name: string;
  last_name: string;
  email: string;
  phone: number;
  city: string;
  address: string;
  createdAt: string;
  extraInfo?: JSON;

  constructor(
    tenantID?: string,
    sid?: string,
    name?: string,
    last_name?: string,
    email?: string,
    phone?: number,
    city?: string,
    address?: string,
    createdAt?: string,
    extraInfo?: JSON,
  ) {
    this.tenantID = tenantID;
    this.sid = sid;
    this.name = name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.city = city;
    this.address = address;
    this.createdAt = createdAt;
    this.extraInfo = extraInfo;
  }

  public setExtraInfo(extraInfo: JSON) {
    this.extraInfo = extraInfo;
  }

  public static builder() {
    return new CustomerModelBuilder();
  }
}

export class CustomerModelBuilder extends CustomerModel {
  public TENANTID(tenantID: string): CustomerModelBuilder {
    this.tenantID = tenantID ?? undefined;
    return this;
  }
  public SID(sid: string): CustomerModelBuilder {
    this.sid = sid;
    return this;
  }
  public NAME(name: string): CustomerModelBuilder {
    this.name = name;
    return this;
  }
  public LAST_NAME(last_name: string): CustomerModelBuilder {
    this.last_name = last_name;
    return this;
  }
  public EMAIL(email: string): CustomerModelBuilder {
    this.email = email;
    return this;
  }
  public PHONE(phone: number): CustomerModelBuilder {
    this.phone = phone;
    return this;
  }
  public CITY(city: string): CustomerModelBuilder {
    this.city = city;
    return this;
  }
  public ADDRESS(address: string): CustomerModelBuilder {
    this.address = address;
    return this;
  }
  public CREATEDAT(createdAt: string): CustomerModelBuilder {
    this.createdAt = createdAt;
    return this;
  }
  public EXTRAINFO(extraInfo: JSON): CustomerModelBuilder {
    if (extraInfo) this.extraInfo = extraInfo;
    return this;
  }

  public build(): CustomerModel {
    const customerDTO = new CustomerModel(
      this.tenantID,
      this.sid,
      this.name,
      this.last_name,
      this.email,
      this.phone,
      this.city,
      this.address,
      this.createdAt,
    );
    if (this.extraInfo) customerDTO.setExtraInfo(this.extraInfo);
    console.log(`BUILDER CUSTOMER MODEL: ${JSON.stringify(customerDTO)}`);
    return customerDTO;
  }
}
