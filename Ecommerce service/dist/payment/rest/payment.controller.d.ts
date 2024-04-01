import { PaymentUsecase } from './payment.usecase';
import { PaymentModelDTO } from 'src/payment/rest/payment.model.dto';
export declare class PaymentController {
    private paymentUseCase;
    constructor(paymentUseCase: PaymentUsecase);
    getAllPaymentsById(tenant: string, customer: string): Promise<PaymentModelDTO[] | null>;
    createPayment(paymentDTO: PaymentModelDTO): Promise<PaymentModelDTO>;
    putPayment(tenantID: string, paymentDTO: PaymentModelDTO): Promise<PaymentModelDTO>;
}
