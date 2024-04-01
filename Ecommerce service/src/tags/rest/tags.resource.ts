import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagService } from '../service/tags.service';
import { TagsDTO } from './tagsDTO';
import { TagRules } from '../util/tagsRules';

@ApiTags('tag')
@Controller('tags')
export class TagsResource {
  constructor(private tagService: TagService, private tagRules: TagRules) {}

  @Post('')
  @ApiBody({ type: 'TagDTO', required: true })
  @ApiResponse({
    status: 201,
    type: 'TagDTO',
  })
  @ApiResponse({ status: 404, description: 'Cannot create Tag.' })
  @ApiOperation({})
  public async createTag(
    @Body() tagDTO: TagsDTO,
    @Req() request: Request,
  ): Promise<TagsDTO> {
    const Tag: TagsDTO = await this.tagService.tagsCreate(tagDTO, request);
    if (!Tag) {
      throw new NotFoundException('Tag not found');
    }

    return Tag;
  }

  @Get('/filter')
  @ApiResponse({ status: 200, type: 'TagsDTO' })
  @ApiResponse({ status: 404, description: 'Tags not found' })
  @ApiOperation({ summary: 'Get Tags by vehicle' })
  public async getTagsById(
    @Query('vehicle') vehicle: string,
    @Req() request: Request,
  ): Promise<TagsDTO> {
    const tags: any = await this.tagService.geTagsByVehicle(vehicle, request);

    if (!tags) {
      throw new NotFoundException('Tags not found');
    }

    return tags;
  }

  @Get('/search')
  @ApiResponse({ status: 200, type: 'TagsDTO' })
  @ApiResponse({ status: 404, description: 'Tags not found' })
  @ApiOperation({ summary: 'Get Tags by vehicle' })
  public async getTagsByCode(
    @Query('code') tagCode: string,
    @Req() request: Request,
  ): Promise<TagsDTO> {
    const tags: any = await this.tagService.getTagsByCode(tagCode, request);

    if (!tags) {
      throw new NotFoundException('Tags not found');
    }

    return tags;
  }

  @Get('')
  @ApiResponse({ status: 200, type: 'TagsDTO' })
  @ApiResponse({ status: 404, description: 'Tags not found' })
  @ApiOperation({ summary: 'Get Tags by vehicle' })
  public async getAllTags(
    @Req() request: Request,
    @Query('page') page: string,
    @Query('limit') pageSize: string,
    @Query('tagName') tagName: string,
  ): Promise<any> {
    const tags: any = await this.tagRules.tagPerPage(
      request,
      Number(page),
      Number(pageSize),
      tagName,
    );

    if (!tags) {
      throw new NotFoundException('Tags not found');
    }

    return tags;
  }

  @Put('')
  @ApiResponse({ status: 200, type: 'TagsDTO' })
  @ApiResponse({ status: 404, description: 'The tag cannot be edited' })
  @ApiOperation({ summary: 'Edit tag' })
  public async puttag(
    @Query('id') id: string,
    @Body() tagDTO: TagsDTO,
    @Req() request: Request,
  ): Promise<any> {
    return await this.tagService.putTag(id, tagDTO, request);
  }

  @Delete('')
  @ApiResponse({ status: 200, type: 'string' })
  @ApiResponse({ status: 404, description: 'Tag to deleted not found' })
  @ApiOperation({ summary: 'Deleted Tag' })
  public async deleteTag(
    @Req() request: Request,
    @Query('id') id: string,
  ): Promise<any> {
    try {
      return await this.tagService.deleteTag(request, id);
    } catch (error) {
      throw new NotFoundException('Tag not deleted');
    }
  }
}
