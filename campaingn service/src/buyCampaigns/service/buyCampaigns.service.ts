import { Injectable } from '@nestjs/common';
import { BuyCampaignDTO } from '../rest/buyCampaignDTO';
import { BuyCampaignModel } from '../data/buyCampaigns.model';
import { BuyCampaignRepository } from '../data/buyCampaigns.repository';

@Injectable()
export class BuyCampaignService {
  constructor(private _buyCampaignRepository: BuyCampaignRepository) {}

  public async buyCampaignCreate(
    _buyCampaigntDTO: BuyCampaignDTO,
  ): Promise<BuyCampaignDTO> {
    const createdBuyCampaign: BuyCampaignModel =
      await this._buyCampaignRepository.buyCampaignCreate(
        this.mapDTOToDomain(_buyCampaigntDTO),
      );
    if (!createdBuyCampaign) {
      throw new Error('Error creating the email campaign');
    }
    return this.mapDomainToDTO(createdBuyCampaign);
  }

  public async getEmailquantity(): Promise<any> {
    return await this._buyCampaignRepository.getEmailquantity();
  }
  public async getInvoiceReference(payment_reference: string): Promise<any> {
    return await this._buyCampaignRepository.getInvoiceByIdReference(
      payment_reference,
    );
  }
  // public async updateStatusInvoice(
  //   idPaymentReference: string,
  //   status: any,
  // ): Promise<any> {
  //   return await this._buyCampaignRepository.updateStatusInvoice(
  //     idPaymentReference,
  //     status,
  //   );
  // }

  private mapDTOToDomain(buyCampaignDTO: BuyCampaignDTO): BuyCampaignModel {
    const buyCampaignModel: BuyCampaignModel = {
      transaction_state: buyCampaignDTO.transaction_state,
      payment_reference: buyCampaignDTO.payment_reference,
      quantity: buyCampaignDTO.quantity,
      transaction_date: buyCampaignDTO.transaction_date,
      description: buyCampaignDTO.description,
      type_payment: buyCampaignDTO.type_payment,
      transaction_response: buyCampaignDTO.transaction_response,
      payment_gateway: buyCampaignDTO.payment_gateway,
      email: buyCampaignDTO.email,
      moreInformation: buyCampaignDTO.moreInformation,
    };
    return buyCampaignModel;
  }

  private mapDomainToDTO(buyCampaign: BuyCampaignModel): BuyCampaignDTO {
    const buyCampaignModelDTO: BuyCampaignDTO = {
      id: buyCampaign.id,
      transaction_state: buyCampaign.transaction_state,
      payment_reference: buyCampaign.payment_reference,
      quantity: buyCampaign.quantity,
      transaction_date: buyCampaign.transaction_date,
      description: buyCampaign.description,
      type_payment: buyCampaign.type_payment,
      transaction_response: buyCampaign.transaction_response,
      payment_gateway: buyCampaign.payment_gateway,
      email: buyCampaign.email,
      moreInformation: buyCampaign.moreInformation,
    };
    return buyCampaignModelDTO;
  }
}
