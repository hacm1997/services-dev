import { EmailCampaignDTO } from '../rest/emailCampaignDTO';
import { CampaignRepository } from '../data/campaign.repository';
export declare class CampaignService {
    private campaignRepository;
    constructor(campaignRepository: CampaignRepository);
    campaignCreate(campaigntDTO: EmailCampaignDTO): Promise<EmailCampaignDTO>;
    putCampaing(campaignDTO: EmailCampaignDTO): Promise<EmailCampaignDTO>;
    getAllCampaigns(): Promise<EmailCampaignDTO[]>;
    getCampaignById(id: string): Promise<EmailCampaignDTO>;
    sendEmailCampaigns(id: string): Promise<any>;
    deleteCampaign(id: string): Promise<any>;
    private mapDTOToDomain;
    private mapDomainToDTO;
}
