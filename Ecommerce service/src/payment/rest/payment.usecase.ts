import { Injectable } from '@nestjs/common';
import { PaymentGateway } from './payment.gateway';
import { PaymentModelDTO } from './payment.model.dto';
import { PaymentModel } from '../data/payment.model';

@Injectable()
export class PaymentUsecase {
  constructor(private paymentGateway: PaymentGateway) {}

  public async createPayment(
    paymentDTO: PaymentModelDTO,
  ): Promise<PaymentModelDTO> {
    const createdPayment: PaymentModel =
      await this.paymentGateway.createPayment(this.mapDTOToDomain(paymentDTO));
    return this.mapDomainToDTO(createdPayment);
  }

  public async getPaymentsByCustomer(
    tenant: string,
    customer: string,
  ): Promise<PaymentModelDTO[]> {
    const payments: PaymentModel[] =
      await this.paymentGateway.getPaymentsByCustomer(tenant, customer);

    return payments.map(this.mapDomainToDTO);
  }

  public async putPayment(
    tenantID: string,
    paymentDTO: PaymentModelDTO,
  ): Promise<PaymentModelDTO> {
    const putPayment: PaymentModel = await this.paymentGateway.putPayment(
      tenantID,
      paymentDTO,
    );
    return this.mapDomainToDTO(putPayment);
  }

  private mapDTOToDomain(paymentDTO: PaymentModelDTO): PaymentModel {
    return PaymentModel.builder()
      .TENANTID('Payment#' + paymentDTO.tenantID)
      .CUSTOMER(paymentDTO.customer)
      .KEY_CODE(paymentDTO.key_code)
      .CREATEDAT(paymentDTO.createdAt)
      .EXTRAINFO(paymentDTO.extraInfo)
      .build();
  }

  private mapDomainToDTO(payment: PaymentModel): PaymentModelDTO {
    return (
      PaymentModelDTO.builder()
        .CUSTOMER(payment.customer)
        //.TENANTID(payment.tenantID)
        .KEY_CODE(payment.key_code)
        .CREATEDAT(payment.createdAt)
        .EXTRAINFO(payment.extraInfo)
        .build()
    );
  }
}
