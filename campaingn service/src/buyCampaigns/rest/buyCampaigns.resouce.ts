import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Get,
  // NotFoundException,
  // Delete,
  // Param,
  UseInterceptors,
  NotFoundException,
  Param,
  // Put,
} from '@nestjs/common';
import { BuyCampaignDTO } from 'src/buyCampaigns/rest/buyCampaignDTO';
import { BuyCampaignService } from '../service/buyCampaigns.service';
import { TransformInterceptor } from 'src/common/interceptors/transform/transform.interceptor';

@ApiTags('buycampaig')
@Controller('buycampaigns')
@UseInterceptors(TransformInterceptor)
export class BuyCampaignResource {
  constructor(private _buyCampaignService: BuyCampaignService) {}
  @Post('')
  @ApiBody({ type: 'buyCampaignDTO', required: true })
  @ApiResponse({
    status: 201,
    type: 'buyCampaignDTO',
  })
  @ApiResponse({ status: 404, description: 'Cannot buy campaign.' })
  @ApiOperation({})
  public async createCampaign(
    @Body() buycampaignDTO: BuyCampaignDTO,
  ): Promise<BuyCampaignDTO> {
    const buyCampaign: BuyCampaignDTO =
      await this._buyCampaignService.buyCampaignCreate(buycampaignDTO);
    if (!buyCampaign) {
      throw new NotFoundException('Campaign not found');
    }
    return buyCampaign;
  }

  @Get('/email-quantity')
  @ApiResponse({ status: 200, type: 'EmailCampaignDTO' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  @ApiOperation({ summary: 'Get campaigns by id and tenant' })
  public async getEmaiquantity(): Promise<any> {
    return await this._buyCampaignService.getEmailquantity();
  }

  @Get('/:payment-reference')
  @ApiResponse({ status: 200, type: 'EmailCampaignDTO' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  @ApiOperation({ summary: 'Get campaigns by id and tenant' })
  public async updateStatusInvoice(
    @Param('payment-reference') payment_reference: string,
  ): Promise<any> {
    return await this._buyCampaignService.getInvoiceReference(
      payment_reference,
    );
  }
}
