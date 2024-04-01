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
exports.PaymentUsecase = void 0;
const common_1 = require("@nestjs/common");
const payment_gateway_1 = require("./payment.gateway");
const payment_model_dto_1 = require("./payment.model.dto");
const payment_model_1 = require("../data/payment.model");
let PaymentUsecase = exports.PaymentUsecase = class PaymentUsecase {
    constructor(paymentGateway) {
        this.paymentGateway = paymentGateway;
    }
    async createPayment(paymentDTO) {
        const createdPayment = await this.paymentGateway.createPayment(this.mapDTOToDomain(paymentDTO));
        return this.mapDomainToDTO(createdPayment);
    }
    async getPaymentsByCustomer(tenant, customer) {
        const payments = await this.paymentGateway.getPaymentsByCustomer(tenant, customer);
        return payments.map(this.mapDomainToDTO);
    }
    async putPayment(tenantID, paymentDTO) {
        const putPayment = await this.paymentGateway.putPayment(tenantID, paymentDTO);
        return this.mapDomainToDTO(putPayment);
    }
    mapDTOToDomain(paymentDTO) {
        return payment_model_1.PaymentModel.builder()
            .TENANTID('Payment#' + paymentDTO.tenantID)
            .CUSTOMER(paymentDTO.customer)
            .KEY_CODE(paymentDTO.key_code)
            .CREATEDAT(paymentDTO.createdAt)
            .EXTRAINFO(paymentDTO.extraInfo)
            .build();
    }
    mapDomainToDTO(payment) {
        return (payment_model_dto_1.PaymentModelDTO.builder()
            .CUSTOMER(payment.customer)
            .KEY_CODE(payment.key_code)
            .CREATEDAT(payment.createdAt)
            .EXTRAINFO(payment.extraInfo)
            .build());
    }
};
exports.PaymentUsecase = PaymentUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payment_gateway_1.PaymentGateway])
], PaymentUsecase);
//# sourceMappingURL=payment.usecase.js.map