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
exports.CustomerUsecase = void 0;
const common_1 = require("@nestjs/common");
const customer_gateway_1 = require("./customer.gateway");
const customer_model_dto_1 = require("./customer.model.dto");
const customer_model_1 = require("../data/customer.model");
const moment = require("moment");
const cookies_1 = require("../../common/interceptors/getCookies/cookies");
const Constants_1 = require("../../infrastructure/dynamodb/intializer/Constants");
const idGenerator_1 = require("../../product/util/idGenerator");
const customerImportExport_1 = require("../util/customerImportExport");
let CustomerUsecase = exports.CustomerUsecase = class CustomerUsecase {
    constructor(customerGateway) {
        this.customerGateway = customerGateway;
    }
    async createCustomer(customerDTO, request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const createdCustomer = await this.customerGateway.createCustomer(this.mapDTOToDomain(customerDTO, getTenantId));
        return this.mapDomainToDTO(createdCustomer);
    }
    async getAllCustomerByID(id, request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const customer = await this.customerGateway.getAllCustomerByID(id, getTenantId);
        return customer.map(this.mapDomainToDTO);
    }
    async getAllCustomers(request, page, size) {
        const customer = await this.customerGateway.fetchResultsWithPagination(request, page, size);
        const result = {
            data: customer.data.map(this.mapDomainToDTO),
            totalPage: customer.totalPage - 1,
        };
        return result;
    }
    async getAllCustomerFilter(request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const customers = await this.customerGateway.getAllCustomers(getTenantId);
        return customers.map(this.mapDomainToDTO);
    }
    async putCustomer(customerDTO, request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const putCustomer = await this.customerGateway.putCustomer(customerDTO, getTenantId);
        return this.mapDomainToDTO(putCustomer);
    }
    async deleteCustomer(request, id) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const deleteCustomer = await this.customerGateway.deleteCustomer(id, getTenantId);
        return deleteCustomer;
    }
    async importCustomers(file, request) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        try {
            const data = await (0, customerImportExport_1.importCustomersFunction)(file);
            try {
                await this.customerGateway.saveDataToDynamoDB(data, getTenantId);
                return { message: 'Import customers successful' };
            }
            catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            return { message: 'Failed to import customers' };
        }
    }
    async exportCustomers(request, response) {
        const tokenRequest = request.headers ?? request.headers;
        const getTenantId = (0, cookies_1.default)(tokenRequest);
        const customers = await this.customerGateway.getAllCustomers(getTenantId);
        const allCustomers = customers.map(this.mapDomainToDTO);
        try {
            await (0, customerImportExport_1.exportCustomersFunction)(response, allCustomers, getTenantId);
            return { message: 'Export of customers successful' };
        }
        catch (error) {
            console.log(error.message);
            return { message: 'Failed export of customers' };
        }
    }
    mapDTOToDomain(customerDTO, tenantID) {
        const buildSid = (0, idGenerator_1.default)(Constants_1.CUSTOMER_GROUP);
        const currentDate = moment().subtract(5, 'hours');
        return customer_model_1.CustomerModel.builder()
            .TENANTID(Constants_1.CUSTOMER_GROUP + '#' + tenantID)
            .SID(customerDTO.id ? customerDTO.id : buildSid)
            .NAME(customerDTO.name)
            .LAST_NAME(customerDTO.last_name)
            .EMAIL(customerDTO.email)
            .PHONE(customerDTO.phone)
            .CITY(customerDTO.city)
            .ADDRESS(customerDTO.address)
            .CREATEDAT(currentDate.toISOString())
            .EXTRAINFO(customerDTO.extraInfo)
            .build();
    }
    mapDomainToDTO(customer) {
        return (customer_model_dto_1.CustomerModelDTO.builder()
            .ID(customer.sid)
            .NAME(customer.name)
            .LAST_NAME(customer.last_name)
            .EMAIL(customer.email)
            .PHONE(customer.phone)
            .CITY(customer.city)
            .ADDRESS(customer.address)
            .CREATEDAT(customer.createdAt)
            .EXTRAINFO(customer.extraInfo)
            .build());
    }
};
exports.CustomerUsecase = CustomerUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_gateway_1.CustomerGateway])
], CustomerUsecase);
//# sourceMappingURL=customer.usecase.js.map