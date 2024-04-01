"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSendService = void 0;
const microlib_1 = require("@beamar/microlib");
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const cifrado_service_1 = require("../../common/general-services/general-functions/cifrado.service");
const trackingEmail_repository_1 = require("../../trackingEmail/data/trackingEmail.repository");
let EmailSendService = class EmailSendService {
    constructor(trackingRepository) {
        this.trackingRepository = trackingRepository;
    }
    async sendEmail(params) {
        try {
            const res = await axios_1.default.post(process.env.APP_FORM_KRU360_SERVICE, params, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return {
                data: res.data,
                status: res.status,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async fetchDataAndSendEmail(campaign, emailQuantity) {
        try {
            const response = await fetch(campaign.file);
            const csvData = await response.text();
            let customerName = '';
            let urlTrakingEmail = '';
            let urlNotificationTrakingEmail = '';
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
                    obj[keys[j].replace(/['"]+/g, '').toLowerCase()] = values[j].replace(/['"]+/g, '');
                }
                result.push(obj);
            }
            if (emailQuantity >= result.length) {
                for (const iterator of result) {
                    if (iterator.hasOwnProperty('email') ||
                        (iterator.hasOwnProperty('correo') &&
                            iterator.hasOwnProperty('name')) ||
                        iterator.hasOwnProperty('nombre')) {
                        const keys = Object.keys(iterator);
                        const keyPositionEmail = keys.indexOf('email' || 'correo');
                        const keyPositionName = keys.indexOf('name' || 'nombre');
                        customerName = iterator[keys[keyPositionName]].replace(/[ '"]+/g, ' ');
                        urlTrakingEmail = await this.createUrlTrakingEmail(campaign.id, iterator[keys[keyPositionEmail]], iterator[keys[keyPositionName]]);
                        urlNotificationTrakingEmail =
                            await this.createUrlNotificationTrakingEmail(campaign.id, iterator[keys[keyPositionEmail]]);
                        param.receivers.push(iterator[keys[keyPositionEmail]]);
                        param.message = campaign.body.replace('{{customerName}}', customerName);
                        param.message = param.message.replace('</body>', `<p style="color: gray; font-size: 12px; text-align: center; margin-bottom: 15px;">
              Alerta de confidencialidad: Este correo contiene información privilegiada. 
              Para detener inmediatamente las comunicaciones por correo, haga clic <a href="${urlNotificationTrakingEmail}" onclick="window.location.reload();">aquí.</a> 
              Una acción, no mas correos.</p></body>`);
                        param.message = param.message.replace('</body>', `<img src="${urlTrakingEmail}" alt=""></body>`);
                        res = await this.sendEmail(param);
                        send++;
                        param.receivers = [];
                    }
                    else {
                        return {
                            data: {
                                message: 'Verifique que su archivo CSV tenga las cabeceras correspondientes (nombres, correo,telefono)',
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
            }
            else {
                return {
                    data: {
                        message: 'insufficient campaigns, We invite you to purchase a package',
                        status: 204,
                    },
                };
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    async createUrlTrakingEmail(idCampaign, emailCustomer, name) {
        try {
            const urlBase = `${process.env.APP_DOMAIN_CAMPAIGN_SERVICE}/tracking/`;
            const hash = `${idCampaign}&${emailCustomer}&${microlib_1.DomainSession.getTenantId()}`;
            const uniqueCode = await (0, cifrado_service_1.HasEncode)(hash);
            const url = `${uniqueCode}.svg`;
            const contact = {
                campaignId: idCampaign,
                uniqueCode: uniqueCode,
                email: emailCustomer,
                name: name,
                statusTracking: 'close',
            };
            await this.trackingRepository.createRegisterSendEmail(contact);
            return `${urlBase}${url}`;
        }
        catch (error) {
            throw new Error('User already exist');
        }
    }
    async createUrlNotificationTrakingEmail(idCampaign, emailCustomer) {
        try {
            const urlBase = `${process.env.APP_DOMAIN_CAMPAIGN_SERVICE}/tracking/notification`;
            const hash = `${idCampaign}&${emailCustomer}&${microlib_1.DomainSession.getTenantId()}`;
            const uniqueCode = await (0, cifrado_service_1.HasEncode)(hash);
            return `${urlBase}/${uniqueCode}`;
        }
        catch (error) {
            throw new Error('User already exist');
        }
    }
};
exports.EmailSendService = EmailSendService;
exports.EmailSendService = EmailSendService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [trackingEmail_repository_1.TrackingRepository])
], EmailSendService);
//# sourceMappingURL=emailSend.service.js.map