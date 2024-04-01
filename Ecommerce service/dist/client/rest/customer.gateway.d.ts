import { CustomerModel } from '../data/customer.model';
export declare abstract class CustomerGateway {
    abstract createCustomer(customer: CustomerModel): Promise<CustomerModel>;
    private readonly dynamoDB;
    abstract getAllCustomerByID(id: string, tenantID: string): Promise<CustomerModel[]>;
    abstract getAllCustomers(tenantID: string): Promise<CustomerModel[]>;
    abstract putCustomer(customer: CustomerModel, tenantID: string): Promise<CustomerModel>;
    abstract fetchResultsWithPagination(request: Request, pageNumber: number, pageSize: number): Promise<any>;
    abstract deleteCustomer(tenantID: string, id: string): Promise<any>;
    abstract saveDataToDynamoDB(file: any, tenantID: string): Promise<any>;
}
