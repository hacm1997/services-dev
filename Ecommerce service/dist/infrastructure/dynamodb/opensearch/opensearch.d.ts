export declare class OpenSearch {
    private readonly client;
    private readonly index;
    private readonly settings;
    constructor();
    createIndex(): Promise<void>;
    deleteIndex(): Promise<void>;
    getIndex(): Promise<any>;
    indexExists(): Promise<boolean | unknown>;
    indexResource(product: any): Promise<unknown>;
    search(query: string): Promise<any>;
    searchProduct(id: string): Promise<any>;
    deleteProduct(id: string): Promise<void>;
    updateProduct(id: string, product: any): Promise<void>;
    getProduct(id: string): Promise<any>;
}
