import { TagsRepository } from '../data/tags.repository';
export declare class TagRules {
    private tagsRepository;
    constructor(tagsRepository: TagsRepository);
    tagPerPage(request: Request, page?: number, pageSize?: number, tagName?: string): Promise<{
        data: any;
        totalPages: number;
        currentPage: number;
    }>;
    tagsFilters(filteredResult: any, tagDescription: string): Promise<any>;
}
