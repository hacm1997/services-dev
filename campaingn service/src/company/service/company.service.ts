import { Injectable, NotFoundException } from '@nestjs/common';
import paginationFunction from 'src/common/utils/pagination';
import { CompanyRepository } from '../data/company.repository';
import { CompanyModel } from '../data/company.model';
import { CompanyPaginate } from './type.pagination';
import { ContactService } from 'src/contacts/service/contact.service';
import { contactDTO } from 'src/contacts/rest/contactDTO';
import { OpenSearch } from 'src/infrastructure/opensearch/client/openSearch';
import { CompanyOpenSearchRespository } from '../data/company.ops.repository';
import { DomainSession } from '@beamar/microlib';

@Injectable()
export class CompanyService {
  constructor(
    private companyRespostory: CompanyRepository,
    private contactService: ContactService,
    private companyOpenSearchRepository: CompanyOpenSearchRespository,
    private readonly _connection: OpenSearch,
  ) {}

  public async createCompany(item: CompanyModel): Promise<CompanyModel> {
    const createdCompany: CompanyModel =
      await this.companyRespostory.createCompany(item);
    const parseToString = {
      ...createdCompany,
      tenant: DomainSession.getTenantId().toString(),
      companyInfo: JSON.stringify(createdCompany.companyInfo),
    };
    try {
      if (createdCompany.name !== '') {
        await this._connection.indexEntity(parseToString, 'company');
        console.log('success to save company into open search');
      }
    } catch (error) {
      console.log('error to save into open search ', error);
    }
    if (!createdCompany) {
      throw new Error('Error creating company');
    }
    return createdCompany;
  }

  public async getAllCompanies(
    page: number,
    pageSize: number,
  ): Promise<CompanyPaginate> {
    const company: CompanyModel[] =
      await this.companyRespostory.getAllCompanies();
    if (company.length > 0) {
      const dataPaginate = await paginationFunction(company, page, pageSize);
      return dataPaginate;
    } else {
      throw new NotFoundException('Companies not founds');
    }
  }
  public async getAllNameCompanyOpenSearch(
    index: string,
    name: string,
  ): Promise<any> {
    const getCompanyByIndex = await this._connection.getByName(index, name);
    if (getCompanyByIndex.data.length > 0) {
      return getCompanyByIndex.data;
    } else {
      throw new NotFoundException('companies not founds');
    }
  }

  public async getCompanyById(CompanyId: string): Promise<CompanyModel> {
    const company: CompanyModel =
      await this.companyRespostory.getCompanyById(CompanyId);
    if (company) {
      return company;
    } else {
      throw new NotFoundException('Company not founds');
    }
  }

  public async getCompaniesOPS(
    indexName: string,
    page: number,
    pageSize: number,
  ): Promise<any> {
    const getCompanyByIndex = await this._connection.getByIndex(
      indexName,
      DomainSession.getTenantId().toString(),
    );
    if (getCompanyByIndex.data.length > 0) {
      const parse = getCompanyByIndex.data.map((item) => {
        const parseInfoData = item.data;
        const parseInfo = {
          ...parseInfoData,
          companyInfo: parseInfoData.companyInfo
            ? JSON.parse(parseInfoData.companyInfo)
            : '',
        };
        return parseInfo;
      });
      const dataPaginate = await paginationFunction(parse, page, pageSize);

      return dataPaginate;
    } else {
      throw new NotFoundException('Companies not founds');
    }
  }

  public async getCompanyByNameOPS(
    indexName: string,
    input: string,
    page: number,
    pageSize: number,
  ): Promise<any> {
    const getCompanyByName = await this._connection.searchByName(
      indexName,
      input,
      DomainSession.getTenantId().toString(),
    );
    if (getCompanyByName.data.length > 0) {
      const parse = getCompanyByName.data.map((item) => {
        const parseInfoData = item.data;
        const parseInfo = {
          ...parseInfoData,
          companyInfo: parseInfoData.companyInfo
            ? JSON.parse(parseInfoData.companyInfo)
            : '',
        };
        return parseInfo;
      });
      const dataPaginate = await paginationFunction(parse, page, pageSize);

      return dataPaginate;
    } else {
      throw new NotFoundException('companies not founds');
    }
  }

  public async updateCompany(
    companyId: string,
    company: CompanyModel,
  ): Promise<CompanyModel> {
    try {
      //Update company in DynamoDB
      const updateCompany: CompanyModel =
        await this.companyRespostory.updateCompany(companyId, company);

      // update company in Open Search
      await this.companyOpenSearchRepository.updateCompany(companyId, company);

      // Update company in contacts
      let getContactsByCompany;
      try {
        getContactsByCompany =
          await this.contactService.getContactByCompanyId(companyId);
      } catch (error) {
        // Manejar el error de obtener contactos aquí, si es necesario
        console.error('Error getting contacts:', error);
      }

      if (getContactsByCompany && getContactsByCompany.length > 0) {
        getContactsByCompany.map(async (item: contactDTO) => {
          const companyData = {
            id: companyId,
            name: company.name,
            companyInfo: {
              ...company.companyInfo,
              companyName: company.name,
            },
          };
          await this.contactService.putContactCompany(item.id, companyData);
        });
      }
      return updateCompany;
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteCompany(
    indexName: string,
    companyId: string,
  ): Promise<any> {
    try {
      await this.companyRespostory.deleteCompany(companyId);
      await this._connection.deleteByIndexIdAndTenant(
        indexName,
        companyId,
        DomainSession.getTenantId().toString(),
      );
    } catch (error) {
      console.log(
        `Exception occurred while deleting company from index ${indexName}: ${error}`,
      );
      return {
        httpCode: 500,
        error: error,
      };
    }
  }
}
