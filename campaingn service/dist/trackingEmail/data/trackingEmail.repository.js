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
exports.TrackingRepository = void 0;
const Constants_1 = require("../../infrastructure/dynamodb/intializer/Constants");
const constants_1 = require("../util/constants");
const client_dynamodb_1 = require("../../infrastructure/dynamodb/client.dynamodb");
const common_1 = require("@nestjs/common");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const cifrado_service_1 = require("../../common/general-services/general-functions/cifrado.service");
const templateThank_1 = require("../util/templateThank");
let TrackingRepository = class TrackingRepository {
    constructor(fullClientDynamodb) {
        this.fullClientDynamodb = fullClientDynamodb;
    }
    async getTrackingEmail(uniqueCode) {
        const decode = await (0, cifrado_service_1.HasDecode)(uniqueCode.split('.')[0]);
        const item = {
            pid: decode.split('&')[0],
            sid: uniqueCode.split('.')[0],
            statusTracking: 'open',
        };
        await this.putStatusTrackingEmail(item);
        return `<?xml version="1.0" encoding="UTF-8"?>
            <svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>`;
    }
    async createRegisterSendEmail(item) {
        try {
            const isContact = await this.getContactByUniqueCode(item.uniqueCode);
            if (isContact) {
                throw new Error('User already exist');
            }
            const param = this.createNewItemFromDomainModel(item);
            const artifact = {
                TableName: Constants_1.TABLE_TRACKING_NAME,
                Item: param,
            };
            await this.fullClientDynamodb.fullClient.putItem(artifact);
            return true;
        }
        catch (error) {
            return error;
        }
    }
    async getContactByUniqueCode(uniqueCode) {
        const params = {
            TableName: Constants_1.TABLE_TRACKING_NAME,
            IndexName: Constants_1.REVERSE_INDEX,
            KeyConditionExpression: 'sid = :sid',
            ExpressionAttributeValues: {
                ':sid': { S: uniqueCode },
            },
        };
        try {
            const data = await this.fullClientDynamodb.fullClient.query(params);
            return data.Items[0] ? data.Items[0] : null;
        }
        catch (error) {
            throw error;
        }
    }
    async putStatusNotificationTrackingEmail(uniqueCode) {
        const decode = await (0, cifrado_service_1.HasDecode)(uniqueCode.split('.')[0]);
        const params = new lib_dynamodb_1.UpdateCommand({
            TableName: Constants_1.TABLE_TRACKING_NAME,
            Key: {
                pid: decode.split('&')[0],
                sid: uniqueCode.split('.')[0],
            },
            UpdateExpression: 'SET  #receiveNotification = :receiveNotification',
            ExpressionAttributeNames: {
                '#receiveNotification': 'receiveNotification',
            },
            ExpressionAttributeValues: {
                ':receiveNotification': 'no',
            },
            ReturnValues: 'ALL_NEW',
        });
        try {
            await this.fullClientDynamodb.fullClient.send(params);
            return templateThank_1.template;
        }
        catch (error) {
            throw error;
        }
    }
    async putStatusTrackingEmail(item) {
        const params = new lib_dynamodb_1.UpdateCommand({
            TableName: Constants_1.TABLE_TRACKING_NAME,
            Key: {
                pid: item.pid,
                sid: item.sid,
            },
            UpdateExpression: 'SET  #statusTracking = :statusTracking',
            ExpressionAttributeNames: {
                '#statusTracking': 'statusTracking',
            },
            ExpressionAttributeValues: {
                ':statusTracking': item.statusTracking,
            },
            ReturnValues: 'ALL_NEW',
        });
        try {
            await this.fullClientDynamodb.fullClient.send(params);
            return item;
        }
        catch (error) {
            throw error;
        }
    }
    async getStatisticsShipping(idCampaign, startSid, campaign, quantity) {
        const params = {
            TableName: Constants_1.TABLE_TRACKING_NAME,
            KeyConditionExpression: 'pid = :pid AND begins_with(sid, :sid)',
            ExpressionAttributeValues: {
                ':pid': { S: idCampaign },
                ':sid': { S: startSid },
            },
        };
        try {
            const data = await this.fullClientDynamodb.fullClient.query(params);
            let emailOpen = 0;
            let receiverEmail = 0;
            if (data && data.Items.length > 0) {
                data.Items.map((item) => {
                    if (item.statusTracking &&
                        item.statusTracking.S === constants_1.StatusEmailview.abierto) {
                        emailOpen++;
                    }
                    if (item.receiveNotification &&
                        item.receiveNotification.S === constants_1.ReceiveEmail.si) {
                        receiverEmail++;
                    }
                });
                const dataResult = {
                    percentageAndColor: this.percentaje(quantity, data.Items.length),
                    dataCampaign: campaign ? this.mapToDomainCampaigns(campaign) : [],
                    cantSend: data.Items.length,
                    cantBySend: quantity,
                    cantEmailOpen: emailOpen,
                    cantReceiverEmail: receiverEmail,
                };
                const customerCamapaign = [];
                data.Items.map((item) => {
                    customerCamapaign.push(this.mapToDomain(item));
                });
                dataResult.contactCamapaign = customerCamapaign;
                return dataResult;
            }
            return {
                percentageAndColor: 0,
                dataCampaign: {},
                cantSend: 0,
                cantBySend: 0,
                contactCamapaign: [],
                cantEmailOpen: 0,
                cantReceiverEmail: 0,
            };
        }
        catch (error) {
            throw error;
        }
    }
    createNewItemFromDomainModel(contact) {
        const item = {
            pid: { S: contact.campaignId },
            sid: { S: contact.uniqueCode },
            name: { S: contact.name },
            email: { S: contact.email },
            campaignId: { S: contact.campaignId },
            statusTracking: { S: contact.statusTracking },
            typeContact: {
                S: contact.typeContact ? contact.typeContact : constants_1.TypeContact.contact,
            },
            receiveNotification: { S: 'si' },
        };
        return item;
    }
    mapToDomain(item) {
        const newItem = {
            id: item.pid.S,
            email: item.email ? item.email.S : '',
            name: item.name ? item.name.S : '',
            statusTracking: item.statusTracking ? item.statusTracking.S : '',
            receiveNotification: item.receiveNotification
                ? item.receiveNotification.S
                : '',
        };
        return newItem;
    }
    mapToDomainCampaigns(item) {
        const newItem = {
            tenantId: item.sid.S,
            id: item.pid.S,
            title: item.title.S,
            subject: item.subject.S,
            body: item.body.S,
        };
        if (item.file) {
            newItem.file = item.file.S;
        }
        return newItem;
    }
    percentaje(cant, send) {
        let result = {};
        const percentage = (send * 100) / cant;
        if (percentage === 100) {
            result = { valuePercenege: percentage, color: 'green' };
        }
        if (percentage >= 50 && percentage < 100) {
            result = { valuePercenege: percentage, color: '#f67119' };
        }
        if (percentage < 50) {
            result = { valuePercenege: percentage, color: 'red' };
        }
        return result;
    }
};
exports.TrackingRepository = TrackingRepository;
TrackingRepository.GROUP = 'TRSE';
exports.TrackingRepository = TrackingRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_dynamodb_1.ClientDynamodb])
], TrackingRepository);
//# sourceMappingURL=trackingEmail.repository.js.map