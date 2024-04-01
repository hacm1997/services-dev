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
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerUsecase } from './customer.usecase';
import { CustomerModelDTO } from './customer.model.dto';
import { FilterCustomerOptions } from '../util/customer.interfaces';
import { CustomerFilters } from '../service/customer.filter';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@ApiTags('customer')
@Controller('customer')
export class CustomerResource {
  constructor(
    private customerUseCase: CustomerUsecase,
    private customerFilters: CustomerFilters,
  ) {}

  @Post('/')
  @ApiBody({ type: CustomerModelDTO, required: true })
  @ApiResponse({
    status: 201,
    description: 'New customer saved',
    type: CustomerModelDTO,
  })
  @ApiOperation({ description: 'Create a customer' })
  public async createCustomer(
    @Body() customerDTO: CustomerModelDTO,
    @Req() request: Request,
  ): Promise<CustomerModelDTO> {
    return await this.customerUseCase.createCustomer(customerDTO, request);
  }

  // GET CLIENT BY ID
  @Get(':id')
  @ApiOperation({ description: 'Get all Customers by tenant' })
  @ApiResponse({
    status: 200,
    description: 'Customers found',
    type: CustomerModelDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Customers not found',
  })
  public async getAllCustomerByID(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<CustomerModelDTO[] | null> {
    const customer = await this.customerUseCase.getAllCustomerByID(id, request);

    if (!customer || customer.length === 0) {
      throw new NotFoundException('customers not found');
    }

    return customer;
  }

  // GET ALL Customers BY TENNANT
  @Get('/')
  @ApiOperation({ description: 'Get all Customers' })
  @ApiResponse({
    status: 200,
    description: 'Customers found',
    type: CustomerModelDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Customers not found',
  })
  public async getAllCustomers(
    @Req() request: Request,
    @Query('page') page: string,
    @Query('limit') size: string,
  ): Promise<CustomerModelDTO[] | null> {
    const customer = await this.customerUseCase.getAllCustomers(
      request,
      Number(page),
      Number(size),
    );

    if (!customer || customer.length === 0) {
      throw new NotFoundException('Customers not found');
    }

    return customer;
  }

  @Put('/')
  @ApiResponse({ status: 200, type: 'Product update success' })
  @ApiResponse({ status: 404, description: 'The product cannot be edited' })
  @ApiOperation({ summary: 'Edit product' })
  public async putCustomer(
    @Body() customerDTO: CustomerModelDTO,
    @Req() request: Request,
  ): Promise<CustomerModelDTO> {
    return await this.customerUseCase.putCustomer(customerDTO, request);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, type: 'string' })
  @ApiResponse({ status: 404, description: 'Customer to deleted not found' })
  @ApiOperation({ summary: 'Customer product' })
  public async deleteCustomer(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      return await this.customerUseCase.deleteCustomer(request, id);
    } catch (error) {
      throw new NotFoundException('Product not Customer');
    }
  }

  @Post('filters')
  @ApiOperation({ description: 'Get a customers' })
  @ApiResponse({ status: 200, type: 'CustomerDTO' })
  @ApiResponse({
    status: 404,
    description: 'Customers not founds',
  })
  public async getFilterParams(
    @Req() request: Request,
    @Query('page') page: string,
    @Query('limit') pageSize: string,
    @Body() filterOptions: FilterCustomerOptions,
  ): Promise<any> {
    const getInvoiceByFilter = this.customerFilters.searchCustomerFilters(
      request,
      Number(page),
      Number(pageSize),
      filterOptions,
    );
    return getInvoiceByFilter;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Req() request: Request) {
    // Guardar datos en DynamoDB
    const importData = await this.customerUseCase.importCustomers(
      file,
      request,
    );

    return importData;
  }

  @Get('/export/file')
  async exportCustomer(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const exportCustomer = await this.customerUseCase.exportCustomers(
      request,
      response,
    );
    return exportCustomer;
  }
}
