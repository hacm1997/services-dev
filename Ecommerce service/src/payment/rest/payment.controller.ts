import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentUsecase } from './payment.usecase';
import { PaymentModelDTO } from 'src/payment/rest/payment.model.dto';

@ApiTags('payment-gateway')
@Controller('payment-gateway')
export class PaymentController {
  constructor(private paymentUseCase: PaymentUsecase) {}
  @Get(':tenant/:customer')
  @ApiOperation({ description: 'Get a payment by Customer' })
  @ApiResponse({
    status: 200,
    description: 'Payment found',
    type: PaymentModelDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Payment not found',
  })
  public async getAllPaymentsById(
    @Param('tenant') tenant: string,
    @Param('customer') customer: string,
  ): Promise<PaymentModelDTO[] | null> {
    const payments = await this.paymentUseCase.getPaymentsByCustomer(
      tenant,
      customer,
    );

    if (!payments || payments.length === 0) {
      throw new NotFoundException('Payment not found');
    } else {
      return payments;
    }
  }

  @Post('/')
  @ApiBody({ type: PaymentModelDTO, required: true })
  @ApiResponse({
    status: 201,
    description: 'New payment created',
    type: PaymentModelDTO,
  })
  @ApiOperation({ description: 'Create a payment' })
  public async createPayment(
    @Body() paymentDTO: PaymentModelDTO,
  ): Promise<PaymentModelDTO> {
    return await this.paymentUseCase.createPayment(paymentDTO);
  }

  @Put(':tenant')
  @ApiResponse({ status: 200, type: 'Payment update success' })
  @ApiResponse({ status: 404, description: 'The payment cannot be edited' })
  @ApiOperation({ summary: 'Edit payment' })
  public async putPayment(
    @Param('tenant') tenantID: string,
    @Body() paymentDTO: PaymentModelDTO,
  ): Promise<PaymentModelDTO> {
    return await this.paymentUseCase.putPayment(tenantID, paymentDTO);
  }
}
