import { BlogModel } from './blog.model';
import { ClientDynamodb } from 'src/infrastructure/dynamodb/client.dynamodb';
import { BlogDTO } from '../rest/blogDTO';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
interface PaginationResult {
    items: BlogModel[];
    lastEvaluatedKey: DocumentClient.Key;
}
interface ExtendedPaginationResult {
    results: PaginationResult[];
    totalPages: number;
}
export declare class BlogRepository {
    private fullClientDynamodb;
    static GROUP: string;
    constructor(fullClientDynamodb: ClientDynamodb);
    blogCreate(blog: BlogModel, tenant: string): Promise<BlogModel>;
    getAllBlogs(tenant: string): Promise<any[]>;
    getBlogsByPage(tenant: string, pageNumber: number, pageSize: number, lastEvaluatedKey?: DocumentClient.Key): Promise<PaginationResult>;
    fetchResultsWithPagination(tenant: string, pageNumber: number, pageSize: number, lastEvaluatedKey?: DocumentClient.Key, accumulatedResults?: PaginationResult[]): Promise<ExtendedPaginationResult>;
    private getLastEvaluatedKey;
    getBlogById(id: string, tenant: string): Promise<BlogModel>;
    private getBlogItemByKey;
    putBlog(id: string, blog: BlogDTO, tenant: string): Promise<BlogModel>;
    putBlogStatus(id: string, status: string, tenant: string): Promise<any>;
    deleteBlog(tenant: string, sid: string): Promise<any>;
    private createNewItemFromDomainModel;
    private mapToDomain;
}
export {};
