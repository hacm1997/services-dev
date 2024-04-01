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
exports.PersonController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const transform_interceptor_1 = require("../../common/interceptors/transform/transform.interceptor");
const person_service_1 = require("../service/person.service");
let PersonController = class PersonController {
    constructor(personService) {
        this.personService = personService;
    }
    async createContact(person) {
        const personD = await this.personService.createPerson(person);
        return personD;
    }
    async getAllContacts(page, pageSize) {
        const persons = await this.personService.getAllPersons(Number(page), Number(pageSize));
        return persons;
    }
    async getAllContactsOpenSearch(index, page, pageSize) {
        const persons = await this.personService.getPersonOPS(index, page, pageSize);
        return persons;
    }
    async getContactsByName(index, input, page, pageSize) {
        const persons = await this.personService.getPersonByNameOPS(index, input, page, pageSize);
        return persons;
    }
    async getPersonById(personId) {
        const person = await this.personService.getPersonById(personId);
        return person;
    }
    async updatePerson(personId, person) {
        return await this.personService.updatePerson(personId, person);
    }
    async deletePersonOPS(personId, index) {
        return await this.personService.deletePerson(index, personId);
    }
};
exports.PersonController = PersonController;
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Person not create' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "createContact", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'PersonDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'persons not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get persons by tenant' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "getAllContacts", null);
__decorate([
    (0, common_1.Get)('/search/:index'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'PersonDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'persons not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get persons by tenant' }),
    __param(0, (0, common_1.Param)('index')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "getAllContactsOpenSearch", null);
__decorate([
    (0, common_1.Get)('/search/name/:index'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'PersonDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'persons not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get persons by tenant' }),
    __param(0, (0, common_1.Param)('index')),
    __param(1, (0, common_1.Query)('input')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "getContactsByName", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'PersonModel' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'person not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get person by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "getPersonById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'PersonDTO' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'The person cannot be update',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'update person' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "updatePerson", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'PersonDTO' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'The person cannot be update',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'update person' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('index')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "deletePersonOPS", null);
exports.PersonController = PersonController = __decorate([
    (0, swagger_1.ApiTags)('person'),
    (0, common_1.Controller)('person'),
    (0, common_1.UseInterceptors)(transform_interceptor_1.TransformInterceptor),
    __metadata("design:paramtypes", [person_service_1.PersonService])
], PersonController);
//# sourceMappingURL=person.resource.js.map