import { ClientDynamodb } from 'src/infrastructure/dynamodb/client';
import { TagsModel } from './tags.model';
export declare class TagsRepository {
    private fullClientDynamodb;
    static GROUP: string;
    constructor(fullClientDynamodb: ClientDynamodb);
    TagCreate(tag: TagsModel, tenant: string): Promise<TagsModel>;
    geTagsByVehicle(vehicle: string, tenant: string): Promise<any[]>;
    getTagsByCode(tagCode: string, tenant: string): Promise<any[]>;
    getAllTags(tenant: string): Promise<any[]>;
    putTag(id: string, tag: TagsModel, tenant: string): Promise<any>;
    deleteTag(tenant: string, sid: string): Promise<any>;
    private createNewItemFromDomainModel;
    private mapToDomain;
    private mapToDomainAll;
}
