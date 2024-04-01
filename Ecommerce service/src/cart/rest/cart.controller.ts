import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartInterface } from '../data/cart.interface';
import { PricingCalculate } from '../service/pricing-calculate';

@ApiTags('cart')
@Controller('cart')
export class CartResource {
  constructor(private priceCaculated: PricingCalculate) {}

  @Post('/calculate')
  // @ApiBody({ type: any, required: true })
  @ApiResponse({
    status: 201,
    description: 'Total Price calculated',
  })
  @ApiOperation({ description: 'Create a invoice' })
  public async createInvoice(
    @Body() cartData: CartInterface,
    @Req() request: Request,
  ): Promise<any> {
    return this.priceCaculated.calculateTotal(cartData);
  }
}
