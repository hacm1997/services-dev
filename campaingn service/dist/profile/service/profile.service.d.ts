import { ProfileDTO } from '../rest/profileDTO';
import { ProfileRepository } from '../data/profile.repository';
export declare class ProfileService {
    private profileRepository;
    constructor(profileRepository: ProfileRepository);
    profileCreate(profileDTO: ProfileDTO): Promise<ProfileDTO>;
    private mapDTOToDomain;
    private mapDomainToDTO;
}
