import { Injectable } from '@nestjs/common';
import { ProfileDTO } from '../rest/profileDTO';
import { ProfileModel } from '../data/profile.model';
import { ProfileRepository } from '../data/profile.repository';
@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  public async profileCreate(profileDTO: ProfileDTO): Promise<ProfileDTO> {
    const createdCampaign: ProfileModel =
      await this.profileRepository.profileCreate(
        this.mapDTOToDomain(profileDTO),
      );
    return this.mapDomainToDTO(createdCampaign);
  }
  private mapDTOToDomain(profileDTO: ProfileDTO): ProfileModel {
    const campaignModel: ProfileModel = {
      id: profileDTO.id,
      name: profileDTO.name,
      email: profileDTO.email,
    };
    return campaignModel;
  }

  private mapDomainToDTO(profile: any): ProfileDTO {
    const profileModelDTO: ProfileDTO = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
    };
    return profileModelDTO;
  }
}
