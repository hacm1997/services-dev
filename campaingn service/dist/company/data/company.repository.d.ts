import { ClientDynamodb } from 'src/infrastructure/dynamodb/client.dynamodb';
import { CompanyModel } from './company.model';
export declare class CompanyRepository {
    private fullClientDynamodb;
    static GROUP: string;
    constructor(fullClientDynamodb: ClientDynamodb);
    createCompany(item: CompanyModel): Promise<CompanyModel>;
    getAllCompanies(): Promise<CompanyModel[]>;
    getCompanyById(companyId: string): Promise<CompanyModel>;
    updateCompany(companyId: string, company: CompanyModel): Promise<CompanyModel>;
    deleteCompany(companyId: string): Promise<any>;
    private createNewItemFromDomainModel;
    private mapToDomain;
}
