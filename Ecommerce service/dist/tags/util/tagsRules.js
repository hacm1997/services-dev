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
exports.TagRules = void 0;
const cookies_1 = require("../../common/interceptors/getCookies/cookies");
const tags_repository_1 = require("../data/tags.repository");
const common_1 = require("@nestjs/common");
let TagRules = exports.TagRules = class TagRules {
    constructor(tagsRepository) {
        this.tagsRepository = tagsRepository;
    }
    async tagPerPage(request, page, pageSize, tagName) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        try {
            const tags = await this.tagsRepository.getAllTags(getTenantId);
            if (!tags || tags.length === 0) {
                throw new common_1.NotFoundException('Invoices not found');
            }
            const tagsFilered = await this.tagsFilters(tags, tagName);
            const totalPages = Math.ceil(tagsFilered.length / pageSize);
            if (page && (page < 1 || page > totalPages)) {
                throw new common_1.NotFoundException('Invalid page number');
            }
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedResult = tagsFilered.slice(startIndex, endIndex);
            return {
                data: paginatedResult,
                totalPages: totalPages,
                currentPage: page,
            };
        }
        catch (error) {
            throw new common_1.NotFoundException('Tags for ' + getTenantId + ' not found');
        }
    }
    async tagsFilters(filteredResult, tagDescription) {
        let result = filteredResult;
        if (tagDescription && tagDescription.length > 1) {
            result = result.filter((item) => {
                const result_tagDescription = item.description
                    .toLowerCase()
                    .includes(tagDescription);
                const result_tag = item.tags.toLowerCase().includes(tagDescription);
                return result_tagDescription || result_tag;
            });
        }
        return result;
    }
};
exports.TagRules = TagRules = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tags_repository_1.TagsRepository])
], TagRules);
//# sourceMappingURL=tagsRules.js.map