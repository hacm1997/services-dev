import { InvoiceGateway } from './invoice.gateway';
import { InvoiceModelDTO } from './invoice.model.dto';
import { CronJobService } from '../util/cron.util';
export declare class InvoiceUsecase {
    private invoiceGateway;
    private cronJobService;
    constructor(invoiceGateway: InvoiceGateway, cronJobService: CronJobService);
    createInvoice(invoiceDTO: InvoiceModelDTO, request: Request): Promise<InvoiceModelDTO>;
    getAllInvoices(request: Request): Promise<InvoiceModelDTO[]>;
    getInvoicesPerPage(request: Request, page: number, size: number): Promise<any>;
    getAllInvoiceById(request: Request, code: string): Promise<InvoiceModelDTO[]>;
    deleteInvoice(request: Request, id: string): Promise<any>;
    putInvoiceStatus(invoiceID: string, status: string, request: Request): Promise<any>;
    putInvoiceReference(invoiceID: string, reference: string, payment_method: string, request: Request): Promise<any>;
    private mapDTOToDomain;
    private mapDomainToDTO;
}
