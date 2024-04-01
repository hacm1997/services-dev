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
import { InvoiceUsecase } from './invoice.usecase';
import { InvoiceModelDTO } from './invoice.model.dto';
import { InvoiceFilters } from '../service/filters.invoice';
import { FilterInvoiceOptions } from '../util/invoice.interfaces';
import { WompiService } from '../util/wompi.service';

@ApiTags('invoice')
@Controller('invoice')
export class InvoiceResource {
  constructor(
    private invoiceUseCase: InvoiceUsecase,
    private invoiceFilters: InvoiceFilters,
    private wompiService: WompiService,
  ) {}
  @Post('/')
  @ApiBody({ type: InvoiceModelDTO, required: true })
  @ApiResponse({
    status: 201,
    description: 'New invoice created',
    type: InvoiceModelDTO,
  })
  @ApiOperation({ description: 'Create a invoice' })
  public async createInvoice(
    @Body() invoiceDTO: InvoiceModelDTO,
    @Req() request: Request,
  ): Promise<InvoiceModelDTO> {
    return await this.invoiceUseCase.createInvoice(invoiceDTO, request);
  }

  @Get('/')
  @ApiOperation({ description: 'Get Invoices by tenant' })
  @ApiResponse({
    status: 200,
    description: 'Invoices found',
    type: InvoiceModelDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Invoices not found',
  })
  public async getAllInvoices(
    @Req() request: Request,
  ): Promise<InvoiceModelDTO[] | null> {
    const invoices = await this.invoiceUseCase.getAllInvoices(request);

    if (!invoices || invoices.length === 0) {
      throw new NotFoundException('Invoices not found');
    }

    return invoices;
  }

  @Get('/pagination')
  @ApiResponse({ status: 200, type: 'invoiceDTO' })
  @ApiResponse({ status: 404, description: 'invoice was not found' })
  @ApiOperation({ summary: 'Get Invoices by tenant' })
  public async getInvoicesPerPage(
    @Req() request: Request,
    @Query('page') page: string,
    @Query('limit') size: string,
  ): Promise<any> {
    const invoice: any = await this.invoiceUseCase.getInvoicesPerPage(
      request,
      Number(page),
      Number(size),
    );

    if (!invoice) {
      throw new NotFoundException('Invoice was not found');
    }
    return invoice;
  }

  @Get(':code')
  @ApiOperation({ description: 'Get a Invoice by ID' })
  @ApiResponse({
    status: 200,
    description: 'Invoice found',
    type: InvoiceModelDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Invoice not found',
  })
  public async getAllInvoicesById(
    @Req() request: Request,
    @Param('code') code: string,
  ): Promise<InvoiceModelDTO[] | null> {
    const invoice = await this.invoiceUseCase.getAllInvoiceById(request, code);

    if (!invoice || invoice.length === 0) {
      throw new NotFoundException('Invoice not found');
    } else {
      return invoice;
    }
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, type: 'string' })
  @ApiResponse({ status: 404, description: 'Invoice to deleted not found' })
  @ApiOperation({ summary: 'Invoice' })
  public async deleteInvoice(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      return await this.invoiceUseCase.deleteInvoice(request, id);
    } catch (error) {
      throw new NotFoundException('Invoice not deleted');
    }
  }

  @Put('/status')
  @ApiResponse({ status: 200, type: 'Invoice status update success' })
  @ApiResponse({
    status: 404,
    description: 'Invoice status cannot be updated',
  })
  @ApiOperation({ summary: 'Edit Invoice status' })
  public async putInvoiceStatus(
    @Query('invoice') InvoiceID: string,
    @Query('status') status: string,
    @Req() request: Request,
  ): Promise<InvoiceModelDTO> {
    return await this.invoiceUseCase.putInvoiceStatus(
      InvoiceID,
      status,
      request,
    );
  }

  @Put('/reference')
  @ApiResponse({ status: 200, type: 'Invoice status update success' })
  @ApiResponse({
    status: 404,
    description: 'Invoice status cannot be updated',
  })
  @ApiOperation({ summary: 'Edit Invoice status' })
  public async putInvoiceRef(
    @Query('invoice') InvoiceID: string,
    @Query('reference') reference: string,
    @Query('payment_method') payment_method: string,
    @Req() request: Request,
  ): Promise<InvoiceModelDTO> {
    return await this.invoiceUseCase.putInvoiceReference(
      InvoiceID,
      reference,
      payment_method,
      request,
    );
  }

  @Post('filters')
  @ApiOperation({ description: 'Get a Invoices' })
  @ApiResponse({ status: 200, type: 'InvoiceDTO' })
  @ApiResponse({
    status: 404,
    description: 'Invoices not founds',
  })
  public async getFilterParams(
    @Req() request: Request,
    @Query('page') page: string,
    @Query('limit') pageSize: string,
    @Body() filterOptions: FilterInvoiceOptions,
  ): Promise<any> {
    const getInvoiceByFilter = this.invoiceFilters.searchFiltersInvoice(
      request,
      Number(page),
      Number(pageSize),
      filterOptions,
    );
    return getInvoiceByFilter;
  }

  @Get('wompi/signature')
  @ApiOperation({ description: 'Get wompi signature' })
  @ApiResponse({
    status: 200,
    description: 'signature create',
    type: 'wompi signature',
  })
  @ApiResponse({
    status: 404,
    description: 'signature not getting',
  })
  public async getWompiSignature(
    @Query('currency') currency: string,
    @Query('price') price: string,
    @Query('integrity') integrity: string,
  ): Promise<any> {
    try {
      return await this.wompiService.generateSignature(
        currency,
        price,
        integrity,
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
