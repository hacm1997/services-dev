"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const blog_repository_1 = require("../data/blog.repository");
const getCookies_1 = require("../utils/getCookies");
let BlogService = class BlogService {
    constructor(blogRepository) {
        this.blogRepository = blogRepository;
    }
    async blogCreate(blogDTO, request) {
        const tokenRequest = request.headers ?? request.headers;
        const tenant = (0, getCookies_1.default)(tokenRequest);
        const createdBlog = await this.blogRepository.blogCreate(this.mapDTOToDomain(blogDTO), tenant);
        if (!createdBlog) {
            throw new Error('Error creating the blog');
        }
        return this.mapDomainToDTO(createdBlog);
    }
    async getAllBlogs(request) {
        const tokenRequest = request.headers ?? request.headers;
        const tenant = (0, getCookies_1.default)(tokenRequest);
        const Blogs = await this.blogRepository.getAllBlogs(tenant);
        if (Blogs.length > 0) {
            return Blogs.map(this.mapDomainToDTO);
        }
        else {
            return [];
        }
    }
    async getBlogsPerPage(request, pageNumber, pageSize) {
        const tokenRequest = request.headers ?? request.headers;
        const tenant = (0, getCookies_1.default)(tokenRequest);
        const Blogs = await this.blogRepository.fetchResultsWithPagination(tenant, pageNumber, pageSize);
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
            }
            else {
                return {
                    data: [],
                    totalPage: 0,
                };
            }
        }
        else {
            return {
                data: [],
                totalPage: 0,
            };
        }
    }
    async getBlogById(id, request) {
        const tokenRequest = request.headers ?? request.headers;
        const tenant = (0, getCookies_1.default)(tokenRequest);
        const blog = await this.blogRepository.getBlogById(id, tenant);
        return this.mapDomainToDTO(blog);
    }
    async putBlog(id, blogDTO, request) {
        const tokenRequest = request.headers ?? request.headers;
        const tenant = (0, getCookies_1.default)(tokenRequest);
        const putBlog = await this.blogRepository.putBlog(id, blogDTO, tenant);
        return this.mapDomainToDTO(putBlog);
    }
    async putBlogStatus(id, status, request) {
        const tokenRequest = request.headers ?? request.headers;
        const tenant = (0, getCookies_1.default)(tokenRequest);
        const putBlog = await this.blogRepository.putBlogStatus(id, status, tenant);
        return putBlog;
    }
    mapDTOToDomain(blogDTO) {
        const blogModel = {
            title: blogDTO.title,
            image: blogDTO.image,
            content: blogDTO.content,
            status: blogDTO.status,
            extraInfo: blogDTO?.extraInfo,
            createdAt: blogDTO.createdAt,
        };
        return blogModel;
    }
    async deleteBlog(request, id) {
        const tokenRequest = request.headers ?? request.headers;
        const tenant = (0, getCookies_1.default)(tokenRequest);
        try {
            return await this.blogRepository.deleteBlog(tenant, id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Blog not deleted');
        }
    }
    mapDomainToDTO(blog) {
        const blogModelDTO = {
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
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [blog_repository_1.BlogRepository])
], BlogService);
//# sourceMappingURL=blog.service.js.map