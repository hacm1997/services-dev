/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { ProductItem } from 'src/infrastructure/model/product/product.item';

export class ProductModelData {
  private _tenantID?: string;
  private _sid?: string;
  private _name: string;
  private _image: string;
  private _description?: string;
  private _price: number;
  private _createdAt: string;
  private _status: string;
  private _extraInfo?: JSON;
  private _inventory?: number | undefined;

  constructor(
    tenantID: string,
    sid: string,
    name: string,
    price: number,
    createdAt: string,
    status: string,
    image?: string,
    description?: string,
    extraInfo?: JSON,
    inventory?: number | undefined,
  ) {
    this._tenantID = tenantID;
    this._sid = sid;
    this._name = name;
    this._price = price;
    this._createdAt = createdAt;
    this._status = status;
    this._image = image;
    this._description = description;
    this._extraInfo = extraInfo;
    this._inventory = inventory;
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

  get image(): string {
    return this._image;
  }

  get description(): string {
    return this._description;
  }

  get price(): number {
    return this._price;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  get status(): string {
    return this._status;
  }

  get extraInfo(): JSON {
    return this._extraInfo;
  }

  get inventory(): number | undefined {
    return this._inventory;
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

  set image(image: string) {
    this._image = image;
  }

  set description(description: string) {
    this._description = description;
  }

  set price(price: number) {
    this._price = price;
  }

  set createdAt(createdAt: string) {
    this._createdAt = createdAt;
  }

  set status(status: string) {
    this._status = status;
  }

  set extraInfo(extraInfo: JSON) {
    this._extraInfo = extraInfo;
  }

  set inventory(inventory: number | undefined) {
    this._inventory = inventory;
  }

  // Método para obtener el item en el formato deseado
  getItem(): ProductItem {
    const item: any = {
      pid: { S: this._tenantID },
      sid: { S: this._sid },
      name: { S: this._name },
      price: { N: this._price },
      createdAt: { S: this._createdAt },
      status: { S: this._status },
    };
    if (this._image) {
      item.image = { S: this._image };
    }
    if (this._extraInfo) {
      item.extraInfo = { S: JSON.stringify(this._extraInfo) };
    }
    if (this._description) {
      item.description = { S: this._description };
    }
    if (this._inventory) {
      item.inventory = { N: this._inventory };
    }
    return item;
  }
}
