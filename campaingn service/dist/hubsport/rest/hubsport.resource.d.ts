import { CredentialsHubsportDTO, ClientHubsportDTO } from './clientHubsportDTO';
import { HubsportService } from '../service/hubsport.service';
export declare class HubsportResource {
    private hubsportService;
    constructor(hubsportService: HubsportService);
    saveCredentialsHubsport(credentialsDTO: CredentialsHubsportDTO): Promise<CredentialsHubsportDTO>;
    saveClientHubsport(clientHubsportDTO: ClientHubsportDTO): Promise<boolean>;
    getAllClentsHubsportByTenant(tenant: string): Promise<any[]>;
    getCredentialsConfimations(tenant: string): Promise<any>;
    DeleteClientsHubsportById(id: string, tenant: string): Promise<boolean>;
}
