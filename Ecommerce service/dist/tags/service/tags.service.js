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
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const tags_repository_1 = require("../data/tags.repository");
const cookies_1 = require("../../common/interceptors/getCookies/cookies");
let TagService = exports.TagService = class TagService {
    constructor(tagsRepository) {
        this.tagsRepository = tagsRepository;
    }
    async tagsCreate(tagsDTO, request) {
        const tokenRequest = request.headers ?? request.headers;
        const tenant = (0, cookies_1.default)(tokenRequest);
        const createdtags = await this.tagsRepository.TagCreate(this.mapDTOToDomain(tagsDTO), tenant);
        if (!createdtags) {
            throw new Error('Error creating the tag');
        }
        return this.mapDomainToDTO(createdtags);
    }
    async geTagsByVehicle(vehicle, request) {
        const tokenRequest = request.headers ?? request.headers;
        const tenant = (0, cookies_1.default)(tokenRequest);
        const Tags = await this.tagsRepository.geTagsByVehicle(vehicle, tenant);
        if (Tags.length > 0) {
            return Tags.map(this.mapDomainToDTO);
        }
        else {
            return [];
        }
    }
    async getTagsByCode(tagCode, request) {
        const tokenRequest = request.headers ?? request.headers;
        const tenant = (0, cookies_1.default)(tokenRequest);
        const Tags = await this.tagsRepository.getTagsByCode(tagCode, tenant);
        if (Tags.length > 0) {
            return Tags.map(this.mapDomainToDTO);
        }
        else {
            return [];
        }
    }
    async putTag(id, tag, request) {
        const tokenRequest = request.headers ?? request.headers;
        const tenant = (0, cookies_1.default)(tokenRequest);
        const putTag = await this.tagsRepository.putTag(id, tag, tenant);
        return putTag;
    }
    async deleteTag(request, id) {
        const tokenRequest = request.headers ?? request.headers;
        const tenant = (0, cookies_1.default)(tokenRequest);
        try {
            return await this.tagsRepository.deleteTag(tenant, id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Tag not deleted');
        }
    }
    mapDTOToDomain(tagsDTO) {
        const tagModel = {
            tags: tagsDTO.tags,
            description: tagsDTO.description,
        };
        return tagModel;
    }
    mapDomainToDTO(tag) {
        const tagDTO = {
            tags: tag.tags,
            description: tag.description,
        };
        return tagDTO;
    }
};
exports.TagService = TagService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tags_repository_1.TagsRepository])
], TagService);
//# sourceMappingURL=tags.service.js.map