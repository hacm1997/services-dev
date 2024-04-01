import { Injectable, NotFoundException } from '@nestjs/common';
import getCookies from './getCookies';
import { BlogService } from '../service/blog.service';
import { Categories } from './blog.interface';

@Injectable()
export class BlogRules {
  constructor(private blogService: BlogService) {}

  async getBlogCategories(
    categories: Categories,
    request: Request,
    page?: number,
    pageSize?: number,
    status?: string,
  ) {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);

    try {
      const blogs = await this.blogService.getAllBlogs(request);

      if (!blogs || blogs.length === 0) {
        throw new NotFoundException('Blogs was not found');
      }

      const parsedResult = blogs.map((item: any) => {
        const extraInfo = item.extraInfo;
        return { ...item, extraInfo };
      });

      let filteredResult: any[];

      if (
        categories.list_catgories !== undefined &&
        categories.list_catgories.length > 0
      ) {
        filteredResult = parsedResult.filter((item) => {
          const categoryMatches = categories.list_catgories.some((category) =>
            item.extraInfo.category.includes(category),
          );

          // Agregar filtro de status si se proporciona
          const statusMatches = !status || item.status === status;

          return categoryMatches && statusMatches;
        });
      } else {
        filteredResult = blogs
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .filter((item) => {
            // Agregar filtro de status si se proporciona
            const statusMatches = !status || item.status === status;

            return statusMatches;
          });
      }

      // Número total de páginas
      const totalPages = Math.ceil(filteredResult.length / pageSize);

      if (page && (page < 1 || page > totalPages)) {
        throw new NotFoundException('Invalid page number');
      }

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedResult = filteredResult.slice(startIndex, endIndex);

      return {
        data: paginatedResult,
        totalPages: totalPages,
        currentPage: page,
      };
    } catch {
      throw new NotFoundException(
        'Blogs or category for ' + getTenantId + ' not found',
      );
    }
  }
}
