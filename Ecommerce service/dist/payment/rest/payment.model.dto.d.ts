export declare class PaymentModelDTO {
    tenantID: string;
    customer: string;
    key_code: string;
    createdAt: Date;
    extraInfo?: JSON;
    constructor(tenantID?: string, customer?: string, key_code?: string, createdAt?: Date);
    setExtraInfo(extraInfo: any): void;
    static builder(): PaymentModelDTOBuilder;
}
export declare class PaymentModelDTOBuilder extends PaymentModelDTO {
    TENANTID(tenantID: string): PaymentModelDTOBuilder;
    CUSTOMER(customer: string): PaymentModelDTOBuilder;
    KEY_CODE(key_code: string): PaymentModelDTOBuilder;
    CREATEDAT(createdAt: Date): PaymentModelDTOBuilder;
    EXTRAINFO(extraInfo: any): PaymentModelDTOBuilder;
    build(): PaymentModelDTO;
}
