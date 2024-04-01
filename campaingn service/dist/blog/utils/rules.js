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
exports.BlogRules = void 0;
const common_1 = require("@nestjs/common");
const getCookies_1 = require("./getCookies");
const blog_service_1 = require("../service/blog.service");
let BlogRules = class BlogRules {
    constructor(blogService) {
        this.blogService = blogService;
    }
    async getBlogCategories(categories, request, page, pageSize, status) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, getCookies_1.default)(tokenRequest);
        try {
            const blogs = await this.blogService.getAllBlogs(request);
            if (!blogs || blogs.length === 0) {
                throw new common_1.NotFoundException('Blogs was not found');
            }
            const parsedResult = blogs.map((item) => {
                const extraInfo = item.extraInfo;
                return { ...item, extraInfo };
            });
            let filteredResult;
            if (categories.list_catgories !== undefined &&
                categories.list_catgories.length > 0) {
                filteredResult = parsedResult.filter((item) => {
                    const categoryMatches = categories.list_catgories.some((category) => item.extraInfo.category.includes(category));
                    const statusMatches = !status || item.status === status;
                    return categoryMatches && statusMatches;
                });
            }
            else {
                filteredResult = blogs
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .filter((item) => {
                    const statusMatches = !status || item.status === status;
                    return statusMatches;
                });
            }
            const totalPages = Math.ceil(filteredResult.length / pageSize);
            if (page && (page < 1 || page > totalPages)) {
                throw new common_1.NotFoundException('Invalid page number');
            }
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedResult = filteredResult.slice(startIndex, endIndex);
            return {
                data: paginatedResult,
                totalPages: totalPages,
                currentPage: page,
            };
        }
        catch {
            throw new common_1.NotFoundException('Blogs or category for ' + getTenantId + ' not found');
        }
    }
};
exports.BlogRules = BlogRules;
exports.BlogRules = BlogRules = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogRules);
//# sourceMappingURL=rules.js.map