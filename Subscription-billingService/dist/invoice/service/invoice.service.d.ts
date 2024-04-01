import { InvoiceRepository } from "../data/invoice.repository";
import { InvoiceDTO } from "../rest/invoiceDTO";
import { TenantService } from "src/common/getCookies/tenantService";
export declare class InvoiceService {
    private readonly tenantService;
    private invoiceRepository;
    constructor(tenantService: TenantService, invoiceRepository: InvoiceRepository);
    createInvoice(invoice: InvoiceDTO, newTenant?: string): Promise<InvoiceDTO>;
    deleteInvoice(invoiceId: string, reqTenant?: string): Promise<any>;
    updateInvoice(invoiceCode: string, invoiceId: string, newTenant: string, invoiceData: any): Promise<any>;
    private mapDTOToDomain;
    private mapDomainToDTO;
}
