import { PaymentGateway } from './payment.gateway';
import { PaymentModelDTO } from './payment.model.dto';
export declare class PaymentUsecase {
    private paymentGateway;
    constructor(paymentGateway: PaymentGateway);
    createPayment(paymentDTO: PaymentModelDTO): Promise<PaymentModelDTO>;
    getPaymentsByCustomer(tenant: string, customer: string): Promise<PaymentModelDTO[]>;
    putPayment(tenantID: string, paymentDTO: PaymentModelDTO): Promise<PaymentModelDTO>;
    private mapDTOToDomain;
    private mapDomainToDTO;
}
