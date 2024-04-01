import { InvoiceService } from "../service/invoice.service";
import { InvoiceDTO } from "./invoiceDTO";
export declare class InvoiceResource {
    private invoiceService;
    constructor(invoiceService: InvoiceService);
    createBlog(invoiceDTO: InvoiceDTO): Promise<any>;
    deleteInvoice(id: string, tenant: string): Promise<any>;
}
