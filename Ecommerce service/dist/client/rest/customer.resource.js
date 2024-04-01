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
exports.CustomerResource = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const customer_usecase_1 = require("./customer.usecase");
const customer_model_dto_1 = require("./customer.model.dto");
const customer_filter_1 = require("../service/customer.filter");
const platform_express_1 = require("@nestjs/platform-express");
let CustomerResource = exports.CustomerResource = class CustomerResource {
    constructor(customerUseCase, customerFilters) {
        this.customerUseCase = customerUseCase;
        this.customerFilters = customerFilters;
    }
    async createCustomer(customerDTO, request) {
        return await this.customerUseCase.createCustomer(customerDTO, request);
    }
    async getAllCustomerByID(id, request) {
        const customer = await this.customerUseCase.getAllCustomerByID(id, request);
        if (!customer || customer.length === 0) {
            throw new common_1.NotFoundException('customers not found');
        }
        return customer;
    }
    async getAllCustomers(request, page, size) {
        const customer = await this.customerUseCase.getAllCustomers(request, Number(page), Number(size));
        if (!customer || customer.length === 0) {
            throw new common_1.NotFoundException('Customers not found');
        }
        return customer;
    }
    async putCustomer(customerDTO, request) {
        return await this.customerUseCase.putCustomer(customerDTO, request);
    }
    async deleteCustomer(request, id) {
        try {
            return await this.customerUseCase.deleteCustomer(request, id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Product not Customer');
        }
    }
    async getFilterParams(request, page, pageSize, filterOptions) {
        const getInvoiceByFilter = this.customerFilters.searchCustomerFilters(request, Number(page), Number(pageSize), filterOptions);
        return getInvoiceByFilter;
    }
    async uploadFile(file, request) {
        const importData = await this.customerUseCase.importCustomers(file, request);
        return importData;
    }
    async exportCustomer(request, response) {
        const exportCustomer = await this.customerUseCase.exportCustomers(request, response);
        return exportCustomer;
    }
};
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiBody)({ type: customer_model_dto_1.CustomerModelDTO, required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'New customer saved',
        type: customer_model_dto_1.CustomerModelDTO,
    }),
    (0, swagger_1.ApiOperation)({ description: 'Create a customer' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_model_dto_1.CustomerModelDTO,
        Request]),
    __metadata("design:returntype", Promise)
], CustomerResource.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ description: 'Get all Customers by tenant' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Customers found',
        type: customer_model_dto_1.CustomerModelDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Customers not found',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", Promise)
], CustomerResource.prototype, "getAllCustomerByID", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ description: 'Get all Customers' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Customers found',
        type: customer_model_dto_1.CustomerModelDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Customers not found',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String, String]),
    __metadata("design:returntype", Promise)
], CustomerResource.prototype, "getAllCustomers", null);
__decorate([
    (0, common_1.Put)('/'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'Product update success' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'The product cannot be edited' }),
    (0, swagger_1.ApiOperation)({ summary: 'Edit product' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_model_dto_1.CustomerModelDTO,
        Request]),
    __metadata("design:returntype", Promise)
], CustomerResource.prototype, "putCustomer", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer to deleted not found' }),
    (0, swagger_1.ApiOperation)({ summary: 'Customer product' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String]),
    __metadata("design:returntype", Promise)
], CustomerResource.prototype, "deleteCustomer", null);
__decorate([
    (0, common_1.Post)('filters'),
    (0, swagger_1.ApiOperation)({ description: 'Get a customers' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'CustomerDTO' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Customers not founds',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String, String, Object]),
    __metadata("design:returntype", Promise)
], CustomerResource.prototype, "getFilterParams", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], CustomerResource.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('/export/file'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], CustomerResource.prototype, "exportCustomer", null);
exports.CustomerResource = CustomerResource = __decorate([
    (0, swagger_1.ApiTags)('customer'),
    (0, common_1.Controller)('customer'),
    __metadata("design:paramtypes", [customer_usecase_1.CustomerUsecase,
        customer_filter_1.CustomerFilters])
], CustomerResource);
//# sourceMappingURL=customer.resource.js.map