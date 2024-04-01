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
import { BlogDTO } from './blogDTO';
import { BlogService } from '../service/blog.service';
import { Categories } from '../utils/blog.interface';
import { BlogRules } from '../utils/rules';

@ApiTags('blog')
@Controller('blogs')
export class BlogResource {
  constructor(
    private blogService: BlogService,
    private blogRules: BlogRules,
  ) {}

  @Post('')
  @ApiBody({ type: 'BlogDTO', required: true })
  @ApiResponse({
    status: 201,
    type: 'BlogDTO',
  })
  @ApiResponse({ status: 404, description: 'Cannot create blog.' })
  @ApiOperation({})
  public async createBlog(
    @Body() blogDTO: BlogDTO,
    @Req() request: Request,
  ): Promise<BlogDTO> {
    const blog: BlogDTO = await this.blogService.blogCreate(blogDTO, request);
    if (!blog) {
      throw new NotFoundException('blog not found');
    }

    return blog;
  }

  @Get('')
  @ApiResponse({ status: 200, type: 'BlogDTO' })
  @ApiResponse({ status: 404, description: 'Blogs was not found' })
  @ApiOperation({ summary: 'Get blogs by tenant' })
  public async getAllBlogs(
    @Req() request: Request,
    @Query('page') page: string,
    @Query('limit') size: string,
  ): Promise<any> {
    const blogs: any = await this.blogService.getBlogsPerPage(
      request,
      Number(page),
      Number(size),
    );

    if (!blogs) {
      throw new NotFoundException('Blogs was not found');
    }
    return blogs;
  }

  @Get('/:id')
  @ApiResponse({ status: 200, type: 'BlogDTO' })
  @ApiResponse({ status: 404, description: 'blog not found' })
  @ApiOperation({ summary: 'Get blog by id and tenant' })
  public async getBlogById(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<BlogDTO> {
    const blog: BlogDTO = await this.blogService.getBlogById(id, request);

    if (!blog) {
      throw new NotFoundException('blog not found');
    }

    return blog;
  }

  @Post('/filter')
  @ApiBody({ type: 'BlogDTO', required: true })
  @ApiResponse({
    status: 201,
    description: 'Blogs found',
    type: 'BlogDTO',
  })
  @ApiOperation({ description: 'Get products by categories' })
  public async getByCategories(
    @Body() categories: Categories,
    @Req() request: Request,
    @Query('page') page: string,
    @Query('limit') size: string,
    @Query('status') status: string,
  ): Promise<any> {
    const getProducts = await this.blogRules.getBlogCategories(
      categories,
      request,
      Number(page),
      Number(size),
      status,
    );
    return getProducts;
  }

  @Put('/:id')
  @ApiResponse({ status: 200, type: 'BlogDTO' })
  @ApiResponse({ status: 404, description: 'The blog cannot be edited' })
  @ApiOperation({ summary: 'Edit blog' })
  public async putBlog(
    @Param('id') id: string,
    @Body() blogDTO: BlogDTO,
    @Req() request: Request,
  ): Promise<BlogDTO> {
    return await this.blogService.putBlog(id, blogDTO, request);
  }

  @Put('/status/:id')
  @ApiResponse({ status: 200, type: 'BlogDTO' })
  @ApiResponse({ status: 404, description: 'The blog cannot be edited' })
  @ApiOperation({ summary: 'Edit blog' })
  public async putBlogStatus(
    @Param('id') id: string,
    @Query('status') status: string,
    @Req() request: Request,
  ): Promise<BlogDTO> {
    return await this.blogService.putBlogStatus(id, status, request);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, type: 'string' })
  @ApiResponse({ status: 404, description: 'Blog to deleted not found' })
  @ApiOperation({ summary: 'Deleted blog' })
  public async deleteBlog(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      return await this.blogService.deleteBlog(request, id);
    } catch (error) {
      throw new NotFoundException('Blog not deleted');
    }
  }
}
