import axios from 'axios';
import { BuyCampaignModel } from 'src/buyCampaigns/data/buyCampaigns.model';
import { BuyCampaignRepository } from 'src/buyCampaigns/data/buyCampaigns.repository';

export class EpaycoService {
  constructor(private buyCampaingRepository: BuyCampaignRepository) {}
  async epaycoResponse(buyDto: BuyCampaignModel): Promise<string> {
    return new Promise((resolve, reject) => {
      const epaycoUrl = process.env.APP_EPAYCO_SEARCH_REFERENCE as string;
      console.log('epayco success');

      axios
        .get(`${epaycoUrl}/${buyDto.payment_reference}`)
        .then(async (res) => {
          if (res.data.data.x_response !== buyDto.transaction_state) {
            await this.buyCampaingRepository.updateStatusInvoice(
              buyDto.payment_reference,
              res.data.data.x_response,
              buyDto.quantity,
            );
            resolve('success');
          } else {
            resolve('pending');
          }
        })
        .catch((err) => {
          console.log(
            'No se encontró la referencia de pago o hubo un error',
            err,
          );
          reject('not found');
        });
    });
  }
}
