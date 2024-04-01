import { DynamoDB } from 'aws-sdk';
import { PaymentModel } from '../data/payment.model';

export abstract class PaymentGateway {
  abstract createPayment(payment: PaymentModel): Promise<PaymentModel>;
  abstract deletePayment(PaymentID: string): void;
  private readonly dynamoDB = new DynamoDB.DocumentClient();
  // abstract getAllPayments(PaymentID: string): Promise<PaymentModel[]>;
  abstract getPaymentsByCustomer(
    PaymentID: string,
    tenantID: string,
  ): Promise<PaymentModel[]>;
  abstract putPayment(
    tenantID: string,
    Payment: PaymentModel,
  ): Promise<PaymentModel>;
}
