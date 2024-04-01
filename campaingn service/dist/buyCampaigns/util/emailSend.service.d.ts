import { CampaignModel } from 'src/campaign/data/campaign.model';
import { TrackingRepository } from 'src/trackingEmail/data/trackingEmail.repository';
export declare class EmailSendService {
    private trackingRepository;
    constructor(trackingRepository: TrackingRepository);
    sendEmail(params: any): Promise<any>;
    fetchDataAndSendEmail(campaign: CampaignModel, emailQuantity: number): Promise<any>;
    private createUrlTrakingEmail;
    private createUrlNotificationTrakingEmail;
}
