import { BuyCampaignModel } from './buyCampaigns.model';
import { ClientDynamodb } from '../../infrastructure/dynamodb/client.dynamodb';
import { AvailableAmoutCampaigns } from '../util/availableAmoutCampaigns';
import { CronJobService } from 'src/common/general-services/cron/cron-job.service';
import { SearchInvoiceService } from '../service/searchInvoice.service';
export declare class BuyCampaignRepository {
    private fullClientDynamodb;
    private availableAmoutCampaigns;
    private cronJobService;
    private searchInvoiceService;
    static GROUP: string;
    constructor(fullClientDynamodb: ClientDynamodb, availableAmoutCampaigns: AvailableAmoutCampaigns, cronJobService: CronJobService, searchInvoiceService: SearchInvoiceService);
    buyCampaignCreate(buyCampaign: BuyCampaignModel): Promise<BuyCampaignModel>;
    buyCampaignFirstCreate(): Promise<any>;
    getEmailquantity(): Promise<any>;
    getCurrentInvoice(): Promise<BuyCampaignModel>;
    getInvoiceByIdReference(payment_reference: string): Promise<BuyCampaignModel>;
    updateStatusInvoice(payment_reference: string, status: string, quantity: number): Promise<any>;
    updateAmountCurrent(quantity: number): Promise<any>;
    private mapToDomain;
    private createNewItemFromDomainModel;
    private mapToFirstInvoice;
}
