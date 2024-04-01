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
exports.InvoiceModelDTOBuilder = exports.InvoiceModelDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class InvoiceModelDTO {
    constructor(tenantID, invoice_code, reference, createdAt, customer, products, shipping, iva, total, payment_method, status) {
        this.tenantID = tenantID;
        this.invoice_code = invoice_code;
        this.reference = reference;
        this.createdAt = createdAt;
        this.customer = customer;
        this.products = products;
        this.shipping = shipping;
        this.iva = iva;
        this.total = total;
        this.payment_method = payment_method;
        this.status = status;
    }
    setExtraInfo(extraInfo) {
        this.extraInfo = extraInfo;
    }
    static builder() {
        return new InvoiceModelDTOBuilder();
    }
}
exports.InvoiceModelDTO = InvoiceModelDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'TED-DTX131', required: true }),
    __metadata("design:type", String)
], InvoiceModelDTO.prototype, "tenantID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'invoice_code',
        description: 'Invoice code',
        type: String,
        example: 'MTFT-31N4r123',
        required: false,
    }),
    __metadata("design:type", String)
], InvoiceModelDTO.prototype, "invoice_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '#sfs-ahb10-2120aj', required: true }),
    __metadata("design:type", String)
], InvoiceModelDTO.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '2023-10-30', required: false }),
    __metadata("design:type", String)
], InvoiceModelDTO.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'ClientInterface',
        example: {
            id: 1,
            name: 'juan',
            phone: 123456,
            email: 'example@gmail.com',
            address: 'dir #1',
        },
        required: true,
    }),
    __metadata("design:type", Object)
], InvoiceModelDTO.prototype, "customer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'ProductInterface',
        example: {
            id: 1,
            product_name: 'product 1',
            amount: 10,
            price: 50000,
        },
        required: true,
    }),
    __metadata("design:type", Array)
], InvoiceModelDTO.prototype, "products", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'ShippingInterface',
        example: {
            shipping_code: 'hfdsm',
            city: 'city 1',
            phone: 5000,
            neighborhood: 'neighborhood address',
            postal_code: 11002,
        },
        required: true,
    }),
    __metadata("design:type", Object)
], InvoiceModelDTO.prototype, "shipping", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        example: 15,
        required: false,
    }),
    __metadata("design:type", Number)
], InvoiceModelDTO.prototype, "iva", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        example: 20000,
        required: true,
    }),
    __metadata("design:type", Number)
], InvoiceModelDTO.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'TDC', required: false }),
    __metadata("design:type", String)
], InvoiceModelDTO.prototype, "payment_method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'pending', required: true }),
    __metadata("design:type", String)
], InvoiceModelDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: { des: 'extra info xd' },
        required: false,
    }),
    __metadata("design:type", Object)
], InvoiceModelDTO.prototype, "extraInfo", void 0);
class InvoiceModelDTOBuilder extends InvoiceModelDTO {
    TENANTID(tenantID) {
        this.tenantID = tenantID ?? undefined;
        return this;
    }
    INVOICE_CODE(invoice_code) {
        this.invoice_code = invoice_code;
        return this;
    }
    REFERENCE(reference) {
        this.reference = reference;
        return this;
    }
    CREATEDAT(createdAt) {
        this.createdAt = createdAt;
        return this;
    }
    CUSTOMER(customer) {
        this.customer = customer;
        return this;
    }
    PRODUCTS(products) {
        this.products = products;
        return this;
    }
    SHIPPING(shipping) {
        this.shipping = shipping;
        return this;
    }
    IVA(iva) {
        this.iva = iva;
        return this;
    }
    TOTAL(total) {
        this.total = total;
        return this;
    }
    PAYMENT_METHOD(payment_method) {
        this.payment_method = payment_method;
        return this;
    }
    STATUS(status) {
        this.status = status;
        return this;
    }
    EXTRAINFO(extraInfo) {
        if (extraInfo)
            this.extraInfo = extraInfo;
        return this;
    }
    build() {
        const invoiceDTO = new InvoiceModelDTO(this.tenantID, this.invoice_code, this.reference, this.createdAt, this.customer, this.products, this.shipping, this.iva, this.total, this.payment_method, this.status);
        if (this.extraInfo)
            invoiceDTO.setExtraInfo(this.extraInfo);
        return invoiceDTO;
    }
}
exports.InvoiceModelDTOBuilder = InvoiceModelDTOBuilder;
//# sourceMappingURL=invoice.model.dto.js.map