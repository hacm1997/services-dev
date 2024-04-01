export declare class PaymentModel {
    tenantID: string;
    customer: string;
    key_code: string;
    createdAt: Date;
    extraInfo?: JSON;
    constructor(tenantID?: string, customer?: string, key_code?: string, createdAt?: Date, extraInfo?: any);
    setExtraInfo(extraInfo: JSON): void;
    static builder(): PaymentModelBuilder;
}
export declare class PaymentModelBuilder extends PaymentModel {
    TENANTID(tenantID: string): PaymentModelBuilder;
    CUSTOMER(customer: string): PaymentModelBuilder;
    KEY_CODE(key_code: string): PaymentModelBuilder;
    CREATEDAT(createdAt: Date): PaymentModelBuilder;
    EXTRAINFO(extraInfo: JSON): PaymentModelBuilder;
    build(): PaymentModel;
}
