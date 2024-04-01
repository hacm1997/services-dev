import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Get,
  NotFoundException,
  Delete,
  Param,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { EmailCampaignDTO } from './emailCampaignDTO';
import { CampaignService } from '../service/campaign.service';
import { TransformInterceptor } from 'src/common/interceptors/transform/transform.interceptor';

@ApiTags('campaign')
@Controller('campaigns')
@UseInterceptors(TransformInterceptor)
export class CampaignResource {
  constructor(private campaignService: CampaignService) {}

  @Post('')
  @ApiBody({ type: 'EmailCampaignDTO', required: true })
  @ApiResponse({
    status: 201,
    type: 'EmailCampaignDTO',
  })
  @ApiResponse({ status: 404, description: 'Cannot create campaign.' })
  @ApiOperation({})
  public async createCampaign(
    @Body() campaignDTO: EmailCampaignDTO,
  ): Promise<EmailCampaignDTO> {
    const campaign: EmailCampaignDTO =
      await this.campaignService.campaignCreate(campaignDTO);
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    return campaign;
  }

  @Put('/:id')
  @ApiResponse({ status: 200, type: 'EmailCampaignDTO' })
  @ApiResponse({ status: 404, description: 'The campaign cannot be edited' })
  @ApiOperation({ summary: 'Edit campaign' })
  public async putCampaing(
    @Body() campaignDTO: EmailCampaignDTO,
  ): Promise<EmailCampaignDTO> {
    return await this.campaignService.putCampaing(campaignDTO);
  }

  @Get('')
  @ApiResponse({ status: 200, type: 'EmailCampaignDTO' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  @ApiOperation({ summary: 'Get campaigns by tenant' })
  public async getAllCampaigns(): Promise<EmailCampaignDTO[]> {
    const campaigns: EmailCampaignDTO[] =
      await this.campaignService.getAllCampaigns();

    if (!campaigns) {
      throw new NotFoundException('Campaign not found');
    }
    return campaigns;
  }
  @Get('/:id')
  @ApiResponse({ status: 200, type: 'EmailCampaignDTO' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  @ApiOperation({ summary: 'Get campaigns by id and tenant' })
  public async getCampaignById(
    @Param('id') id: string,
  ): Promise<EmailCampaignDTO> {
    const campaign: EmailCampaignDTO =
      await this.campaignService.getCampaignById(id);

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    return campaign;
  }
  @Get('/sendEmail/:id')
  @ApiResponse({ status: 200, type: 'SendEmailCampaign' })
  @ApiResponse({ status: 404, description: 'campaign not sent' })
  @ApiOperation({ summary: 'Send campaigns by email' })
  public async sendEmailCampaign(@Param('id') id: string): Promise<any> {
    return await this.campaignService.sendEmailCampaigns(id);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, type: 'string' })
  @ApiResponse({ status: 404, description: 'Campaign not deleted' })
  @ApiOperation({ summary: 'Deleted campaign' })
  public async deleteCampaing(@Param('id') id: string): Promise<any> {
    try {
      return await this.campaignService.deleteCampaign(id);
    } catch (error) {
      throw new NotFoundException('Campaign not deleted');
    }
  }
}
