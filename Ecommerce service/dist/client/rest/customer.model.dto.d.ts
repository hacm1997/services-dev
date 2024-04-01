export declare class CustomerModelDTO {
    tenantID: string;
    id: string;
    name: string;
    last_name: string;
    email: string;
    phone: number;
    city: string;
    address: string;
    createdAt: string;
    extraInfo?: any;
    constructor(tenantID?: string, id?: string, name?: string, last_name?: string, email?: string, phone?: number, city?: string, address?: string, createdAt?: string);
    setExtraInfo(extraInfo: any): void;
    static builder(): CustomerModelDTOBuilder;
    static builderFromInvoice(): CustomerModelDTOBuilderFromInvoice;
}
export declare class CustomerModelDTOBuilder extends CustomerModelDTO {
    TENANTID(tenantID: string): CustomerModelDTOBuilder;
    ID(id: string): CustomerModelDTOBuilder;
    NAME(name: string): CustomerModelDTOBuilder;
    LAST_NAME(last_name: string): CustomerModelDTOBuilder;
    EMAIL(email: string): CustomerModelDTOBuilder;
    PHONE(phone: number): CustomerModelDTOBuilder;
    CITY(city: string): CustomerModelDTOBuilder;
    ADDRESS(address: string): CustomerModelDTOBuilder;
    CREATEDAT(createdAt: string): CustomerModelDTOBuilder;
    EXTRAINFO(extraInfo: any): CustomerModelDTOBuilder;
    build(): CustomerModelDTO;
}
export declare class CustomerModelDTOBuilderFromInvoice extends CustomerModelDTO {
    TENANTID(tenantID: string): CustomerModelDTOBuilder;
    ID(id: string): CustomerModelDTOBuilder;
    NAME(name: string): CustomerModelDTOBuilder;
    LAST_NAME(last_name: string): CustomerModelDTOBuilder;
    EMAIL(email: string): CustomerModelDTOBuilder;
    PHONE(phone: number): CustomerModelDTOBuilder;
    CITY(city: string): CustomerModelDTOBuilder;
    ADDRESS(address: string): CustomerModelDTOBuilder;
    CREATEDAT(createdAt: string): CustomerModelDTOBuilder;
    EXTRAINFO(extraInfo: any): CustomerModelDTOBuilder;
    build(): CustomerModelDTO;
}
