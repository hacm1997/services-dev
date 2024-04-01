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
exports.ProfileResource = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const profile_service_1 = require("../service/profile.service");
let ProfileResource = class ProfileResource {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async createProfile(profileDTO) {
        return await this.profileService.profileCreate(profileDTO);
    }
};
exports.ProfileResource = ProfileResource;
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiBody)({ type: 'ProfileDTO', required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: 'ProfileDTO',
    }),
    (0, swagger_1.ApiOperation)({}),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileResource.prototype, "createProfile", null);
exports.ProfileResource = ProfileResource = __decorate([
    (0, swagger_1.ApiTags)('profile'),
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileResource);
//# sourceMappingURL=profile.resource.js.map