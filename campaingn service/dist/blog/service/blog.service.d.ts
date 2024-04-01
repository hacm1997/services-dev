import { BlogRepository } from '../data/blog.repository';
import { BlogDTO } from '../rest/blogDTO';
export interface resultPaginationBlogs {
    data: BlogDTO[];
    totalPage: number;
}
export declare class BlogService {
    private blogRepository;
    constructor(blogRepository: BlogRepository);
    blogCreate(blogDTO: BlogDTO, request: Request): Promise<BlogDTO>;
    getAllBlogs(request: Request): Promise<BlogDTO[]>;
    getBlogsPerPage(request: Request, pageNumber: number, pageSize: number): Promise<resultPaginationBlogs>;
    getBlogById(id: string, request: Request): Promise<BlogDTO>;
    putBlog(id: string, blogDTO: BlogDTO, request: Request): Promise<BlogDTO>;
    putBlogStatus(id: string, status: string, request: Request): Promise<any>;
    private mapDTOToDomain;
    deleteBlog(request: Request, id: string): Promise<any>;
    private mapDomainToDTO;
}
