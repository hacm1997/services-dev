import { ProfileModel } from './profile.model';
import { ClientDynamodb } from '../../infrastructure/dynamodb/client.dynamodb';
export declare class ProfileRepository {
    private fullClientDynamodb;
    static GROUP: string;
    constructor(fullClientDynamodb: ClientDynamodb);
    profileCreate(profile: ProfileModel): Promise<ProfileModel>;
    profileFindByEmail(email: string): Promise<ProfileModel | null>;
    private mapToData;
    private mapToDomain;
}
