import { PersonRepository } from '../data/person.repository';
import { PersonModel } from '../data/person.model';
import { PersonPaginate } from './type.pagination';
import { OpenSearch } from 'src/infrastructure/opensearch/client/openSearch';
import { PersonOpenSearchRespository } from '../data/person.ops.repository';
import { ContactService } from 'src/contacts/service/contact.service';
export declare class PersonService {
    private personRepository;
    private readonly _connection;
    private personOpenSearchRepository;
    private contactService;
    constructor(personRepository: PersonRepository, _connection: OpenSearch, personOpenSearchRepository: PersonOpenSearchRespository, contactService: ContactService);
    createPerson(item: PersonModel): Promise<PersonModel>;
    getAllPersons(page: number, pageSize: number): Promise<PersonPaginate>;
    getPersonOPS(indexName: string, page: number, pageSize: number): Promise<any>;
    getPersonByNameOPS(indexName: string, input: string, page: number, pageSize: number): Promise<any>;
    getPersonById(personId: string): Promise<PersonModel>;
    deletePerson(indexName: string, personId: string): Promise<any>;
    updatePerson(personId: string, person: PersonModel): Promise<PersonModel>;
}
