import { Controller, Get, Header, Param } from '@nestjs/common';
import { TrackingEmailService } from '../service/trackingEmail.service';
import { ApiResponse } from '@nestjs/swagger';
@Controller('tracking')
export class TrackingController {
  constructor(private trackingService: TrackingEmailService) {}
  @Get('/:uniqueCode')
  @Header('content-type', 'image/svg+xml')
  @ApiResponse({ status: 200, type: 'TrackingEmail' })
  @ApiResponse({ status: 404, description: 'Tracking not found' })
  public async createdContactTakingEmail(
    @Param('uniqueCode') uniqueCode: string,
  ): Promise<any> {
    const result = await this.trackingService.getImgPixel(uniqueCode);
    return result;
  }
  @Get('/notification/:uniqueCode')
  @Header('content-type', 'text/html')
  @ApiResponse({ status: 200, type: 'NotificationTrackingEmail' })
  @ApiResponse({ status: 404, description: 'Notification Tracking not found' })
  public async putStatusNotificationTrackingEmail(
    @Param('uniqueCode') uniqueCode: string,
  ): Promise<any> {
    return await this.trackingService.putStatusNotificationTrackingEmail(
      uniqueCode,
    );
  }
  @Get('/statisticsShipping/:idCampaign')
  @ApiResponse({ status: 200, type: 'TrackingEmail' })
  @ApiResponse({ status: 404, description: 'Tracking not found' })
  public async getStatisticsShipping(
    @Param('idCampaign') idCampaign: string,
  ): Promise<any> {
    return await this.trackingService.getStatisticsShipping(idCampaign);
  }
}
