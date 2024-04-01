import { BlogService } from '../service/blog.service';
import { Categories } from './blog.interface';
export declare class BlogRules {
    private blogService;
    constructor(blogService: BlogService);
    getBlogCategories(categories: Categories, request: Request, page?: number, pageSize?: number, status?: string): Promise<{
        data: any[];
        totalPages: number;
        currentPage: number;
    }>;
}
