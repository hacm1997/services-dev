import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShippingModelDTO } from './shipping.model.dto';
import { ShippingUsecase } from './shipping.usecase';

@ApiTags('shipping')
@Controller('shipping')
export class ShippingResource {
  constructor(private shippingUseCase: ShippingUsecase) {}

  @Post('/')
  @ApiBody({ type: ShippingModelDTO, required: true })
  @ApiResponse({
    status: 201,
    description: 'New Shipping created',
    type: ShippingModelDTO,
  })
  @ApiOperation({ description: 'Create a Shipping' })
  public async createProduct(
    @Body() shippingDTO: ShippingModelDTO,
    @Req() request: Request,
  ): Promise<ShippingModelDTO> {
    return await this.shippingUseCase.createShipping(shippingDTO, request);
  }

  @Get(':code')
  @ApiOperation({ description: 'Get a Shipping by code' })
  @ApiResponse({
    status: 200,
    description: 'Shipping found',
    type: ShippingModelDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Shipping not found',
  })
  public async getShippingByCode(
    @Req() request: Request,
    @Param('code') code: string,
  ): Promise<ShippingModelDTO[] | null> {
    const shipping = await this.shippingUseCase.getShippingByCode(
      request,
      code,
    );

    if (!shipping || shipping.length === 0) {
      throw new NotFoundException('Shipping not found');
    } else {
      return shipping;
    }
  }

  @Get('/')
  @ApiOperation({ description: 'Get Shippings by tenant' })
  @ApiResponse({
    status: 200,
    description: 'Shippings found',
    type: ShippingModelDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Shippings not found',
  })
  public async getAllShipping(
    @Req() request: Request,
  ): Promise<ShippingModelDTO[] | null> {
    const shippings = await this.shippingUseCase.getAllShipping(request);

    if (!shippings || shippings.length === 0) {
      throw new NotFoundException('Invoices not found');
    }

    return shippings;
  }

  @Put('/')
  @ApiResponse({ status: 200, type: 'Shiiping update success' })
  @ApiResponse({ status: 404, description: 'The shipping cannot be edited' })
  @ApiOperation({ summary: 'Edit shipping' })
  public async putProduct(
    @Body() shippingDTO: ShippingModelDTO,
    @Req() request: Request,
  ): Promise<ShippingModelDTO> {
    return await this.shippingUseCase.putShipping(shippingDTO, request);
  }

  @Delete('')
  @ApiResponse({ status: 200, type: 'string' })
  @ApiResponse({ status: 404, description: 'Product to deleted not found' })
  @ApiOperation({ summary: 'Deleted product' })
  public async deleteProduct(
    @Req() request: Request,
    @Query('id') id: string,
  ): Promise<any> {
    try {
      return await this.shippingUseCase.deleteShipping(request, id);
    } catch (error) {
      throw new NotFoundException('Product not deleted');
    }
  }
}
