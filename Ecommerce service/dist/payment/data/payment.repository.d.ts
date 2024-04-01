import { PaymentModelData } from '../../infrastructure/model/payment/payment.model.data';
import { ClientDynamodb } from '../../infrastructure/dynamodb/client';
export interface PaymentRepository {
    createPayment: (payment: PaymentModelData) => Promise<PaymentModelData>;
    getPaymentsByCustomer: (tenantID: string, customer: string) => Promise<PaymentModelData[] | null>;
    putPayment: (tenantID: string, payment: PaymentModelData) => Promise<PaymentModelData>;
}
export declare class PaymentRepositoryImpl implements PaymentRepository {
    private fullClientDynamodb;
    constructor(fullClientDynamodb: ClientDynamodb);
    createPayment(payment: PaymentModelData): Promise<PaymentModelData>;
    getPaymentsByCustomer(tenantID: string, customer: string): Promise<PaymentModelData[] | null>;
    putPayment(tenantID: string, payment: any): Promise<PaymentModelData>;
}
