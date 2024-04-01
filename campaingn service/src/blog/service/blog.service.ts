import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogRepository } from '../data/blog.repository';
import { BlogDTO } from '../rest/blogDTO';
import { BlogModel } from '../data/blog.model';
import getCookies from '../utils/getCookies';

export interface resultPaginationBlogs {
  data: BlogDTO[];
  totalPage: number;
}

@Injectable()
export class BlogService {
  constructor(private blogRepository: BlogRepository) {}

  public async blogCreate(
    blogDTO: BlogDTO,
    request: Request,
  ): Promise<BlogDTO> {
    const tokenRequest = request.headers ?? request.headers;
    const tenant = getCookies(tokenRequest);
    const createdBlog: BlogModel = await this.blogRepository.blogCreate(
      this.mapDTOToDomain(blogDTO),
      tenant,
    );
    if (!createdBlog) {
      throw new Error('Error creating the blog');
    }
    return this.mapDomainToDTO(createdBlog);
  }

  public async getAllBlogs(request: Request): Promise<BlogDTO[]> {
    const tokenRequest = request.headers ?? request.headers;
    const tenant = getCookies(tokenRequest);
    const Blogs: BlogModel[] = await this.blogRepository.getAllBlogs(tenant);
    if (Blogs.length > 0) {
      return Blogs.map(this.mapDomainToDTO);
    } else {
      return [];
    }
  }

  public async getBlogsPerPage(
    request: Request,
    pageNumber: number,
    pageSize: number,
  ): Promise<resultPaginationBlogs> {
    const tokenRequest = request.headers ?? request.headers;
    const tenant = getCookies(tokenRequest);
    const Blogs: any = await this.blogRepository.fetchResultsWithPagination(
      tenant,
      pageNumber,
      pageSize,
    );
    let countNonEmptyItems = 0;

    Blogs.results.forEach((result) => {
      if (result.items && result.items.length > 0) {
        countNonEmptyItems++;
      }
    });

    if (Blogs.results[pageNumber - 1]) {
      if (Blogs.results[pageNumber - 1].items.length > 0) {
        return {
          data: Blogs.results[pageNumber - 1].items.map(this.mapDomainToDTO),
          totalPage: countNonEmptyItems,
        };
      } else {
        return {
          data: [],
          totalPage: 0,
        };
      }
    } else {
      return {
        data: [],
        totalPage: 0,
      };
    }
  }

  public async getBlogById(id: string, request: Request): Promise<BlogDTO> {
    const tokenRequest = request.headers ?? request.headers;
    const tenant = getCookies(tokenRequest);
    const blog: BlogModel = await this.blogRepository.getBlogById(id, tenant);
    return this.mapDomainToDTO(blog);
  }

  public async putBlog(
    id: string,
    blogDTO: BlogDTO,
    request: Request,
  ): Promise<BlogDTO> {
    const tokenRequest = request.headers ?? request.headers;
    const tenant = getCookies(tokenRequest);
    const putBlog: BlogModel = await this.blogRepository.putBlog(
      id,
      blogDTO,
      tenant,
    );
    return this.mapDomainToDTO(putBlog);
  }

  public async putBlogStatus(
    id: string,
    status: string,
    request: Request,
  ): Promise<any> {
    const tokenRequest = request.headers ?? request.headers;
    const tenant = getCookies(tokenRequest);
    const putBlog = await this.blogRepository.putBlogStatus(id, status, tenant);
    return putBlog;
  }

  private mapDTOToDomain(blogDTO: BlogDTO): BlogModel {
    const blogModel: BlogModel = {
      title: blogDTO.title,
      image: blogDTO.image,
      content: blogDTO.content,
      status: blogDTO.status,
      extraInfo: blogDTO?.extraInfo,
      createdAt: blogDTO.createdAt,
    };
    return blogModel;
  }

  public async deleteBlog(request: Request, id: string) {
    const tokenRequest = request.headers ?? request.headers;
    const tenant = getCookies(tokenRequest);
    try {
      return await this.blogRepository.deleteBlog(tenant, id);
    } catch (error) {
      throw new NotFoundException('Blog not deleted');
    }
  }

  private mapDomainToDTO(blog: BlogModel): BlogDTO {
    const blogModelDTO: BlogModel = {
      id: blog.id,
      title: blog.title,
      image: blog.image,
      content: blog.content,
      status: blog.status,
      extraInfo: blog.extraInfo,
      createdAt: blog.createdAt,
    };
    return blogModelDTO;
  }
}
