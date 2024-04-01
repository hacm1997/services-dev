import { ClientDynamodb } from 'src/infrastructure/dynamodb/client.dynamodb';
export declare class TrackingRepository {
    private fullClientDynamodb;
    static GROUP: string;
    constructor(fullClientDynamodb: ClientDynamodb);
    getTrackingEmail(uniqueCode: string): Promise<any>;
    createRegisterSendEmail(item: any): Promise<any>;
    getContactByUniqueCode(uniqueCode: string): Promise<any>;
    putStatusNotificationTrackingEmail(uniqueCode: any): Promise<any>;
    putStatusTrackingEmail(item: any): Promise<any>;
    getStatisticsShipping(idCampaign: string, startSid: string, campaign: any, quantity: number): Promise<any>;
    private createNewItemFromDomainModel;
    private mapToDomain;
    private mapToDomainCampaigns;
    private percentaje;
}
