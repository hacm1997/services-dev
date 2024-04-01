import { CustomerUsecase } from '../rest/customer.usecase';
import { FilterCustomerOptions } from '../util/customer.interfaces';
export declare class CustomerFilters {
    private customerUseCase;
    constructor(customerUseCase: CustomerUsecase);
    searchCustomerFilters(request: Request, page?: number, pageSize?: number, options?: FilterCustomerOptions): Promise<{
        data: any;
        totalPages: number;
        currentPage: number;
    }>;
    applyFilters(filteredResult: any, options: FilterCustomerOptions): Promise<any>;
}
