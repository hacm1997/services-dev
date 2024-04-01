import { CredentialsHubsportModel, ClientHubsportModel } from './hubsport.model';
import { ClientDynamodb } from '../../infrastructure/dynamodb/client.dynamodb';
import { SendClientHubsportService } from '../service/hubsportSend.service';
export declare class HubsportRepository {
    private fullClientDynamodb;
    private sendClientHubsportService;
    static GROUP: string;
    constructor(fullClientDynamodb: ClientDynamodb, sendClientHubsportService: SendClientHubsportService);
    saveCredentialsCreate(credencial: CredentialsHubsportModel): Promise<CredentialsHubsportModel>;
    saveClientCreate(client: ClientHubsportModel): Promise<boolean>;
    getAllClentsHubsportByTenant(tenant: string): Promise<any[]>;
    getCredentialsConfimations(tenant: string): Promise<any>;
    DeleteClientsHubsportById(id: string, tenant: string): Promise<boolean>;
    private searchTokenByTenant;
    private mapToDomain;
    private createNewItemFromDomainModel;
    private createNewItemFromDomainModelClient;
}
