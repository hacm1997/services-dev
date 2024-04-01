import { CustomerUsecase } from './customer.usecase';
import { CustomerModelDTO } from './customer.model.dto';
import { FilterCustomerOptions } from '../util/customer.interfaces';
import { CustomerFilters } from '../service/customer.filter';
import { Response } from 'express';
export declare class CustomerResource {
    private customerUseCase;
    private customerFilters;
    constructor(customerUseCase: CustomerUsecase, customerFilters: CustomerFilters);
    createCustomer(customerDTO: CustomerModelDTO, request: Request): Promise<CustomerModelDTO>;
    getAllCustomerByID(id: string, request: Request): Promise<CustomerModelDTO[] | null>;
    getAllCustomers(request: Request, page: string, size: string): Promise<CustomerModelDTO[] | null>;
    putCustomer(customerDTO: CustomerModelDTO, request: Request): Promise<CustomerModelDTO>;
    deleteCustomer(request: Request, id: string): Promise<any>;
    getFilterParams(request: Request, page: string, pageSize: string, filterOptions: FilterCustomerOptions): Promise<any>;
    uploadFile(file: any, request: Request): Promise<{
        message: string;
    }>;
    exportCustomer(request: Request, response: Response): Promise<any>;
}
