import { CustomerGateway } from 'src/client/rest/customer.gateway';
import { CustomerRepository } from 'src/client/data/customer.repository';
import { CustomerModel } from 'src/client/data/customer.model';
export interface resultPaginationCustomer {
    data: CustomerModel[];
    totalPage: number;
}
export declare class CustomerAdapter extends CustomerGateway {
    private customerRepository;
    constructor(customerRepository: CustomerRepository);
    createCustomer(client: CustomerModel): Promise<CustomerModel>;
    getAllCustomerByID(id: string, tenantID: string): Promise<CustomerModel[]>;
    getAllCustomers(tenantID: string): Promise<CustomerModel[]>;
    fetchResultsWithPagination(request: Request, pageNumber: number, pageSize: number): Promise<resultPaginationCustomer>;
    putCustomer(client: any, tenantID: string): Promise<any>;
    deleteCustomer(id: string, tenantID: string): Promise<void>;
    saveDataToDynamoDB(data: any, tenantID: string): Promise<any>;
    private mapToData;
    private mapToDomain;
}
