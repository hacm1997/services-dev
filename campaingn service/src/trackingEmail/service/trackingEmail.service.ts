import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackingRepository } from '../data/trackingEmail.repository';
import { HasEncode } from 'src/common/general-services/general-functions/cifrado.service';
import { getQuantityEmailBySend } from '../util/functions';
import { CampaignRepository } from 'src/campaign/data/campaign.repository';

@Injectable()
export class TrackingEmailService {
  constructor(
    private trackingRepository: TrackingRepository,
    private campaignRepository: CampaignRepository,
  ) {}

  public async getImgPixel(uniqueCode: string): Promise<any> {
    const imgPixel: any =
      await this.trackingRepository.getTrackingEmail(uniqueCode);
    if (!imgPixel) {
      throw new NotFoundException('imgPixel not found');
    }
    return imgPixel;
  }
  public async putStatusNotificationTrackingEmail(
    uniqueCode: any,
  ): Promise<any> {
    return await this.trackingRepository.putStatusNotificationTrackingEmail(
      uniqueCode,
    );
  }
  public async getStatisticsShipping(idCampaign: string): Promise<any> {
    if (idCampaign !== undefined && idCampaign !== 'undefined') {
      const startSid = await HasEncode(idCampaign);
      const campaign =
        await this.campaignRepository.getCampaingItemByKeyTrackingEmail(
          idCampaign,
        );
      const quantity = await getQuantityEmailBySend(campaign.file.S);
      return await this.trackingRepository.getStatisticsShipping(
        idCampaign,
        startSid,
        campaign,
        quantity,
      );
    }
  }
}
