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
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const contact_service_1 = require("../service/contact.service");
const transform_interceptor_1 = require("../../common/interceptors/transform/transform.interceptor");
const swagger_1 = require("@nestjs/swagger");
let ContactController = class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    async createContact(contact) {
        const contactD = await this.contactService.createContact(contact);
        return contactD;
    }
    async getAllContacts(page, pageSize) {
        const campaigns = await this.contactService.getAllContacts(Number(page), Number(pageSize));
        if (!campaigns) {
            throw new common_1.NotFoundException('Contact not found');
        }
        return campaigns;
    }
    async getContactById(id) {
        const contactUser = await this.contactService.getContactById(id);
        if (!contactUser) {
            throw new common_1.NotFoundException('Contact not found');
        }
        return contactUser;
    }
    async deleteContact(id) {
        try {
            return await this.contactService.deleteContact(id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Contact not deleted');
        }
    }
    async putContact(id, contactDTO) {
        return await this.contactService.putContact(id, contactDTO);
    }
    async putContactCompany(id, company) {
        return await this.contactService.putContactCompany(id, company);
    }
    async putContactPerson(id, person) {
        return await this.contactService.putContactPerson(id, person);
    }
    async getContactByCompanyId(company) {
        const contactUser = await this.contactService.getContactByCompanyId(company);
        if (!contactUser) {
            throw new common_1.NotFoundException('Contact not found');
        }
        return contactUser;
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Contact not create' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "createContact", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'ContactDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Contact not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get contacts by tenant' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "getAllContacts", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'ContactDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Contact not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get contacts by tenant' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "getContactById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Contact not deleted' }),
    (0, swagger_1.ApiOperation)({ summary: 'Deleted Contact' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "deleteContact", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'contactDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'The contact cannot be edited' }),
    (0, swagger_1.ApiOperation)({ summary: 'Edit contact' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "putContact", null);
__decorate([
    (0, common_1.Put)('/company/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'contactDTO' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'The contact company cannot be edited',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Edit contact company' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "putContactCompany", null);
__decorate([
    (0, common_1.Put)('/person/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'contactDTO' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'The contact person cannot be edited',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Edit contact person' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "putContactPerson", null);
__decorate([
    (0, common_1.Get)('/companyinfo/:company'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'ContactDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Contact not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get contacts by tenant' }),
    __param(0, (0, common_1.Param)('company')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "getContactByCompanyId", null);
exports.ContactController = ContactController = __decorate([
    (0, common_1.Controller)('contact'),
    (0, common_1.UseInterceptors)(transform_interceptor_1.TransformInterceptor),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
//# sourceMappingURL=contact.resource.js.map