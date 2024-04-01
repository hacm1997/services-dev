import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonRepository } from '../data/person.repository';
import { PersonModel } from '../data/person.model';
import { PersonPaginate } from './type.pagination';
import paginationFunction from 'src/common/utils/pagination';
import { OpenSearch } from 'src/infrastructure/opensearch/client/openSearch';
import { PersonOpenSearchRespository } from '../data/person.ops.repository';
import { ContactService } from 'src/contacts/service/contact.service';
import { contactDTO } from 'src/contacts/rest/contactDTO';
import { DomainSession } from '@beamar/microlib';

@Injectable()
export class PersonService {
  constructor(
    private personRepository: PersonRepository,
    private readonly _connection: OpenSearch,
    private personOpenSearchRepository: PersonOpenSearchRespository,
    private contactService: ContactService,
  ) {}

  public async createPerson(item: PersonModel): Promise<PersonModel> {
    const createdPerson: PersonModel =
      await this.personRepository.createPerson(item);
    const parseToString = {
      ...createdPerson,
      tenant: DomainSession.getTenantId().toString(),
      personInfo: JSON.stringify(createdPerson.personInfo),
    };
    try {
      if (createdPerson.name !== '') {
        await this._connection.indexEntity(parseToString, 'person');
        console.log('success to save into open search');
      } else {
        throw new Error('Error creating person');
      }
    } catch (error) {
      console.log('error to save into open search ', error);
    }
    if (!createdPerson) {
      throw new Error('Error creating person');
    }
    return createdPerson;
  }

  public async getAllPersons(
    page: number,
    pageSize: number,
  ): Promise<PersonPaginate> {
    const persons: PersonModel[] = await this.personRepository.getAllPersons();
    if (persons.length > 0) {
      const dataPaginate = await paginationFunction(persons, page, pageSize);
      return dataPaginate;
    } else {
      throw new NotFoundException('Persons not founds');
    }
  }

  public async getPersonOPS(
    indexName: string,
    page: number,
    pageSize: number,
  ): Promise<any> {
    const getPersonsByIndex = await this._connection.getByIndex(
      indexName,
      DomainSession.getTenantId().toString(),
    );
    if (getPersonsByIndex.data.length > 0) {
      const parse = getPersonsByIndex.data.map((item) => {
        const parseInfoData = item.data;
        const parseInfo = {
          ...parseInfoData,
          personInfo: parseInfoData.personInfo
            ? JSON.parse(parseInfoData.personInfo)
            : '',
        };
        return parseInfo;
      });
      const dataPaginate = await paginationFunction(parse, page, pageSize);

      return dataPaginate;
    } else {
      throw new NotFoundException('Persons not founds');
    }
  }

  public async getPersonByNameOPS(
    indexName: string,
    input: string,
    page: number,
    pageSize: number,
  ): Promise<any> {
    const getPersonsByName = await this._connection.searchByName(
      indexName,
      input,
      DomainSession.getTenantId().toString(),
    );
    console.log(getPersonsByName);
    if (getPersonsByName.data.length > 0) {
      const parse = getPersonsByName.data.map((item) => {
        const parseInfoData = item.data;
        const parseInfo = {
          ...parseInfoData,
          personInfo: parseInfoData.personInfo
            ? JSON.parse(parseInfoData.personInfo)
            : '',
        };
        return parseInfo;
      });
      const dataPaginate = await paginationFunction(parse, page, pageSize);

      return dataPaginate;
    } else {
      throw new NotFoundException('Persons not founds');
    }
  }

  public async getPersonById(personId: string): Promise<PersonModel> {
    const person: PersonModel =
      await this.personRepository.getPersonById(personId);
    if (person) {
      return person;
    } else {
      throw new NotFoundException('Person not founds');
    }
  }

  public async deletePerson(indexName: string, personId: string): Promise<any> {
    try {
      await this.personRepository.deletePerson(personId);
      await this._connection.deleteByIndexIdAndTenant(
        indexName,
        personId,
        DomainSession.getTenantId().toString(),
      );
    } catch (error) {
      console.log(
        `Exception occurred while deleting person from index ${indexName}: ${error}`,
      );
      return {
        httpCode: 500,
        error: error,
      };
    }
  }

  public async updatePerson(
    personId: string,
    person: PersonModel,
  ): Promise<PersonModel> {
    try {
      const updatePerson: PersonModel =
        await this.personRepository.updatePerson(personId, person);
      await this.personOpenSearchRepository.updatePerson(personId, person);
      let getContactByPerson;
      try {
        getContactByPerson =
          await this.contactService.getContactByPersonId(personId);
      } catch (error) {
        // Manejar el error de obtener contactos aquí, si es necesario
        console.error('Error getting contacts:', error);
      }

      if (getContactByPerson && getContactByPerson.length > 0) {
        getContactByPerson.map(async (item: contactDTO) => {
          const personData = {
            id: personId,
            name: person.name,
            personInfo: {
              ...person.personInfo,
              personName: person.name,
            },
          };
          await this.contactService.putContactPerson(item.id, personData);
        });
      }

      return updatePerson;
    } catch (error) {
      console.log(error);
      throw new Error('Error updating person');
    }
  }
}
