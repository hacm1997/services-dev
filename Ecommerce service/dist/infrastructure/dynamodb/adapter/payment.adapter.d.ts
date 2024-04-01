import { PaymentModel } from 'src/payment/data/payment.model';
import { PaymentRepository } from 'src/payment/data/payment.repository';
import { PaymentGateway } from 'src/payment/rest/payment.gateway';
export declare class PaymentAdapter extends PaymentGateway {
    private paymentRepository;
    constructor(paymentRepository: PaymentRepository);
    createPayment(payment: PaymentModel): Promise<PaymentModel>;
    putPayment(tenantID: string, payment: PaymentModel): Promise<PaymentModel>;
    deletePayment(paymentID: string): Promise<void>;
    getPaymentsByCustomer(paymentID: string, tenantID: string): Promise<PaymentModel[]>;
    private mapToData;
    private mapToDomain;
}
