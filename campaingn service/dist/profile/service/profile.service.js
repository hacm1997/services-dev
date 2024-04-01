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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const profile_repository_1 = require("../data/profile.repository");
let ProfileService = class ProfileService {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    async profileCreate(profileDTO) {
        const createdCampaign = await this.profileRepository.profileCreate(this.mapDTOToDomain(profileDTO));
        return this.mapDomainToDTO(createdCampaign);
    }
    mapDTOToDomain(profileDTO) {
        const campaignModel = {
            id: profileDTO.id,
            name: profileDTO.name,
            email: profileDTO.email,
        };
        return campaignModel;
    }
    mapDomainToDTO(profile) {
        const profileModelDTO = {
            id: profile.id,
            name: profile.name,
            email: profile.email,
        };
        return profileModelDTO;
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profile_repository_1.ProfileRepository])
], ProfileService);
//# sourceMappingURL=profile.service.js.map