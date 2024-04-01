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
exports.PaymentModelDTOBuilder = exports.PaymentModelDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class PaymentModelDTO {
    constructor(tenantID, customer, key_code, createdAt) {
        this.tenantID = tenantID;
        this.customer = customer;
        this.key_code = key_code;
        this.createdAt = createdAt;
    }
    setExtraInfo(extraInfo) {
        this.extraInfo = extraInfo;
    }
    static builder() {
        return new PaymentModelDTOBuilder();
    }
}
exports.PaymentModelDTO = PaymentModelDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'TED-DTX131', required: true }),
    __metadata("design:type", String)
], PaymentModelDTO.prototype, "tenantID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'customer',
        description: 'Customer',
        type: String,
        example: 'KRU360',
        required: false,
    }),
    __metadata("design:type", String)
], PaymentModelDTO.prototype, "customer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'nsgsfsjfjkbmaldalk', required: true }),
    __metadata("design:type", String)
], PaymentModelDTO.prototype, "key_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'Date', example: '2023-08-03', required: false }),
    __metadata("design:type", Date)
], PaymentModelDTO.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: JSON,
        example: { des: 'extra info xd' },
        required: false,
    }),
    __metadata("design:type", Object)
], PaymentModelDTO.prototype, "extraInfo", void 0);
class PaymentModelDTOBuilder extends PaymentModelDTO {
    TENANTID(tenantID) {
        this.tenantID = tenantID ?? undefined;
        return this;
    }
    CUSTOMER(customer) {
        if (customer)
            this.customer = customer;
        return this;
    }
    KEY_CODE(key_code) {
        this.key_code = key_code;
        return this;
    }
    CREATEDAT(createdAt) {
        if (createdAt)
            this.createdAt = createdAt;
        return this;
    }
    EXTRAINFO(extraInfo) {
        if (extraInfo)
            this.extraInfo = extraInfo;
        return this;
    }
    build() {
        const productDTO = new PaymentModelDTO(this.tenantID, this.customer, this.key_code, this.createdAt);
        if (this.extraInfo)
            productDTO.setExtraInfo(JSON.stringify(this.extraInfo));
        return productDTO;
    }
}
exports.PaymentModelDTOBuilder = PaymentModelDTOBuilder;
//# sourceMappingURL=payment.model.dto.js.map