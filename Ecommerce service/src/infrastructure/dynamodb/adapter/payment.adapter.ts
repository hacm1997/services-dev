import { Inject, Injectable } from '@nestjs/common';
import { PaymentEnum } from 'src/infrastructure/model/payment/payment.enum';
import { PaymentModelData } from 'src/infrastructure/model/payment/payment.model.data';
import { PaymentModel } from 'src/payment/data/payment.model';
import { PaymentRepository } from 'src/payment/data/payment.repository';
import { PaymentGateway } from 'src/payment/rest/payment.gateway';

@Injectable()
export class PaymentAdapter extends PaymentGateway {
  constructor(
    @Inject('PaymentRepository') private paymentRepository: PaymentRepository,
  ) {
    super();
  }

  public async createPayment(payment: PaymentModel): Promise<PaymentModel> {
    try {
      const storePayment = await this.paymentRepository.createPayment(
        this.mapToData(payment, PaymentEnum.NEW),
      );
      return this.mapToDomain(storePayment);
    } catch (error) {
      console.log(error);
      throw new Error('Error to save payment in db.');
    }
  }
  public async putPayment(
    tenantID: string,
    payment: PaymentModel,
  ): Promise<PaymentModel> {
    try {
      const storePayment = await this.paymentRepository.putPayment(
        tenantID,
        this.mapToData(payment, PaymentEnum.NEW),
      );
      return this.mapToDomain(storePayment);
    } catch (error) {
      console.log('Error to update payment.');
      throw new Error(error);
    }
  }
  public async deletePayment(paymentID: string): Promise<void> {
    return undefined;
  }

  public async getPaymentsByCustomer(
    paymentID: string,
    tenantID: string,
  ): Promise<PaymentModel[]> {
    try {
      const storePayments = await this.paymentRepository.getPaymentsByCustomer(
        paymentID,
        tenantID,
      );

      if (storePayments) {
        return storePayments.map(this.mapToDomain);
      } else {
        return []; // Devolver un arreglo vacío si no se encontraron paymentos
      }
    } catch (error) {
      console.error('Error getting payments from db:', error);
      throw new Error('Error to get payments in db.');
    }
  }

  private mapToData(
    payment: PaymentModel,
    behavior: PaymentEnum,
  ): PaymentModelData {
    const paymentData = new PaymentModelData(
      payment.tenantID,
      payment.customer,
      payment.key_code,
      payment.createdAt,
    );
    if (behavior === PaymentEnum.UPDATE)
      paymentData.customer = payment.customer;
    paymentData.extraInfo = payment.extraInfo;
    return paymentData;
  }

  private mapToDomain(paymentData: PaymentModelData): PaymentModel {
    return PaymentModel.builder()
      .TENANTID(paymentData.tenantID)
      .CUSTOMER(paymentData.customer)
      .KEY_CODE(paymentData.key_code)
      .CREATEDAT(paymentData.createdAt)
      .EXTRAINFO(paymentData.extraInfo)
      .build();
  }
}
