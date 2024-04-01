import { ClientDynamodb } from 'src/infrastructure/dynamodb/client';
import { CustomerModelData } from 'src/infrastructure/model/customer/customer.model.data';
import { AppService } from 'src/app.service';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { CustomerModel } from './customer.model';
interface PaginationResult {
    items: CustomerModelData[] | any;
    lastEvaluatedKey: DocumentClient.Key;
}
interface ExtendedPaginationResult {
    results: PaginationResult[];
    totalPages: number;
}
export interface CustomerRepository {
    createCustomer: (customer: CustomerModelData) => Promise<CustomerModelData>;
    getAllCustomerByID: (id: string, tenantID: string) => Promise<CustomerModelData[]>;
    getAllCustomers: (tenantID: string) => Promise<CustomerModelData[]>;
    putCustomer: (customer: CustomerModelData, tenantID: string, customerID?: string) => Promise<CustomerModelData>;
    fetchResultsWithPagination(getTenantId: string, pageNumber: number, pageSize: number): Promise<any>;
    deleteCustomer: (id: string, tenantID: string) => Promise<any>;
    saveDataToDynamoDB: (data: any, tenantID: string) => Promise<any>;
}
export declare class CustomerRepositoryImpl implements CustomerRepository {
    private fullClientDynamodb;
    constructor(fullClientDynamodb: ClientDynamodb);
    static GROUP: string;
    static appService: AppService;
    createCustomer(customer: CustomerModelData): Promise<CustomerModelData>;
    getAllCustomerByID(id: string, tenantID: string): Promise<CustomerModelData[] | any>;
    getAllCustomers(tenantID: string): Promise<CustomerModelData[] | null>;
    getAllCustomersPerPage(tenantID: string, pageNumber: number, pageSize: number, lastEvaluatedKey?: DocumentClient.Key): Promise<PaginationResult>;
    fetchResultsWithPagination(tenant: string, pageNumber: number, pageSize: number, lastEvaluatedKey?: DocumentClient.Key, accumulatedResults?: PaginationResult[]): Promise<ExtendedPaginationResult>;
    putCustomer(customer: CustomerModelData | any, tenantID: string, customerID?: string): Promise<CustomerModelData>;
    deleteCustomer(id: string, tenantID: string): Promise<any>;
    saveDataToDynamoDB(data: CustomerModel[], tenantID: string): Promise<void>;
    private removeRowNum;
    private createNewItemFromDomainModel;
}
export {};
