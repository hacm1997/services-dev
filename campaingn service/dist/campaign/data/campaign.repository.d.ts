import { CampaignModel } from './campaign.model';
import { ClientDynamodb } from '../../infrastructure/dynamodb/client.dynamodb';
import { EmailSendService } from 'src/buyCampaigns/util/emailSend.service';
import { BuyCampaignRepository } from 'src/buyCampaigns/data/buyCampaigns.repository';
import { AvailableAmoutCampaigns } from 'src/buyCampaigns/util/availableAmoutCampaigns';
export declare class CampaignRepository {
    private fullClientDynamodb;
    private emailSendService;
    private buyCampaignRepository;
    private _availableAmoutCampaigns;
    static GROUP: string;
    constructor(fullClientDynamodb: ClientDynamodb, emailSendService: EmailSendService, buyCampaignRepository: BuyCampaignRepository, _availableAmoutCampaigns: AvailableAmoutCampaigns);
    campaignCreate(campaign: CampaignModel): Promise<CampaignModel>;
    putCampaing(campaign: any): Promise<CampaignModel>;
    getAllCampaigns(): Promise<any[]>;
    getCampaignsById(id: string): Promise<CampaignModel>;
    private getCampaingItemByKey;
    getCampaingItemByKeyTrackingEmail(id: string): Promise<any>;
    sendEmailCampaigns(id: string): Promise<any>;
    deleteCampaign(id: string): Promise<any>;
    private mapToDomain;
    private createNewItemFromDomainModel;
}
