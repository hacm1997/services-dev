import { OpenSearch } from './openSearch';
export declare class OpenSearchController {
    private readonly openSearchService;
    constructor(openSearchService: OpenSearch);
    reindex(sourceIndex: string, destinationIndex: string): Promise<any>;
}
