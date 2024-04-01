import { CompanyRepository } from '../data/company.repository';
import { CompanyModel } from '../data/company.model';
import { CompanyPaginate } from './type.pagination';
import { ContactService } from 'src/contacts/service/contact.service';
import { OpenSearch } from 'src/infrastructure/opensearch/client/openSearch';
import { CompanyOpenSearchRespository } from '../data/company.ops.repository';
export declare class CompanyService {
    private companyRespostory;
    private contactService;
    private companyOpenSearchRepository;
    private readonly _connection;
    constructor(companyRespostory: CompanyRepository, contactService: ContactService, companyOpenSearchRepository: CompanyOpenSearchRespository, _connection: OpenSearch);
    createCompany(item: CompanyModel): Promise<CompanyModel>;
    getAllCompanies(page: number, pageSize: number): Promise<CompanyPaginate>;
    getAllNameCompanyOpenSearch(index: string, name: string): Promise<any>;
    getCompanyById(CompanyId: string): Promise<CompanyModel>;
    getCompaniesOPS(indexName: string, page: number, pageSize: number): Promise<any>;
    getCompanyByNameOPS(indexName: string, input: string, page: number, pageSize: number): Promise<any>;
    updateCompany(companyId: string, company: CompanyModel): Promise<CompanyModel>;
    deleteCompany(indexName: string, companyId: string): Promise<any>;
}
