import { ClientDynamodb } from '../../infrastructure/dynamodb/client.dynamodb';
import { contactModel } from './contact.model';
import { contactDTO } from '../rest/contactDTO';
import { CompanyModel } from 'src/company/data/company.model';
import { PersonModel } from 'src/person/data/person.model';
export declare class ContactRepository {
    private fullClientDynamodb;
    static GROUP: string;
    constructor(fullClientDynamodb: ClientDynamodb);
    createContact(item: contactDTO): Promise<any>;
    getContactByEmail(email: string): Promise<any>;
    getContactByEmailTracking(email: string, tenantId: string): Promise<any>;
    getAllContacts(): Promise<any[]>;
    private getContactItemByKey;
    deleteContact(id: string): Promise<any>;
    getContactById(id: string): Promise<contactModel>;
    putContactByTypeContact(item: any): Promise<contactModel>;
    putContact(id: string, contact: contactModel): Promise<contactModel>;
    putContactCompany(id: string, company: CompanyModel): Promise<any>;
    putContactPerson(id: string, person: PersonModel): Promise<any>;
    getContactByCompanyId(companyId: string): Promise<any>;
    getContactByPersonId(personId: string): Promise<any>;
    private createNewItemFromDomainModel;
    private mapToDomain;
}
