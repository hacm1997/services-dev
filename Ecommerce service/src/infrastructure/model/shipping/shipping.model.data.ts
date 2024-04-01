/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

import { ShippingItem } from './shipping.item';

export class ShippingModelData {
  private _tenantID: string;
  private _shipping_code?: string;
  private _city: string;
  private _price: number;
  private _extraInfo?: JSON;

  constructor(
    tenantID: string,
    shipping_code: string,
    city: string,
    price: number,
    extraInfo?: JSON,
  ) {
    this._tenantID = tenantID;
    this._shipping_code = shipping_code;
    this._city = city;
    this._price = price;
    this._extraInfo = extraInfo;
  }

  //Getters
  get tenantID(): string {
    return this._tenantID;
  }
  get shipping_code(): string {
    return this._shipping_code;
  }
  get city(): string {
    return this._city;
  }
  get price(): number {
    return this._price;
  }
  get extraInfo(): JSON {
    return this._extraInfo;
  }

  //Setters
  set tenantID(value: string) {
    this._tenantID = value;
  }
  set shipping_code(value: string) {
    this._shipping_code = value;
  }
  set city(value: string) {
    this._city = value;
  }
  set price(value: number) {
    this._price = value;
  }
  set extraInfo(value: JSON) {
    this._extraInfo = value;
  }

  getItem(): ShippingItem {
    const item: ShippingItem = {
      pid: { S: this._tenantID },
      sid: { S: this._shipping_code },
      city: { S: this._city },
      price: { N: this._price },
    };
    if (this._extraInfo) {
      item.extraInfo = { S: JSON.stringify(this._extraInfo) };
    }
    return item;
  }
}
