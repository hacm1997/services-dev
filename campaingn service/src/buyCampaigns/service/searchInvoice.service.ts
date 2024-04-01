import axios from 'axios';
import { BuyCampaignModel } from '../data/buyCampaigns.model';

export class SearchInvoiceService {
  async epaycoResponse(buyDto: BuyCampaignModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const urlEpayco = process.env.APP_EPAYCO_SEARCH_REFERENCE as string;
      axios
        .get(`${urlEpayco}/${buyDto.payment_reference}`)
        .then(async (res) => {
          if (res.data.data.x_response === buyDto.transaction_state) {
            resolve(true);
          } else {
            resolve(false);
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
