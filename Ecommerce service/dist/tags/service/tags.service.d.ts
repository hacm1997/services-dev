import { TagsRepository } from '../data/tags.repository';
import { TagsDTO } from '../rest/tagsDTO';
export declare class TagService {
    private tagsRepository;
    constructor(tagsRepository: TagsRepository);
    tagsCreate(tagsDTO: TagsDTO, request: Request): Promise<TagsDTO>;
    geTagsByVehicle(vehicle: string, request: Request): Promise<TagsDTO[]>;
    getTagsByCode(tagCode: string, request: Request): Promise<TagsDTO[]>;
    putTag(id: string, tag: TagsDTO, request: Request): Promise<any>;
    deleteTag(request: Request, id: string): Promise<any>;
    private mapDTOToDomain;
    private mapDomainToDTO;
}
