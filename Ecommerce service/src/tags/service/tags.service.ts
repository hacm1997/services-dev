import { Injectable, NotFoundException } from '@nestjs/common';
import { TagsRepository } from '../data/tags.repository';
import { TagsDTO } from '../rest/tagsDTO';
import getCookies from 'src/common/interceptors/getCookies/cookies';
import { TagsModel } from '../data/tags.model';

@Injectable()
export class TagService {
  constructor(private tagsRepository: TagsRepository) {}

  public async tagsCreate(
    tagsDTO: TagsDTO,
    request: Request,
  ): Promise<TagsDTO> {
    const tokenRequest = request.headers ?? request.headers;
    const tenant = getCookies(tokenRequest);
    const createdtags: TagsModel = await this.tagsRepository.TagCreate(
      this.mapDTOToDomain(tagsDTO),
      tenant,
    );
    if (!createdtags) {
      throw new Error('Error creating the tag');
    }
    return this.mapDomainToDTO(createdtags);
  }

  public async geTagsByVehicle(
    vehicle: string,
    request: Request,
  ): Promise<TagsDTO[]> {
    const tokenRequest = request.headers ?? request.headers;
    const tenant = getCookies(tokenRequest);
    const Tags: TagsModel[] = await this.tagsRepository.geTagsByVehicle(
      vehicle,
      tenant,
    );
    if (Tags.length > 0) {
      return Tags.map(this.mapDomainToDTO);
    } else {
      return [];
    }
  }

  public async getTagsByCode(
    tagCode: string,
    request: Request,
  ): Promise<TagsDTO[]> {
    const tokenRequest = request.headers ?? request.headers;
    const tenant = getCookies(tokenRequest);
    const Tags: TagsModel[] = await this.tagsRepository.getTagsByCode(
      tagCode,
      tenant,
    );
    if (Tags.length > 0) {
      return Tags.map(this.mapDomainToDTO);
    } else {
      return [];
    }
  }

  public async putTag(
    id: string,
    tag: TagsDTO,
    request: Request,
  ): Promise<any> {
    const tokenRequest = request.headers ?? request.headers;
    const tenant = getCookies(tokenRequest);
    const putTag = await this.tagsRepository.putTag(id, tag, tenant);
    return putTag;
  }

  public async deleteTag(request: Request, id: string) {
    const tokenRequest = request.headers ?? request.headers;
    const tenant = getCookies(tokenRequest);
    try {
      return await this.tagsRepository.deleteTag(tenant, id);
    } catch (error) {
      throw new NotFoundException('Tag not deleted');
    }
  }

  private mapDTOToDomain(tagsDTO: TagsDTO): TagsModel {
    const tagModel: TagsModel = {
      tags: tagsDTO.tags,
      description: tagsDTO.description,
    };
    return tagModel;
  }

  private mapDomainToDTO(tag: TagsModel): TagsDTO {
    const tagDTO: TagsModel = {
      tags: tag.tags,
      description: tag.description,
    };
    return tagDTO;
  }
}
