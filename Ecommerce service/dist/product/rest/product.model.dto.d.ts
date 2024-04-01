export declare class ProductModelDTO {
    tenantID: string;
    id: string;
    name: string;
    price: number;
    image?: string;
    description?: string;
    createdAt: string;
    status: string;
    extraInfo?: any;
    inventory?: number;
    constructor(tenantID?: string, id?: string, name?: string, price?: number, createdAt?: string, status?: string);
    setImage(image: string): void;
    setDescription(description: string): void;
    setExtraInfo(extraInfo: any): void;
    setInventory(inventory: number): void;
    static builder(): ProductModelDTOBuilder;
}
export declare class ProductModelDTOBuilder extends ProductModelDTO {
    TENANTID(tenantID: string): ProductModelDTOBuilder;
    ID(id: string): ProductModelDTOBuilder;
    NAME(name: string): ProductModelDTOBuilder;
    IMAGE(image: string): ProductModelDTOBuilder;
    DESCRIPTION(description: string): ProductModelDTOBuilder;
    PRICE(price: number): ProductModelDTOBuilder;
    CREATEDAT(createdAt: string): ProductModelDTOBuilder;
    STATUS(status: string): ProductModelDTOBuilder;
    EXTRAINFO(extraInfo: any): ProductModelDTOBuilder;
    INVENTORY(inventory: number): ProductModelDTOBuilder;
    build(): ProductModelDTO;
}
