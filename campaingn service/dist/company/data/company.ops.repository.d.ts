import { OpenSearch } from 'src/infrastructure/opensearch/client/openSearch';
import { CompanyModel } from './company.model';
export declare class CompanyOpenSearchRespository {
    private clientOpenSearch;
    static INDEX: string;
    constructor(clientOpenSearch: OpenSearch);
    updateCompany(id: string, company: CompanyModel): Promise<{
        httpCode: number;
        message: string;
        error?: undefined;
    } | {
        httpCode: number;
        error: any;
        message?: undefined;
    }>;
}
