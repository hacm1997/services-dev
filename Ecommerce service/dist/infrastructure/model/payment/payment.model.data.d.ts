import { PaymenItems } from './payment.item';
export declare class PaymentModelData {
    private _tenantID;
    private _customer;
    private _key_code;
    private _createdAt;
    private _extraInfo?;
    constructor(tenantID: string, customer: string, key_code: string, createdAt: Date, extraInfo?: any);
    get tenantID(): string;
    get customer(): string;
    get key_code(): string;
    get createAt(): Date;
    get extraInfo(): JSON;
    set tenantID(value: string);
    set customer(value: string);
    set key_code(value: string);
    set createdAt(value: Date);
    set extraInfo(value: JSON);
    getItem(): PaymenItems;
}
