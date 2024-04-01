import { Injectable } from '@nestjs/common';
import {
  CredentialsHubsportDTO,
  ClientHubsportDTO,
} from '../rest/clientHubsportDTO';
import {
  CredentialsHubsportModel,
  ClientHubsportModel,
} from '../data/hubsport.model';
import { HubsportRepository } from '../data/hubsport.repository';

@Injectable()
export class HubsportService {
  constructor(private hubsportRepository: HubsportRepository) {}
  public async saveCredentialsHubsport(
    credentialsDTO: CredentialsHubsportDTO,
  ): Promise<CredentialsHubsportDTO> {
    // console.log('credentialsDTO => ', credentialsDTO);
    const credentialsHubsport: CredentialsHubsportModel =
      await this.hubsportRepository.saveCredentialsCreate(
        this.mapDTOToDomain(credentialsDTO),
      );
    if (!credentialsHubsport) {
      throw new Error('Error creating the email campaign');
    }
    return this.mapDomainToDTO(credentialsHubsport);
  }
  public async saveClientHubsport(
    clientDTO: ClientHubsportDTO,
  ): Promise<boolean> {
    const res = await this.hubsportRepository.saveClientCreate(
      this.mapDTOToDomainClient(clientDTO),
    );
    if (!res) {
      throw new Error('Error creating the client in Hubsport');
    }
    return res;
  }
  public async getAllClentsHubsportByTenant(tenant: string): Promise<any[]> {
    const clients: ClientHubsportModel[] =
      await this.hubsportRepository.getAllClentsHubsportByTenant(tenant);
    if (clients.length > 0) {
      return clients;
    } else {
      return [];
    }
  }
  public async getCredentialsConfimations(tenant: string): Promise<any> {
    const res: boolean =
      await this.hubsportRepository.getCredentialsConfimations(tenant);
    return res;
  }
  public async DeleteClientsHubsportById(
    id: string,
    tenant: string,
  ): Promise<boolean> {
    const res: boolean =
      await this.hubsportRepository.DeleteClientsHubsportById(id, tenant);
    return res;
  }

  private mapDomainToDTO(
    credentials: CredentialsHubsportModel,
  ): CredentialsHubsportDTO {
    const credentialsModelDTO: CredentialsHubsportDTO = {
      tenantName: credentials.tenantName,
      apiKey: credentials.apiKey,
    };
    return credentialsModelDTO;
  }
  private mapDTOToDomain(
    credentialsDTO: CredentialsHubsportDTO,
  ): CredentialsHubsportModel {
    const credentialsModel: CredentialsHubsportModel = {
      tenantName: credentialsDTO.tenantName,
      apiKey: credentialsDTO.apiKey,
    };
    return credentialsModel;
  }
  private mapDTOToDomainClient(
    clientDTO: ClientHubsportDTO,
  ): ClientHubsportModel {
    const clientModel: ClientHubsportModel = {
      firstname: clientDTO.firstname,
      email: clientDTO.email,
      phone: clientDTO.phone,
      state: clientDTO.state,
      city: clientDTO.city,
      address: clientDTO.address,
      servicio: clientDTO.servicio,
      noticia: clientDTO.noticia,
      tenant: clientDTO.tenant,
    };
    return clientModel;
  }
}
