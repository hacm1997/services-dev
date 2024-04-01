/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { CustomerItem } from './customer.item';

export class CustomerModelData {
  private _tenantID: string;
  private _sid: string;
  private _name: string;
  private _last_name: string;
  private _email: string;
  private _phone: number;
  private _city: string;
  private _address: string;
  private _createdAt: string;
  private _extraInfo: any;

  constructor(
    tenantID: string,
    sid: string,
    name: string,
    last_name: string,
    email: string,
    phone: number,
    city: string,
    address: string,
    createdAt: string,
    extraInfo: any,
  ) {
    this._tenantID = tenantID;
    this._sid = sid;
    this._name = name;
    this._last_name = last_name;
    this._email = email;
    this._phone = phone;
    this._city = city;
    this._address = address;
    this._createdAt = createdAt;
    this._extraInfo = extraInfo;
  }

  // Getters
  get tenantID(): string {
    return this._tenantID;
  }

  get sid(): string {
    return this._sid;
  }

  get name(): string {
    return this._name;
  }

  get last_name(): string {
    return this._last_name;
  }

  get email(): string {
    return this._email;
  }

  get phone(): number {
    return this._phone;
  }

  get city(): string {
    return this._city;
  }

  get address(): string {
    return this._address;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  get extraInfo(): any {
    return this._extraInfo;
  }

  // Setters

  set tenantID(value: string) {
    this._tenantID = value;
  }

  set sid(value: string) {
    this._sid = value;
  }

  set name(name: string) {
    this._name = name;
  }

  set last_name(last_name: string) {
    this._last_name = last_name;
  }

  set email(email: string) {
    this._email = email;
  }

  set phone(phone: number) {
    this._phone = phone;
  }

  set city(city: string) {
    this._city = city;
  }

  set address(address: string) {
    this._address = address;
  }

  set createdAt(createdAt: string) {
    this._createdAt = createdAt;
  }

  set extraInfo(extraInfo: any) {
    this._extraInfo = extraInfo;
  }

  // Método para obtener el item en el formato deseado
  getItem(): CustomerItem {
    const item: any = {
      pid: { S: this._tenantID },
      sid: { S: this._sid },
      name: { S: this._name },
      last_name: { S: this._last_name },
      email: { S: this._email },
      phone: { N: this._phone },
      city: { S: this._city },
      address: { S: this._address },
      createdAt: { S: this._createdAt },
    };
    if (this._extraInfo) {
      item.extraInfo = { S: JSON.stringify(this._extraInfo) };
    }
    return item;
  }
}
