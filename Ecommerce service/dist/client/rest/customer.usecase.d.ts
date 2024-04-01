import { CustomerGateway } from './customer.gateway';
import { CustomerModelDTO } from './customer.model.dto';
import { Response } from 'express';
export declare class CustomerUsecase {
    private customerGateway;
    constructor(customerGateway: CustomerGateway);
    createCustomer(customerDTO: CustomerModelDTO, request: Request): Promise<CustomerModelDTO>;
    getAllCustomerByID(id: string, request: Request): Promise<CustomerModelDTO[]>;
    getAllCustomers(request: Request, page: number, size: number): Promise<any>;
    getAllCustomerFilter(request: Request): Promise<CustomerModelDTO[]>;
    putCustomer(customerDTO: CustomerModelDTO, request: Request): Promise<CustomerModelDTO>;
    deleteCustomer(request: Request, id: string): Promise<any>;
    importCustomers(file: any, request: Request): Promise<{
        message: string;
    }>;
    exportCustomers(request: Request, response: Response): Promise<{
        message: string;
    }>;
    private mapDTOToDomain;
    private mapDomainToDTO;
}
