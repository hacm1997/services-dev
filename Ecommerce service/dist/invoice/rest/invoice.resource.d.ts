import { InvoiceUsecase } from './invoice.usecase';
import { InvoiceModelDTO } from './invoice.model.dto';
import { InvoiceFilters } from '../service/filters.invoice';
import { FilterInvoiceOptions } from '../util/invoice.interfaces';
import { WompiService } from '../util/wompi.service';
export declare class InvoiceResource {
    private invoiceUseCase;
    private invoiceFilters;
    private wompiService;
    constructor(invoiceUseCase: InvoiceUsecase, invoiceFilters: InvoiceFilters, wompiService: WompiService);
    createInvoice(invoiceDTO: InvoiceModelDTO, request: Request): Promise<InvoiceModelDTO>;
    getAllInvoices(request: Request): Promise<InvoiceModelDTO[] | null>;
    getInvoicesPerPage(request: Request, page: string, size: string): Promise<any>;
    getAllInvoicesById(request: Request, code: string): Promise<InvoiceModelDTO[] | null>;
    deleteInvoice(request: Request, id: string): Promise<any>;
    putInvoiceStatus(InvoiceID: string, status: string, request: Request): Promise<InvoiceModelDTO>;
    putInvoiceRef(InvoiceID: string, reference: string, payment_method: string, request: Request): Promise<InvoiceModelDTO>;
    getFilterParams(request: Request, page: string, pageSize: string, filterOptions: FilterInvoiceOptions): Promise<any>;
    getWompiSignature(currency: string, price: string, integrity: string): Promise<any>;
}
