export declare class CustomerModel {
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
    constructor(tenantID?: string, sid?: string, name?: string, last_name?: string, email?: string, phone?: number, city?: string, address?: string, createdAt?: string, extraInfo?: JSON);
    setExtraInfo(extraInfo: JSON): void;
    static builder(): CustomerModelBuilder;
}
export declare class CustomerModelBuilder extends CustomerModel {
    TENANTID(tenantID: string): CustomerModelBuilder;
    SID(sid: string): CustomerModelBuilder;
    NAME(name: string): CustomerModelBuilder;
    LAST_NAME(last_name: string): CustomerModelBuilder;
    EMAIL(email: string): CustomerModelBuilder;
    PHONE(phone: number): CustomerModelBuilder;
    CITY(city: string): CustomerModelBuilder;
    ADDRESS(address: string): CustomerModelBuilder;
    CREATEDAT(createdAt: string): CustomerModelBuilder;
    EXTRAINFO(extraInfo: JSON): CustomerModelBuilder;
    build(): CustomerModel;
}
