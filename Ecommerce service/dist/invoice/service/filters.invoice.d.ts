import { InvoiceUsecase } from '../rest/invoice.usecase';
import { FilterInvoiceOptions } from '../util/invoice.interfaces';
export declare class InvoiceFilters {
    private invoiceUseCase;
    constructor(invoiceUseCase: InvoiceUsecase);
    searchFiltersInvoice(request: Request, page?: number, pageSize?: number, options?: FilterInvoiceOptions): Promise<{
        data: any;
        totalPages: number;
        currentPage: number;
    }>;
    applyFilters(filteredResult: any, options: FilterInvoiceOptions): Promise<any>;
}
