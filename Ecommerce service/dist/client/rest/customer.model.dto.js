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
exports.CustomerModelDTOBuilderFromInvoice = exports.CustomerModelDTOBuilder = exports.CustomerModelDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class CustomerModelDTO {
    constructor(tenantID, id, name, last_name, email, phone, city, address, createdAt) {
        this.tenantID = tenantID;
        this.id = id;
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
        this.city = city;
        this.address = address;
        this.createdAt = createdAt;
    }
    setExtraInfo(extraInfo) {
        this.extraInfo = extraInfo;
    }
    static builder() {
        return new CustomerModelDTOBuilder();
    }
    static builderFromInvoice() {
        return new CustomerModelDTOBuilderFromInvoice();
    }
}
exports.CustomerModelDTO = CustomerModelDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'TED-DTX131', required: false }),
    __metadata("design:type", String)
], CustomerModelDTO.prototype, "tenantID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'id',
        description: 'client ID',
        type: String,
        example: 1234567890,
        required: false,
    }),
    __metadata("design:type", String)
], CustomerModelDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'CLIENT NAME', required: true }),
    __metadata("design:type", String)
], CustomerModelDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'CLIENT LAST NAME', required: false }),
    __metadata("design:type", String)
], CustomerModelDTO.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'user@example.com', required: true }),
    __metadata("design:type", String)
], CustomerModelDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        example: 3105005000,
        required: false,
    }),
    __metadata("design:type", Number)
], CustomerModelDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'CITY NAME',
        required: true,
    }),
    __metadata("design:type", String)
], CustomerModelDTO.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'ADDRESS NAME', required: false }),
    __metadata("design:type", String)
], CustomerModelDTO.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '2023-10-27', required: true }),
    __metadata("design:type", String)
], CustomerModelDTO.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: { des: 'CLIENT EXTRA INFO' },
        required: false,
    }),
    __metadata("design:type", Object)
], CustomerModelDTO.prototype, "extraInfo", void 0);
class CustomerModelDTOBuilder extends CustomerModelDTO {
    TENANTID(tenantID) {
        this.tenantID = tenantID ?? undefined;
        return this;
    }
    ID(id) {
        this.id = id;
        return this;
    }
    NAME(name) {
        this.name = name;
        return this;
    }
    LAST_NAME(last_name) {
        this.last_name = last_name;
        return this;
    }
    EMAIL(email) {
        this.email = email;
        return this;
    }
    PHONE(phone) {
        this.phone = phone;
        return this;
    }
    CITY(city) {
        this.city = city;
        return this;
    }
    ADDRESS(address) {
        this.address = address;
        return this;
    }
    CREATEDAT(createdAt) {
        this.createdAt = createdAt;
        return this;
    }
    EXTRAINFO(extraInfo) {
        if (extraInfo)
            this.extraInfo = extraInfo;
        return this;
    }
    build() {
        const clientDTO = new CustomerModelDTO(this.tenantID, this.id, this.name, this.last_name, this.email, this.phone, this.city, this.address, this.createdAt);
        if (this.extraInfo)
            clientDTO.setExtraInfo(JSON.stringify(this.extraInfo));
        return clientDTO;
    }
}
exports.CustomerModelDTOBuilder = CustomerModelDTOBuilder;
class CustomerModelDTOBuilderFromInvoice extends CustomerModelDTO {
    TENANTID(tenantID) {
        this.tenantID = tenantID ?? undefined;
        return this;
    }
    ID(id) {
        this.id = id;
        return this;
    }
    NAME(name) {
        this.name = name;
        return this;
    }
    LAST_NAME(last_name) {
        this.last_name = last_name;
        return this;
    }
    EMAIL(email) {
        this.email = email;
        return this;
    }
    PHONE(phone) {
        this.phone = phone;
        return this;
    }
    CITY(city) {
        this.city = city;
        return this;
    }
    ADDRESS(address) {
        this.address = address;
        return this;
    }
    CREATEDAT(createdAt) {
        this.createdAt = createdAt;
        return this;
    }
    EXTRAINFO(extraInfo) {
        if (extraInfo)
            this.extraInfo = extraInfo;
        return this;
    }
    build() {
        const clientDTO = new CustomerModelDTO(this.tenantID, this.id, this.name, this.last_name, this.email, this.phone, this.city, this.address, this.createdAt);
        if (this.extraInfo)
            clientDTO.setExtraInfo(this.extraInfo);
        return clientDTO;
    }
}
exports.CustomerModelDTOBuilderFromInvoice = CustomerModelDTOBuilderFromInvoice;
//# sourceMappingURL=customer.model.dto.js.map