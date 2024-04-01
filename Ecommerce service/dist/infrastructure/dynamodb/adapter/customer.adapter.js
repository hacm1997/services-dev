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
exports.CustomerAdapter = void 0;
const common_1 = require("@nestjs/common");
const customer_gateway_1 = require("../../../client/rest/customer.gateway");
const customer_enum_1 = require("../../model/customer/customer.enum");
const customer_model_1 = require("../../../client/data/customer.model");
const customer_model_data_1 = require("../../model/customer/customer.model.data");
const cookies_1 = require("../../../common/interceptors/getCookies/cookies");
let CustomerAdapter = exports.CustomerAdapter = class CustomerAdapter extends customer_gateway_1.CustomerGateway {
    constructor(customerRepository) {
        super();
        this.customerRepository = customerRepository;
    }
    async createCustomer(client) {
        try {
            const storeClient = await this.customerRepository.createCustomer(this.mapToData(client, customer_enum_1.CustomerEnum.NEW));
            return this.mapToDomain(storeClient);
        }
        catch (error) {
            throw new Error('Error to save client in db or Customer already exist');
        }
    }
    async getAllCustomerByID(id, tenantID) {
        try {
            const storeClients = await this.customerRepository.getAllCustomerByID(id, tenantID);
            if (storeClients) {
                return storeClients.map(this.mapToDomain);
            }
            else {
                return [];
            }
        }
        catch (error) {
            console.error('Error getting clients from db:', error);
            throw new Error('Error to get clients in db.');
        }
    }
    async getAllCustomers(tenantID) {
        try {
            const storeClients = await this.customerRepository.getAllCustomers(tenantID);
            if (storeClients) {
                return storeClients.map(this.mapToDomain);
            }
            else {
                return [];
            }
        }
        catch (error) {
            console.error('Error getting clients from db:', error);
            throw new Error('Error to get clients in db.');
        }
    }
    async fetchResultsWithPagination(request, pageNumber, pageSize) {
        const tokenRequest = request.headers ?? request.headers;
        const tenant = (0, cookies_1.default)(tokenRequest);
        const Customers = await this.customerRepository.fetchResultsWithPagination(tenant, pageNumber, pageSize);
        let countNonEmptyItems = 1;
        const itemsPromises = Customers.results.map(async (result) => {
            const resolvedItems = await result.items;
            countNonEmptyItems++;
            return {
                ...result,
                items: resolvedItems.map(this.mapToDomain),
            };
        });
        const resolvedResults = await Promise.all(itemsPromises);
        if (resolvedResults[pageNumber - 1]) {
            if (resolvedResults[pageNumber - 1].items.length > 0) {
                return {
                    data: resolvedResults[pageNumber - 1].items.map(this.mapToDomain),
                    totalPage: countNonEmptyItems,
                };
            }
            else {
                return {
                    data: [],
                    totalPage: 0,
                };
            }
        }
        else {
            return {
                data: [],
                totalPage: 0,
            };
        }
    }
    async putCustomer(client, tenantID) {
        try {
            const storeClient = await this.customerRepository.putCustomer(this.mapToData(client, customer_enum_1.CustomerEnum.NEW), tenantID, client.id);
            return this.mapToDomain(storeClient);
        }
        catch (error) {
            console.log('Error to update client.');
            throw new Error(error);
        }
    }
    async deleteCustomer(id, tenantID) {
        try {
            const storeCustomer = await this.customerRepository.deleteCustomer(id, tenantID);
            return storeCustomer;
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async saveDataToDynamoDB(data, tenantID) {
        try {
            const uploadProducts = await this.customerRepository.saveDataToDynamoDB(data, tenantID);
            return uploadProducts;
        }
        catch (error) {
            throw new Error('Error to upload products in db.');
        }
    }
    mapToData(customer, behavior) {
        const customerData = new customer_model_data_1.CustomerModelData(customer.tenantID, customer.sid, customer.name, customer.last_name, customer.email, customer.phone, customer.city, customer.address, customer.createdAt, customer.extraInfo);
        if (behavior === customer_enum_1.CustomerEnum.UPDATE)
            customerData.sid = customer.sid;
        customerData.extraInfo = customerData.extraInfo;
        return customerData;
    }
    mapToDomain(customerData) {
        return customer_model_1.CustomerModel.builder()
            .TENANTID(customerData.tenantID)
            .SID(customerData.sid)
            .NAME(customerData.name)
            .LAST_NAME(customerData.last_name)
            .EMAIL(customerData.email)
            .PHONE(customerData.phone)
            .CITY(customerData.city)
            .ADDRESS(customerData.address)
            .CREATEDAT(customerData.createdAt)
            .EXTRAINFO(customerData.extraInfo)
            .build();
    }
};
exports.CustomerAdapter = CustomerAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CustomerRepository')),
    __metadata("design:paramtypes", [Object])
], CustomerAdapter);
//# sourceMappingURL=customer.adapter.js.map