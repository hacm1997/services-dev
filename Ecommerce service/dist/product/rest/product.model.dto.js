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
exports.ProductModelDTOBuilder = exports.ProductModelDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProductModelDTO {
    constructor(tenantID, id, name, price, createdAt, status) {
        this.tenantID = tenantID;
        this.id = id;
        this.name = name;
        this.price = price;
        this.createdAt = createdAt;
        this.status = status;
    }
    setImage(image) {
        this.image = image;
    }
    setDescription(description) {
        this.description = description;
    }
    setExtraInfo(extraInfo) {
        this.extraInfo = extraInfo;
    }
    setInventory(inventory) {
        this.inventory = inventory;
    }
    static builder() {
        return new ProductModelDTOBuilder();
    }
}
exports.ProductModelDTO = ProductModelDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'TED-DTX131', required: true }),
    __metadata("design:type", String)
], ProductModelDTO.prototype, "tenantID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'id',
        description: 'Procut ID',
        type: String,
        example: 'USR-31N4r123',
        required: false,
    }),
    __metadata("design:type", String)
], ProductModelDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'PRODUCT EXAMPLE', required: true }),
    __metadata("design:type", String)
], ProductModelDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        example: 20000,
        required: true,
    }),
    __metadata("design:type", Number)
], ProductModelDTO.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'https://s3.amazonaws.com/gomedi.kru360.com/DEVELOPMFR/1677591913273portada2.jpg',
        required: false,
    }),
    __metadata("design:type", String)
], ProductModelDTO.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'PRODUCT DESCRIPTION',
        required: true,
    }),
    __metadata("design:type", String)
], ProductModelDTO.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '2023-08-03', required: false }),
    __metadata("design:type", String)
], ProductModelDTO.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'STATUS PRODUCT', required: true }),
    __metadata("design:type", String)
], ProductModelDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: JSON,
        example: { des: 'extra info xd' },
        required: false,
    }),
    __metadata("design:type", Object)
], ProductModelDTO.prototype, "extraInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        example: 100,
        required: true,
    }),
    __metadata("design:type", Number)
], ProductModelDTO.prototype, "inventory", void 0);
class ProductModelDTOBuilder extends ProductModelDTO {
    TENANTID(tenantID) {
        this.tenantID = tenantID ?? undefined;
        return this;
    }
    ID(id) {
        if (id)
            this.id = id;
        return this;
    }
    NAME(name) {
        this.name = name;
        return this;
    }
    IMAGE(image) {
        this.image = image;
        return this;
    }
    DESCRIPTION(description) {
        this.description = description;
        return this;
    }
    PRICE(price) {
        this.price = price;
        return this;
    }
    CREATEDAT(createdAt) {
        if (createdAt)
            this.createdAt = createdAt;
        return this;
    }
    STATUS(status) {
        if (status)
            this.status = status;
        return this;
    }
    EXTRAINFO(extraInfo) {
        if (extraInfo)
            this.extraInfo = extraInfo;
        return this;
    }
    INVENTORY(inventory) {
        this.inventory = inventory;
        return this;
    }
    build() {
        const productDTO = new ProductModelDTO(this.tenantID, this.id, this.name, this.price, this.createdAt, this.status);
        if (this.image)
            productDTO.setImage(this.image);
        if (this.description)
            productDTO.setDescription(this.description);
        if (this.extraInfo)
            productDTO.setExtraInfo(JSON.stringify(this.extraInfo));
        if (this.inventory)
            productDTO.setInventory(this.inventory);
        return productDTO;
    }
}
exports.ProductModelDTOBuilder = ProductModelDTOBuilder;
//# sourceMappingURL=product.model.dto.js.map