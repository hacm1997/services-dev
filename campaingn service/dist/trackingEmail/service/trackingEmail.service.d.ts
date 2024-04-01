import { TrackingRepository } from '../data/trackingEmail.repository';
import { CampaignRepository } from 'src/campaign/data/campaign.repository';
export declare class TrackingEmailService {
    private trackingRepository;
    private campaignRepository;
    constructor(trackingRepository: TrackingRepository, campaignRepository: CampaignRepository);
    getImgPixel(uniqueCode: string): Promise<any>;
    putStatusNotificationTrackingEmail(uniqueCode: any): Promise<any>;
    getStatisticsShipping(idCampaign: string): Promise<any>;
}
