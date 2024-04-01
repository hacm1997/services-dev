import { PaymenItems } from './payment.item';

/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
export class PaymentModelData {
  private _tenantID: string;
  private _customer: string;
  private _key_code: string;
  private _createdAt: Date;
  private _extraInfo?: JSON;

  constructor(
    tenantID: string,
    customer: string,
    key_code: string,
    createdAt: Date,
    extraInfo?: any,
  ) {
    this._tenantID = tenantID;
    this._customer = customer;
    this._key_code = key_code;
    this._createdAt = createdAt;
    this._extraInfo = extraInfo;
  }

  //Getters
  get tenantID(): string {
    return this._tenantID;
  }
  get customer(): string {
    return this._customer;
  }
  get key_code(): string {
    return this._key_code;
  }
  get createAt(): Date {
    return this._createdAt;
  }
  get extraInfo(): JSON {
    return this._extraInfo;
  }

  //Setters
  set tenantID(value: string) {
    this._tenantID = value;
  }
  set customer(value: string) {
    this._customer = value;
  }
  set key_code(value: string) {
    this._key_code = value;
  }
  set createdAt(value: Date) {
    this._createdAt = value;
  }
  set extraInfo(value: JSON) {
    this._extraInfo = value;
  }

  getItem(): PaymenItems {
    const item: PaymenItems = {
      pid: { S: this._tenantID },
      sid: { S: this._customer },
      key_code: { S: this._key_code },
      createdAt: { S: JSON.stringify(this._createdAt) },
      extraInfo: { S: JSON.stringify(this._extraInfo) ?? '' },
    };
    return item;
  }
}
