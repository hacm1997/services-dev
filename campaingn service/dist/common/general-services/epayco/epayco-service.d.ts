import { BuyCampaignModel } from 'src/buyCampaigns/data/buyCampaigns.model';
import { BuyCampaignRepository } from 'src/buyCampaigns/data/buyCampaigns.repository';
export declare class EpaycoService {
    private buyCampaingRepository;
    constructor(buyCampaingRepository: BuyCampaignRepository);
    epaycoResponse(buyDto: BuyCampaignModel): Promise<string>;
}
