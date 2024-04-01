import { ProfileDTO } from './profileDTO';
import { ProfileService } from '../service/profile.service';
export declare class ProfileResource {
    private profileService;
    constructor(profileService: ProfileService);
    createProfile(profileDTO: ProfileDTO): Promise<ProfileDTO>;
}
