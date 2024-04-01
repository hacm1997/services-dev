export declare class ShippingModel {
    tenantID: string;
    shipping_code?: string;
    city: string;
    price: number;
    extraInfo?: JSON;
    constructor(tenantID?: string, shipping_code?: string, city?: string, price?: number, extraInfo?: JSON);
    setExtraInfo(extraInfo: JSON): void;
    static builder(): ShippingModelBuilder;
}
export declare class ShippingModelBuilder extends ShippingModel {
    TENANTID(tenantID: string): ShippingModelBuilder;
    SHIPPING_CODE(shipping_code: string): ShippingModelBuilder;
    CITY(city: string): ShippingModelBuilder;
    PRICE(price: number): ShippingModelBuilder;
    EXTRAINFO(extraInfo: JSON): ShippingModelBuilder;
    build(): ShippingModel;
}
