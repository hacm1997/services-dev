import { PersonModel } from '../data/person.model';
import { PersonService } from '../service/person.service';
import { PersonPaginate } from '../service/type.pagination';
export declare class PersonController {
    private personService;
    constructor(personService: PersonService);
    createContact(person: PersonModel): Promise<PersonModel>;
    getAllContacts(page: number, pageSize: number): Promise<PersonPaginate>;
    getAllContactsOpenSearch(index: string, page: number, pageSize: number): Promise<PersonPaginate>;
    getContactsByName(index: string, input: string, page: number, pageSize: number): Promise<PersonPaginate>;
    getPersonById(personId: string): Promise<PersonModel>;
    updatePerson(personId: string, person: PersonModel): Promise<PersonModel>;
    deletePersonOPS(personId: string, index: string): Promise<any>;
}
