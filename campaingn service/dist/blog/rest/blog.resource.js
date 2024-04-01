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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogResource = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const blog_service_1 = require("../service/blog.service");
const rules_1 = require("../utils/rules");
let BlogResource = class BlogResource {
    constructor(blogService, blogRules) {
        this.blogService = blogService;
        this.blogRules = blogRules;
    }
    async createBlog(blogDTO, request) {
        const blog = await this.blogService.blogCreate(blogDTO, request);
        if (!blog) {
            throw new common_1.NotFoundException('blog not found');
        }
        return blog;
    }
    async getAllBlogs(request, page, size) {
        const blogs = await this.blogService.getBlogsPerPage(request, Number(page), Number(size));
        if (!blogs) {
            throw new common_1.NotFoundException('Blogs was not found');
        }
        return blogs;
    }
    async getBlogById(id, request) {
        const blog = await this.blogService.getBlogById(id, request);
        if (!blog) {
            throw new common_1.NotFoundException('blog not found');
        }
        return blog;
    }
    async getByCategories(categories, request, page, size, status) {
        const getProducts = await this.blogRules.getBlogCategories(categories, request, Number(page), Number(size), status);
        return getProducts;
    }
    async putBlog(id, blogDTO, request) {
        return await this.blogService.putBlog(id, blogDTO, request);
    }
    async putBlogStatus(id, status, request) {
        return await this.blogService.putBlogStatus(id, status, request);
    }
    async deleteBlog(request, id) {
        try {
            return await this.blogService.deleteBlog(request, id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Blog not deleted');
        }
    }
};
exports.BlogResource = BlogResource;
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiBody)({ type: 'BlogDTO', required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: 'BlogDTO',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cannot create blog.' }),
    (0, swagger_1.ApiOperation)({}),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], BlogResource.prototype, "createBlog", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'BlogDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blogs was not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get blogs by tenant' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String, String]),
    __metadata("design:returntype", Promise)
], BlogResource.prototype, "getAllBlogs", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'BlogDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'blog not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get blog by id and tenant' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", Promise)
], BlogResource.prototype, "getBlogById", null);
__decorate([
    (0, common_1.Post)('/filter'),
    (0, swagger_1.ApiBody)({ type: 'BlogDTO', required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Blogs found',
        type: 'BlogDTO',
    }),
    (0, swagger_1.ApiOperation)({ description: 'Get products by categories' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request, String, String, String]),
    __metadata("design:returntype", Promise)
], BlogResource.prototype, "getByCategories", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'BlogDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'The blog cannot be edited' }),
    (0, swagger_1.ApiOperation)({ summary: 'Edit blog' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Request]),
    __metadata("design:returntype", Promise)
], BlogResource.prototype, "putBlog", null);
__decorate([
    (0, common_1.Put)('/status/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'BlogDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'The blog cannot be edited' }),
    (0, swagger_1.ApiOperation)({ summary: 'Edit blog' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Request]),
    __metadata("design:returntype", Promise)
], BlogResource.prototype, "putBlogStatus", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog to deleted not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Deleted blog' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String]),
    __metadata("design:returntype", Promise)
], BlogResource.prototype, "deleteBlog", null);
exports.BlogResource = BlogResource = __decorate([
    (0, swagger_1.ApiTags)('blog'),
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blog_service_1.BlogService,
        rules_1.BlogRules])
], BlogResource);
//# sourceMappingURL=blog.resource.js.map