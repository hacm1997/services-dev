import { ContactRepository } from '../data/contact.repository';
import { contactDTO } from '../rest/contactDTO';
import { CompanyModel } from 'src/company/data/company.model';
import { PersonModel } from 'src/person/data/person.model';
export declare class ContactService {
    private contactRepository;
    constructor(contactRepository: ContactRepository);
    createContact(contact: contactDTO): Promise<contactDTO | any>;
    getAllContacts(page: number, pageSize: number): Promise<any>;
    getContactById(id: string): Promise<contactDTO>;
    deleteContact(id: string): Promise<any>;
    putContact(id: string, contactDTO: contactDTO): Promise<contactDTO>;
    putContactCompany(id: string, company: CompanyModel): Promise<contactDTO>;
    putContactPerson(id: string, person: PersonModel): Promise<contactDTO>;
    getContactByCompanyId(companyId: string): Promise<contactDTO[]>;
    getContactByPersonId(personId: string): Promise<contactDTO[]>;
}
