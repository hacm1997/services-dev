import { CredentialsHubsportDTO, ClientHubsportDTO } from '../rest/clientHubsportDTO';
import { HubsportRepository } from '../data/hubsport.repository';
export declare class HubsportService {
    private hubsportRepository;
    constructor(hubsportRepository: HubsportRepository);
    saveCredentialsHubsport(credentialsDTO: CredentialsHubsportDTO): Promise<CredentialsHubsportDTO>;
    saveClientHubsport(clientDTO: ClientHubsportDTO): Promise<boolean>;
    getAllClentsHubsportByTenant(tenant: string): Promise<any[]>;
    getCredentialsConfimations(tenant: string): Promise<any>;
    DeleteClientsHubsportById(id: string, tenant: string): Promise<boolean>;
    private mapDomainToDTO;
    private mapDTOToDomain;
    private mapDTOToDomainClient;
}
