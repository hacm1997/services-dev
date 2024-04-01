import { CompanyService } from '../service/company.service';
import { CompanyModel } from '../data/company.model';
import { CompanyPaginate } from '../service/type.pagination';
export declare class CompanyController {
    private companyService;
    constructor(companyService: CompanyService);
    createContact(company: CompanyModel): Promise<CompanyModel>;
    getAllContacts(page: number, pageSize: number): Promise<CompanyPaginate>;
    getAllCompanyOpenSearch(index: string, page: number, pageSize: number): Promise<CompanyPaginate>;
    getAllNameCompanyOpenSearch(index: string, name: string): Promise<CompanyPaginate>;
    getCompanyById(companyId: string): Promise<CompanyModel>;
    getContactsByName(index: string, input: string, page: number, pageSize: number): Promise<CompanyPaginate>;
    activateSubscription(companyId: string, company: CompanyModel): Promise<CompanyModel>;
    deletePersonOPS(companyId: string, index: string): Promise<any>;
}
