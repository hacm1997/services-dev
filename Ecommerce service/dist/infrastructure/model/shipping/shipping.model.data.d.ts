import { ShippingItem } from './shipping.item';
export declare class ShippingModelData {
    private _tenantID;
    private _shipping_code?;
    private _city;
    private _price;
    private _extraInfo?;
    constructor(tenantID: string, shipping_code: string, city: string, price: number, extraInfo?: JSON);
    get tenantID(): string;
    get shipping_code(): string;
    get city(): string;
    get price(): number;
    get extraInfo(): JSON;
    set tenantID(value: string);
    set shipping_code(value: string);
    set city(value: string);
    set price(value: number);
    set extraInfo(value: JSON);
    getItem(): ShippingItem;
}
