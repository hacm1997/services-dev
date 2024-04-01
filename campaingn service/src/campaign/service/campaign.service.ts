import { Injectable, NotFoundException } from '@nestjs/common';
import { EmailCampaignDTO } from '../rest/emailCampaignDTO';
import { CampaignModel } from '../data/campaign.model';
import { CampaignRepository } from '../data/campaign.repository';
@Injectable()
export class CampaignService {
  constructor(private campaignRepository: CampaignRepository) {}

  public async campaignCreate(
    campaigntDTO: EmailCampaignDTO,
  ): Promise<EmailCampaignDTO> {
    const createdCampaign: CampaignModel =
      await this.campaignRepository.campaignCreate(
        this.mapDTOToDomain(campaigntDTO),
      );
    if (!createdCampaign) {
      throw new Error('Error creating the email campaign');
    }
    return this.mapDomainToDTO(createdCampaign);
  }

  public async putCampaing(
    campaignDTO: EmailCampaignDTO,
  ): Promise<EmailCampaignDTO> {
    const putCampaing: CampaignModel =
      await this.campaignRepository.putCampaing(campaignDTO);
    return this.mapDomainToDTO(putCampaing);
  }

  public async getAllCampaigns(): Promise<EmailCampaignDTO[]> {
    const campaigns: CampaignModel[] =
      await this.campaignRepository.getAllCampaigns();
    if (campaigns.length > 0) {
      return campaigns.map(this.mapDomainToDTO);
    } else {
      return [];
    }
  }
  public async getCampaignById(id: string): Promise<EmailCampaignDTO> {
    const campaigns: CampaignModel =
      await this.campaignRepository.getCampaignsById(id);
    return this.mapDomainToDTO(campaigns);
  }
  public async sendEmailCampaigns(id: string): Promise<any> {
    return await this.campaignRepository.sendEmailCampaigns(id);
  }

  public async deleteCampaign(id: string): Promise<any> {
    try {
      return await this.campaignRepository.deleteCampaign(id);
    } catch (error) {
      throw new NotFoundException('Campaign not deleted');
    }
  }

  private mapDTOToDomain(campaignDTO: EmailCampaignDTO): CampaignModel {
    const campaignModel: CampaignModel = {
      title: campaignDTO.title,
      subject: campaignDTO.subject,
      body: campaignDTO.body,
      file: campaignDTO?.file ?? '',
    };
    return campaignModel;
  }

  private mapDomainToDTO(campaign: CampaignModel): EmailCampaignDTO {
    const campaignModelDTO: EmailCampaignDTO = {
      id: campaign.id,
      title: campaign.title,
      subject: campaign.subject,
      body: campaign.body,
      file: campaign.file ?? '',
    };
    return campaignModelDTO;
  }
}
