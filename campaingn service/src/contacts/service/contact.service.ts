import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactRepository } from '../data/contact.repository';
import { contactDTO } from '../rest/contactDTO';
import { contactModel } from '../data/contact.model';
import { CompanyModel } from 'src/company/data/company.model';
import { PersonModel } from 'src/person/data/person.model';

@Injectable()
export class ContactService {
  constructor(private contactRepository: ContactRepository) {}

  public async createContact(contact: contactDTO): Promise<contactDTO | any> {
    const trakingContact: contactDTO | any =
      await this.contactRepository.createContact(contact);
    if (!trakingContact) {
      throw new NotFoundException('Contact not found');
    }
    if (trakingContact === 400) {
      // throw new Exception();
      return { message: 'contact already exist', statusCode: 404 };
    }
    return trakingContact;
  }

  public async getAllContacts(page: number, pageSize: number): Promise<any> {
    const contacts: contactModel[] =
      await this.contactRepository.getAllContacts();
    if (contacts.length > 0) {
      const totalPages = Math.ceil(contacts.length / pageSize);

      if (page && (page < 1 || page > totalPages)) {
        throw new NotFoundException('Invalid page number');
      }
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedResult = contacts.slice(startIndex, endIndex);

      return {
        data: paginatedResult,
        totalPages: totalPages,
        currentPage: page,
      };
      // return contacts.map(this.mapDomainToDTO);
    } else {
      return [];
    }
  }

  public async getContactById(id: string): Promise<contactDTO> {
    const contact: contactModel =
      await this.contactRepository.getContactById(id);
    try {
      return contact;
    } catch (error) {
      throw new error(error);
    }
  }

  public async deleteContact(id: string): Promise<any> {
    try {
      return await this.contactRepository.deleteContact(id);
    } catch (error) {
      throw new NotFoundException('Contact not deleted');
    }
  }

  public async putContact(
    id: string,
    contactDTO: contactDTO,
  ): Promise<contactDTO> {
    const putContact: contactModel = await this.contactRepository.putContact(
      id,
      contactDTO,
    );
    return putContact;
  }

  public async putContactCompany(
    id: string,
    company: CompanyModel,
  ): Promise<contactDTO> {
    const putContactCompany = await this.contactRepository.putContactCompany(
      id,
      company,
    );
    return putContactCompany;
  }

  public async putContactPerson(
    id: string,
    person: PersonModel,
  ): Promise<contactDTO> {
    const putContactPerson = await this.contactRepository.putContactPerson(
      id,
      person,
    );
    return putContactPerson;
  }

  public async getContactByCompanyId(companyId: string): Promise<contactDTO[]> {
    const contact: contactModel[] =
      await this.contactRepository.getContactByCompanyId(companyId);
    try {
      return contact;
    } catch (error) {
      throw new error(error);
    }
  }

  public async getContactByPersonId(personId: string): Promise<contactDTO[]> {
    const contact: contactModel[] =
      await this.contactRepository.getContactByPersonId(personId);
    try {
      return contact;
    } catch (error) {
      throw new error(error);
    }
  }
}
