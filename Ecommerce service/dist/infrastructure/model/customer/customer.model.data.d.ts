import { CustomerItem } from './customer.item';
export declare class CustomerModelData {
    private _tenantID;
    private _sid;
    private _name;
    private _last_name;
    private _email;
    private _phone;
    private _city;
    private _address;
    private _createdAt;
    private _extraInfo;
    constructor(tenantID: string, sid: string, name: string, last_name: string, email: string, phone: number, city: string, address: string, createdAt: string, extraInfo: any);
    get tenantID(): string;
    get sid(): string;
    get name(): string;
    get last_name(): string;
    get email(): string;
    get phone(): number;
    get city(): string;
    get address(): string;
    get createdAt(): string;
    get extraInfo(): any;
    set tenantID(value: string);
    set sid(value: string);
    set name(name: string);
    set last_name(last_name: string);
    set email(email: string);
    set phone(phone: number);
    set city(city: string);
    set address(address: string);
    set createdAt(createdAt: string);
    set extraInfo(extraInfo: any);
    getItem(): CustomerItem;
}
