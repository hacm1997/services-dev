export declare class ProductModel {
    tenantID?: string;
    sid?: string;
    name: string;
    price: number;
    createdAt: string;
    status: string;
    image?: string;
    description?: string;
    extraInfo?: JSON;
    inventory?: number | undefined;
    constructor(tenantID?: string, sid?: string, name?: string, price?: number, createdAt?: string, status?: string, image?: string, description?: string, extraInfo?: JSON, inventory?: number | undefined);
    setImage(image: string): void;
    setDescription(description: string): void;
    setExtraInfo(extraInfo: JSON): void;
    setInventory(inventory: number | undefined): void;
    static builder(): ProductModelBuilder;
}
export declare class ProductModelBuilder extends ProductModel {
    TENANTID(tenantID: string): ProductModelBuilder;
    SID(sid: string): ProductModelBuilder;
    NAME(name: string): ProductModelBuilder;
    PRICE(price: number): ProductModelBuilder;
    CREATEDAT(createdAt: string): ProductModelBuilder;
    STATUS(status: string): ProductModelBuilder;
    IMAGE(image: string): ProductModelBuilder;
    DESCRIPTION(description: string): ProductModelBuilder;
    EXTRAINFO(extraInfo: JSON): ProductModelBuilder;
    INVENTORY(inventory: number | undefined): ProductModelBuilder;
    build(): ProductModel;
}
