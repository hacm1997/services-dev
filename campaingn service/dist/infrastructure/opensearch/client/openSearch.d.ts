import { Client } from '@opensearch-project/opensearch';
export declare class OpenSearch {
    private readonly client;
    constructor();
    initClient(): Promise<Client>;
    inicializedClient(): Promise<Client>;
    createIndexes(): Promise<void>;
    private getIndexSettings;
    indexEntity(entity: any, indexName: string): Promise<unknown>;
    reindex(sourceIndex: string, destinationIndex: string): Promise<void>;
    searchByName(indexName: string, searchTerm: string, tenantId: string): Promise<any>;
    getByName(indexName: string, input: string): Promise<any>;
    getByIndex(indexName: string, tenantId: string): Promise<any>;
    deleteByIndexIdAndTenant(indexName: string, id: string, tenantId: string): Promise<any>;
}
