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
exports.ShippingModelDTOBuilder = exports.ShippingModelDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class ShippingModelDTO {
    constructor(tenantID, shipping_code, city, price) {
        this.tenantID = tenantID;
        this.shipping_code = shipping_code;
        this.city = city;
        this.price = price;
    }
    setNeighborhood(neighborhood) {
        this.neighborhood = neighborhood;
    }
    setPostalCode(postal_code) {
        this.postal_code = postal_code;
    }
    setExtraInfo(extraInfo) {
        this.extraInfo = extraInfo;
    }
    static builder() {
        return new ShippingModelDTOBuilder();
    }
}
exports.ShippingModelDTO = ShippingModelDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'TED-DTX131', required: true }),
    __metadata("design:type", String)
], ShippingModelDTO.prototype, "tenantID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'code',
        description: 'Shipping code',
        type: String,
        example: 'USR-31N4r123',
        required: true,
    }),
    __metadata("design:type", String)
], ShippingModelDTO.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'sdsds-dfds-sdfds', required: true }),
    __metadata("design:type", String)
], ShippingModelDTO.prototype, "shipping_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'Cartagena',
        required: true,
    }),
    __metadata("design:type", String)
], ShippingModelDTO.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'Neighborhood address',
        required: false,
    }),
    __metadata("design:type", String)
], ShippingModelDTO.prototype, "neighborhood", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 110005, required: false }),
    __metadata("design:type", Number)
], ShippingModelDTO.prototype, "postal_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        example: 25000,
        required: true,
    }),
    __metadata("design:type", Number)
], ShippingModelDTO.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: { des: 'extra info xd' },
        required: false,
    }),
    __metadata("design:type", Object)
], ShippingModelDTO.prototype, "extraInfo", void 0);
class ShippingModelDTOBuilder extends ShippingModelDTO {
    TENANTID(tenantID) {
        this.tenantID = tenantID ?? undefined;
        return this;
    }
    SHIPPING_CODE(shipping_code) {
        this.shipping_code = shipping_code;
        return this;
    }
    CITY(city) {
        this.city = city;
        return this;
    }
    PRICE(price) {
        this.price = price;
        return this;
    }
    NEIGHBORHOOD(neighborhood) {
        if (neighborhood)
            this.neighborhood = neighborhood;
        return this;
    }
    POSTAL_CODE(postal_code) {
        if (postal_code)
            this.postal_code = postal_code;
        return this;
    }
    EXTRAINFO(extraInfo) {
        if (extraInfo)
            this.extraInfo = extraInfo;
        return this;
    }
    build() {
        const shippingDTO = new ShippingModelDTO(this.tenantID, this.shipping_code, this.city, this.price);
        if (this.neighborhood)
            shippingDTO.setNeighborhood(this.neighborhood);
        if (this.postal_code)
            shippingDTO.setPostalCode(this.postal_code);
        if (this.extraInfo)
            shippingDTO.setExtraInfo(this.extraInfo);
        return shippingDTO;
    }
}
exports.ShippingModelDTOBuilder = ShippingModelDTOBuilder;
//# sourceMappingURL=shipping.model.dto.js.map