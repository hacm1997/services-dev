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
exports.OpenSearchController = void 0;
const common_1 = require("@nestjs/common");
const openSearch_1 = require("./openSearch");
const swagger_1 = require("@nestjs/swagger");
let OpenSearchController = class OpenSearchController {
    constructor(openSearchService) {
        this.openSearchService = openSearchService;
    }
    async reindex(sourceIndex, destinationIndex) {
        try {
            await this.openSearchService.reindex(sourceIndex, destinationIndex);
            return {
                message: `Re-indexación de ${sourceIndex} a ${destinationIndex} completada.`,
            };
        }
        catch (error) {
            return { error: 'Error durante la re-indexación.' };
        }
    }
};
exports.OpenSearchController = OpenSearchController;
__decorate([
    (0, common_1.Post)('reindex/:sourceIndex/:destinationIndex'),
    __param(0, (0, common_1.Param)('sourceIndex')),
    __param(1, (0, common_1.Param)('destinationIndex')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OpenSearchController.prototype, "reindex", null);
exports.OpenSearchController = OpenSearchController = __decorate([
    (0, swagger_1.ApiTags)('opensearch'),
    (0, common_1.Controller)('opensearch'),
    __metadata("design:paramtypes", [openSearch_1.OpenSearch])
], OpenSearchController);
//# sourceMappingURL=openSearch.resource.js.map