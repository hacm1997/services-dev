import { CustomerModelData } from 'src/infrastructure/model/customer/customer.model.data';
export default function transformCustomerData(itmes: any): Promise<CustomerModelData[]>;
export declare function transformCustomerDataPaginate(customerObject: any): Promise<CustomerModelData[]>;
