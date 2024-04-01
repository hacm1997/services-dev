import { EpaycoService } from './epayco.service';
import { InvoiceModel } from '../data/invoice.model';
import { UpdateProductInventory } from './update-invenory';
import { InvoiceRepository } from '../data/invoice.repository';
import { WompiService } from './wompi.service';
export declare class CronJobService {
    private readonly epaycoService;
    private readonly wompiService;
    private updateProductInventory;
    private invoiceRepository;
    private jobs;
    private isRunning;
    constructor(epaycoService: EpaycoService, wompiService: WompiService, updateProductInventory: UpdateProductInventory, invoiceRepository: InvoiceRepository);
    startCronJob(invoiceDto: InvoiceModel, tenantID: string, request: Request): Promise<void>;
    stopCronJob(jobKey: string): void;
}
