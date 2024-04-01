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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payment_usecase_1 = require("./payment.usecase");
const payment_model_dto_1 = require("./payment.model.dto");
let PaymentController = exports.PaymentController = class PaymentController {
    constructor(paymentUseCase) {
        this.paymentUseCase = paymentUseCase;
    }
    async getAllPaymentsById(tenant, customer) {
        const payments = await this.paymentUseCase.getPaymentsByCustomer(tenant, customer);
        if (!payments || payments.length === 0) {
            throw new common_1.NotFoundException('Payment not found');
        }
        else {
            return payments;
        }
    }
    async createPayment(paymentDTO) {
        return await this.paymentUseCase.createPayment(paymentDTO);
    }
    async putPayment(tenantID, paymentDTO) {
        return await this.paymentUseCase.putPayment(tenantID, paymentDTO);
    }
};
__decorate([
    (0, common_1.Get)(':tenant/:customer'),
    (0, swagger_1.ApiOperation)({ description: 'Get a payment by Customer' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payment found',
        type: payment_model_dto_1.PaymentModelDTO,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Payment not found',
    }),
    __param(0, (0, common_1.Param)('tenant')),
    __param(1, (0, common_1.Param)('customer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getAllPaymentsById", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiBody)({ type: payment_model_dto_1.PaymentModelDTO, required: true }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'New payment created',
        type: payment_model_dto_1.PaymentModelDTO,
    }),
    (0, swagger_1.ApiOperation)({ description: 'Create a payment' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_model_dto_1.PaymentModelDTO]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Put)(':tenant'),
    (0, swagger_1.ApiResponse)({ status: 200, type: 'Payment update success' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'The payment cannot be edited' }),
    (0, swagger_1.ApiOperation)({ summary: 'Edit payment' }),
    __param(0, (0, common_1.Param)('tenant')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payment_model_dto_1.PaymentModelDTO]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "putPayment", null);
exports.PaymentController = PaymentController = __decorate([
    (0, swagger_1.ApiTags)('payment-gateway'),
    (0, common_1.Controller)('payment-gateway'),
    __metadata("design:paramtypes", [payment_usecase_1.PaymentUsecase])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map