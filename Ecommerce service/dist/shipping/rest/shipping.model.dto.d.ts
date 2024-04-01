export declare class ShippingModelDTO {
    tenantID: string;
    code: string;
    shipping_code: string;
    city: string;
    neighborhood?: string;
    postal_code: number;
    price: number;
    extraInfo?: JSON;
    constructor(tenantID?: string, shipping_code?: string, city?: string, price?: number);
    setNeighborhood(neighborhood: string): void;
    setPostalCode(postal_code: number): void;
    setExtraInfo(extraInfo: JSON): void;
    static builder(): ShippingModelDTOBuilder;
}
export declare class ShippingModelDTOBuilder extends ShippingModelDTO {
    TENANTID(tenantID: string): ShippingModelDTOBuilder;
    SHIPPING_CODE(shipping_code: string): ShippingModelDTOBuilder;
    CITY(city: string): ShippingModelDTOBuilder;
    PRICE(price: number): ShippingModelDTOBuilder;
    NEIGHBORHOOD(neighborhood: string): ShippingModelDTOBuilder;
    POSTAL_CODE(postal_code: number): ShippingModelDTOBuilder;
    EXTRAINFO(extraInfo: JSON): ShippingModelDTOBuilder;
    build(): ShippingModelDTO;
}
