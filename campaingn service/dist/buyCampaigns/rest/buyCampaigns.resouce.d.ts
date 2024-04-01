import { BuyCampaignDTO } from 'src/buyCampaigns/rest/buyCampaignDTO';
import { BuyCampaignService } from '../service/buyCampaigns.service';
export declare class BuyCampaignResource {
    private _buyCampaignService;
    constructor(_buyCampaignService: BuyCampaignService);
    createCampaign(buycampaignDTO: BuyCampaignDTO): Promise<BuyCampaignDTO>;
    getEmaiquantity(): Promise<any>;
    updateStatusInvoice(payment_reference: string): Promise<any>;
}
