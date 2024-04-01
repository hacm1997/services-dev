import { EmailCampaignDTO } from './emailCampaignDTO';
import { CampaignService } from '../service/campaign.service';
export declare class CampaignResource {
    private campaignService;
    constructor(campaignService: CampaignService);
    createCampaign(campaignDTO: EmailCampaignDTO): Promise<EmailCampaignDTO>;
    putCampaing(campaignDTO: EmailCampaignDTO): Promise<EmailCampaignDTO>;
    getAllCampaigns(): Promise<EmailCampaignDTO[]>;
    getCampaignById(id: string): Promise<EmailCampaignDTO>;
    sendEmailCampaign(id: string): Promise<any>;
    deleteCampaing(id: string): Promise<any>;
}
