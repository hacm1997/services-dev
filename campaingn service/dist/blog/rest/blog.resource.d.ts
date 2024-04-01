import { BlogDTO } from './blogDTO';
import { BlogService } from '../service/blog.service';
import { Categories } from '../utils/blog.interface';
import { BlogRules } from '../utils/rules';
export declare class BlogResource {
    private blogService;
    private blogRules;
    constructor(blogService: BlogService, blogRules: BlogRules);
    createBlog(blogDTO: BlogDTO, request: Request): Promise<BlogDTO>;
    getAllBlogs(request: Request, page: string, size: string): Promise<any>;
    getBlogById(id: string, request: Request): Promise<BlogDTO>;
    getByCategories(categories: Categories, request: Request, page: string, size: string, status: string): Promise<any>;
    putBlog(id: string, blogDTO: BlogDTO, request: Request): Promise<BlogDTO>;
    putBlogStatus(id: string, status: string, request: Request): Promise<BlogDTO>;
    deleteBlog(request: Request, id: string): Promise<any>;
}
