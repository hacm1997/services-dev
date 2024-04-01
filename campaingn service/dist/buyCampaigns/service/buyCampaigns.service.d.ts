import { BuyCampaignDTO } from '../rest/buyCampaignDTO';
import { BuyCampaignRepository } from '../data/buyCampaigns.repository';
export declare class BuyCampaignService {
    private _buyCampaignRepository;
    constructor(_buyCampaignRepository: BuyCampaignRepository);
    buyCampaignCreate(_buyCampaigntDTO: BuyCampaignDTO): Promise<BuyCampaignDTO>;
    getEmailquantity(): Promise<any>;
    getInvoiceReference(payment_reference: string): Promise<any>;
    private mapDTOToDomain;
    private mapDomainToDTO;
}
