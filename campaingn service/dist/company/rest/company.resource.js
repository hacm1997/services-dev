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
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const transform_interceptor_1 = require("../../common/interceptors/transform/transform.interceptor");
const company_service_1 = require("../service/company.service");
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    async createContact(company) {
        const companyD = await this.companyService.createCompany(company);
        return companyD;
    }
    async getAllContacts(page, pageSize) {
        const companies = await this.companyService.getAllCompanies(Number(page), Number(pageSize));
        return companies;
    }
    async getAllCompanyOpenSearch(index, page, pageSize) {
        const persons = await this.companyService.getCompaniesOPS(index, Number(page), Number(pageSize));
        return persons;
    }
    async getAllNameCompanyOpenSearch(index, name) {
        const persons = await this.companyService.getAllNameCompanyOpenSearch(index, name);
        return persons;
    }
    async getCompanyById(companyId) {
        const company = await this.companyService.getCompanyById(companyId);
        return company;
    }
    async getContactsByName(index, input, page, pageSize) {
        const company = await this.companyService.getCompanyByNameOPS(index, input, page, pageSize);
        return company;
    }
    async activateSubscription(companyId, company) {
        return await this.companyService.updateCompany(companyId, company);
    }
    async deletePersonOPS(companyId, index) {
        return await this.companyService.deleteCompany(index, companyId);
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'company not create' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "createContact", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'CompanyDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Company not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get companies by tenant' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getAllContacts", null);
__decorate([
    (0, common_1.Get)('/search/:index'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'companyDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'companies not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get companies by tenant' }),
    __param(0, (0, common_1.Param)('index')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getAllCompanyOpenSearch", null);
__decorate([
    (0, common_1.Get)('/search/filters/:index'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'companyDTO' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'company not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get company by tenant' }),
    __param(0, (0, common_1.Param)('index')),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getAllNameCompanyOpenSearch", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'CompanyModel' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Company not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Get Company by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompanyById", null);
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
], CompanyController.prototype, "getContactsByName", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'CompanyDTO' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'The company cannot be update',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'update company' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "activateSubscription", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'CompanyDTO' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'The company cannot be update',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'update company' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('index')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "deletePersonOPS", null);
exports.CompanyController = CompanyController = __decorate([
    (0, swagger_1.ApiTags)('company'),
    (0, common_1.Controller)('company'),
    (0, common_1.UseInterceptors)(transform_interceptor_1.TransformInterceptor),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
//# sourceMappingURL=company.resource.js.map