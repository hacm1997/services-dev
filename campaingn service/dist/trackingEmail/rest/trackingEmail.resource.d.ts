import { TrackingEmailService } from '../service/trackingEmail.service';
export declare class TrackingController {
    private trackingService;
    constructor(trackingService: TrackingEmailService);
    createdContactTakingEmail(uniqueCode: string): Promise<any>;
    putStatusNotificationTrackingEmail(uniqueCode: string): Promise<any>;
    getStatisticsShipping(idCampaign: string): Promise<any>;
}
