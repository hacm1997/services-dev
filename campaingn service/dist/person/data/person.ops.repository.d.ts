import { OpenSearch } from 'src/infrastructure/opensearch/client/openSearch';
import { PersonModel } from './person.model';
export declare class PersonOpenSearchRespository {
    private clientOpenSearch;
    static INDEX: string;
    constructor(clientOpenSearch: OpenSearch);
    updatePerson(id: string, person: PersonModel): Promise<{
        httpCode: number;
        message: string;
        error?: undefined;
    } | {
        httpCode: number;
        error: any;
        message?: undefined;
    }>;
}
