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
exports.TagsResource = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tags_service_1 = require("../service/tags.service");
const tagsRules_1 = require("../util/tagsRules");
let TagsResource = exports.TagsResource = class TagsResource {
    constructor(tagService, tagRules) {
        this.tagService = tagService;
        this.tagRules = tagRules;
    }
    async createTag(tagDTO, request) {
        const Tag = await this.tagService.tagsCreate(tagDTO, request);
        if (!Tag) {
            throw new common_1.NotFoundException('Tag not found');
        }
        return Tag;
    }
    async getTagsById(vehicle, request) {
        const tags = await this.tagService.geTagsByVehicle(vehicle, request);
        if (!tags) {
            throw new common_1.NotFoundException('Tags not found');
        }
        return tags;
    }
    async getTagsByCode(tagCode, request) {
        const tags = await this.tagService.getTagsByCode(tagCode, request);
        if (!tags) {
            throw new common_1.NotFoundException('Tags not found');
        }
        return tags;
    }
    async getAllTags(request, page, pageSize, tagName) {
        const tags = await this.tagRules.tagPerPage(request, Number(page), Number(pageSize), tagName);
        if (!tags) {
            throw new common_1.NotFoundException('Tags not found');
        }
        return tags;
    }
    async puttag(id, tagDTO, request) {
        return await this.tagService.putTag(id, tagDTO, request);
    }
    async deleteTag(request, id) {
        try {
            return await this.tagService.deleteTag(request, id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Tag not deleted');
        }
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiBody)({ type: 'TagDTO', required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: 'TagDTO',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cannot create Tag.' }),
    (0, swagger_1.ApiOperation)({}),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], TagsResource.prototype, "createTag", null);
__decorate([
    (0, common_1.Get)('/filter'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'TagsDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tags not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get Tags by vehicle' }),
    __param(0, (0, common_1.Query)('vehicle')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", Promise)
], TagsResource.prototype, "getTagsById", null);
__decorate([
    (0, common_1.Get)('/search'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'TagsDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tags not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get Tags by vehicle' }),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", Promise)
], TagsResource.prototype, "getTagsByCode", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'TagsDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tags not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get Tags by vehicle' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('tagName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String, String, String]),
    __metadata("design:returntype", Promise)
], TagsResource.prototype, "getAllTags", null);
__decorate([
    (0, common_1.Put)(''),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'TagsDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'The tag cannot be edited' }),
    (0, swagger_1.ApiOperation)({ summary: 'Edit tag' }),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Request]),
    __metadata("design:returntype", Promise)
], TagsResource.prototype, "puttag", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tag to deleted not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Deleted Tag' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String]),
    __metadata("design:returntype", Promise)
], TagsResource.prototype, "deleteTag", null);
exports.TagsResource = TagsResource = __decorate([
    (0, swagger_1.ApiTags)('tag'),
    (0, common_1.Controller)('tags'),
    __metadata("design:paramtypes", [tags_service_1.TagService, tagsRules_1.TagRules])
], TagsResource);
//# sourceMappingURL=tags.resource.js.map