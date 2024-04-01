import { ContactService } from '../service/contact.service';
import { contactDTO } from './contactDTO';
import { CompanyModel } from 'src/company/data/company.model';
import { PersonModel } from 'src/person/data/person.model';
export declare class ContactController {
    private contactService;
    constructor(contactService: ContactService);
    createContact(contact: contactDTO): Promise<contactDTO>;
    getAllContacts(page: number, pageSize: number): Promise<contactDTO[]>;
    getContactById(id: string): Promise<contactDTO>;
    deleteContact(id: string): Promise<any>;
    putContact(id: string, contactDTO: contactDTO): Promise<contactDTO>;
    putContactCompany(id: string, company: CompanyModel): Promise<contactDTO>;
    putContactPerson(id: string, person: PersonModel): Promise<contactDTO>;
    getContactByCompanyId(company: string): Promise<contactDTO[]>;
}
