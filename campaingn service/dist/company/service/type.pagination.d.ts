import { CompanyModel } from '../data/company.model';
export interface CompanyPaginate {
    data: CompanyModel[];
    totalPages: number;
    currentPage: number;
}
