import { DomainSession } from '@beamar/microlib';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CampaignModel } from 'src/campaign/data/campaign.model';
import { HasEncode } from 'src/common/general-services/general-functions/cifrado.service';
// import { contactModel } from 'src/contacts/data/contact.model';
// import { ContactRepository } from 'src/contacts/data/contact.repository';
import { trakingEmailModel } from 'src/trackingEmail/data/trackingEmail.model';
import { TrackingRepository } from 'src/trackingEmail/data/trackingEmail.repository';

@Injectable()
export class EmailSendService {
  constructor(private trackingRepository: TrackingRepository) {}
  async sendEmail(params: any): Promise<any> {
    try {
      const res = await axios.post(
        process.env.APP_FORM_KRU360_SERVICE,
        params,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      throw error;
    }
  }

  async fetchDataAndSendEmail(
    campaign: CampaignModel,
    emailQuantity: number,
  ): Promise<any> {
    try {
      const response = await fetch(campaign.file);
      const csvData = await response.text();
      let customerName: string = '';
      let urlTrakingEmail: any = '';
      let urlNotificationTrakingEmail: any = '';

      const param = {
        message: '',
        sender: 'noreply@kru360.com',
        receivers: [],
        subject: campaign.subject,
      };

      const dataCsv = csvData.split('\n');
      const keys = dataCsv[0].split(',');
      const result = [];
      let res;
      let send = 0;

      for (let i = 1; i < dataCsv.length - 1; i++) {
        const values = dataCsv[i].split(',');
        const obj = {};
        for (let j = 0; j < keys.length; j++) {
          obj[keys[j].replace(/['"]+/g, '').toLowerCase()] = values[j].replace(
            /['"]+/g,
            '',
          );
        }
        result.push(obj);
      }
      if (emailQuantity >= result.length) {
        for (const iterator of result) {
          if (
            iterator.hasOwnProperty('email') ||
            (iterator.hasOwnProperty('correo') &&
              iterator.hasOwnProperty('name')) ||
            iterator.hasOwnProperty('nombre')
          ) {
            const keys: any = Object.keys(iterator);
            const keyPositionEmail: any = keys.indexOf('email' || 'correo');
            const keyPositionName: any = keys.indexOf('name' || 'nombre');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            customerName = iterator[keys[keyPositionName]].replace(
              /[ '"]+/g,
              ' ',
            );
            urlTrakingEmail = await this.createUrlTrakingEmail(
              campaign.id,
              iterator[keys[keyPositionEmail]],
              iterator[keys[keyPositionName]],
            );
            urlNotificationTrakingEmail =
              await this.createUrlNotificationTrakingEmail(
                campaign.id,
                iterator[keys[keyPositionEmail]],
              );
            param.receivers.push(iterator[keys[keyPositionEmail]]);
            param.message = campaign.body.replace(
              '{{customerName}}',
              customerName,
            );
            param.message = param.message.replace(
              '</body>',
              `<p style="color: gray; font-size: 12px; text-align: center; margin-bottom: 15px;">
              Alerta de confidencialidad: Este correo contiene información privilegiada. 
              Para detener inmediatamente las comunicaciones por correo, haga clic <a href="${urlNotificationTrakingEmail}" onclick="window.location.reload();">aquí.</a> 
              Una acción, no mas correos.</p></body>`,
            );
            param.message = param.message.replace(
              '</body>',
              `<img src="${urlTrakingEmail}" alt=""></body>`,
            );
            res = await this.sendEmail(param);
            send++;
            param.receivers = [];
          } else {
            return {
              data: {
                message:
                  'Verifique que su archivo CSV tenga las cabeceras correspondientes (nombres, correo,telefono)',
                status: 204,
              },
            };
          }
        }
        res.send = send;
        return {
          data: {
            status: 200,
            message: res.data.message,
            send: res.send,
          },
        };
      } else {
        return {
          data: {
            message:
              'insufficient campaigns, We invite you to purchase a package',
            status: 204,
          },
        };
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  private async createUrlTrakingEmail(
    idCampaign: string,
    emailCustomer: string,
    name: string,
  ) {
    try {
      const urlBase = `${process.env.APP_DOMAIN_CAMPAIGN_SERVICE}/tracking/`;
      const hash = `${idCampaign}&${emailCustomer}&${DomainSession.getTenantId()}`;
      const uniqueCode = await HasEncode(hash);
      const url = `${uniqueCode}.svg`;
      const contact: trakingEmailModel = {
        campaignId: idCampaign,
        uniqueCode: uniqueCode,
        email: emailCustomer,
        name: name,
        statusTracking: 'close',
      };
      await this.trackingRepository.createRegisterSendEmail(contact);
      return `${urlBase}${url}`;
    } catch (error) {
      throw new Error('User already exist');
    }
  }
  private async createUrlNotificationTrakingEmail(
    idCampaign: string,
    emailCustomer: string,
  ) {
    try {
      const urlBase = `${process.env.APP_DOMAIN_CAMPAIGN_SERVICE}/tracking/notification`;
      const hash = `${idCampaign}&${emailCustomer}&${DomainSession.getTenantId()}`;
      const uniqueCode = await HasEncode(hash);
      return `${urlBase}/${uniqueCode}`;
    } catch (error) {
      throw new Error('User already exist');
    }
  }
}
