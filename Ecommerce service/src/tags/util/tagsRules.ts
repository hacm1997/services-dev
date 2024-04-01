import getCookies from 'src/common/interceptors/getCookies/cookies';
import { TagsRepository } from '../data/tags.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

interface tagData {
  tags: string;
  description: string;
}
@Injectable()
export class TagRules {
  constructor(private tagsRepository: TagsRepository) {}

  async tagPerPage(
    request: Request,
    page?: number,
    pageSize?: number,
    tagName?: string,
  ) {
    const tokenRequest = request.headers ?? request.headers;
    const getTenantId = getCookies(tokenRequest);

    try {
      const tags = await this.tagsRepository.getAllTags(getTenantId);
      if (!tags || tags.length === 0) {
        throw new NotFoundException('Invoices not found');
      }

      const tagsFilered = await this.tagsFilters(tags, tagName);
      const totalPages = Math.ceil(tagsFilered.length / pageSize);

      if (page && (page < 1 || page > totalPages)) {
        throw new NotFoundException('Invalid page number');
      }
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedResult = tagsFilered.slice(startIndex, endIndex);

      return {
        data: paginatedResult,
        totalPages: totalPages,
        currentPage: page,
      };
    } catch (error) {
      throw new NotFoundException('Tags for ' + getTenantId + ' not found');
    }
  }

  async tagsFilters(filteredResult: any, tagDescription: string) {
    let result = filteredResult;
    //Filter by tag descriptionName
    if (tagDescription && tagDescription.length > 1) {
      result = result.filter((item: tagData) => {
        const result_tagDescription = item.description
          .toLowerCase()
          .includes(tagDescription);
        const result_tag = item.tags.toLowerCase().includes(tagDescription);
        return result_tagDescription || result_tag;
      });
    }
    return result;
  }
}
