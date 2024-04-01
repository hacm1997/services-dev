import { CustomerUsecase } from '../rest/customer.usecase';
import { CustomerInterface } from 'src/invoice/data/customer.interface';
import { CustomerModelDTO } from '../rest/customer.model.dto';
import { ProductInterface } from 'src/invoice/data/product.interface';
export declare class CreateCustomerFromInvoice {
    private customerUseCase;
    constructor(customerUseCase: CustomerUsecase);
    saveCustomer(customer: CustomerInterface, request: Request, tenant: string, products: ProductInterface[], total: number): Promise<CustomerModelDTO>;
}
