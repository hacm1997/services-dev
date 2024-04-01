import { TagService } from '../service/tags.service';
import { TagsDTO } from './tagsDTO';
import { TagRules } from '../util/tagsRules';
export declare class TagsResource {
    private tagService;
    private tagRules;
    constructor(tagService: TagService, tagRules: TagRules);
    createTag(tagDTO: TagsDTO, request: Request): Promise<TagsDTO>;
    getTagsById(vehicle: string, request: Request): Promise<TagsDTO>;
    getTagsByCode(tagCode: string, request: Request): Promise<TagsDTO>;
    getAllTags(request: Request, page: string, pageSize: string, tagName: string): Promise<any>;
    puttag(id: string, tagDTO: TagsDTO, request: Request): Promise<any>;
    deleteTag(request: Request, id: string): Promise<any>;
}
