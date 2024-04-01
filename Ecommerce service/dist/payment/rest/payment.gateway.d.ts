import { PaymentModel } from '../data/payment.model';
export declare abstract class PaymentGateway {
    abstract createPayment(payment: PaymentModel): Promise<PaymentModel>;
    abstract deletePayment(PaymentID: string): void;
    private readonly dynamoDB;
    abstract getPaymentsByCustomer(PaymentID: string, tenantID: string): Promise<PaymentModel[]>;
    abstract putPayment(tenantID: string, Payment: PaymentModel): Promise<PaymentModel>;
}
