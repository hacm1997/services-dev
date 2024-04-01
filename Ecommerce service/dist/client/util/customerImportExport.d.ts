import { CustomerInterface } from './customer.interfaces';
import { Response } from 'express';
export declare function importCustomersFunction(file: any): Promise<CustomerInterface[]>;
export declare function exportCustomersFunction(response: Response, customers: CustomerInterface[], tenantID: string): Promise<void>;
