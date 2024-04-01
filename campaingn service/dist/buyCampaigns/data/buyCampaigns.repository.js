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
var BuyCampaignRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyCampaignRepository = void 0;
const common_1 = require("@nestjs/common");
const microlib_1 = require("@beamar/microlib");
const client_dynamodb_1 = require("../../infrastructure/dynamodb/client.dynamodb");
const Constants_1 = require("../../infrastructure/dynamodb/intializer/Constants");
const constants_1 = require("../util/constants");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const availableAmoutCampaigns_1 = require("../util/availableAmoutCampaigns");
const cron_job_service_1 = require("../../common/general-services/cron/cron-job.service");
const console_1 = require("console");
const searchInvoice_service_1 = require("../service/searchInvoice.service");
let BuyCampaignRepository = BuyCampaignRepository_1 = class BuyCampaignRepository {
    constructor(fullClientDynamodb, availableAmoutCampaigns, cronJobService, searchInvoiceService) {
        this.fullClientDynamodb = fullClientDynamodb;
        this.availableAmoutCampaigns = availableAmoutCampaigns;
        this.cronJobService = cronJobService;
        this.searchInvoiceService = searchInvoiceService;
    }
    async buyCampaignCreate(buyCampaign) {
        const validationsInvoice = await this.searchInvoiceService.epaycoResponse(buyCampaign);
        const invoiceReference = await this.getInvoiceByIdReference(buyCampaign.payment_reference);
        if (!invoiceReference && validationsInvoice) {
            const item = await this.createNewItemFromDomainModel(buyCampaign);
            const artifact = {
                TableName: Constants_1.TABLE_COMPRA_NAME,
                Item: item,
            };
            try {
                await this.fullClientDynamodb.fullClient.putItem(artifact);
                if (buyCampaign.transaction_state === constants_1.Status.pending) {
                    this.cronJobService.startCronJob(buyCampaign);
                }
                return this.mapToDomain(item);
            }
            catch (error) {
                return error;
            }
        }
        throw console_1.error;
    }
    async buyCampaignFirstCreate() {
        const item = await this.mapToFirstInvoice();
        const artifact = {
            TableName: Constants_1.TABLE_COMPRA_NAME,
            Item: item,
        };
        try {
            await this.fullClientDynamodb.fullClient.putItem(artifact);
            const buyCampaignFirst = this.mapToDomain(item);
            buyCampaignFirst.userNew = true;
            return this.mapToDomain(item);
        }
        catch (error) {
            return error;
        }
    }
    async getEmailquantity() {
        try {
            const result = await this.getCurrentInvoice();
            if (result === undefined) {
                const resultCreated = await this.buyCampaignFirstCreate();
                resultCreated.userNew = true;
                return resultCreated;
            }
            result.userNew = false;
            return result;
        }
        catch (error) {
            console.error('Could not get the number of campaigns', error);
            throw error;
        }
    }
    async getCurrentInvoice() {
        const params = {
            TableName: Constants_1.TABLE_COMPRA_NAME,
            IndexName: Constants_1.REVERSE_INDEX,
            KeyConditionExpression: 'sid = :sid AND begins_with(pid, :pid)',
            FilterExpression: 'transaction_state = :transactionState',
            ExpressionAttributeValues: {
                ':pid': { S: microlib_1.DomainSession.getTenantId() },
                ':sid': { S: microlib_1.DomainSession.getTenantId() },
                ':transactionState': { S: String(constants_1.Status.success) },
            },
        };
        try {
            const result = await this.fullClientDynamodb.fullClient.query(params);
            if (result.Items.length > 0) {
                const registrosOrdenados = result.Items.sort((a, b) => {
                    return (new Date(b.createdAt.S).getTime() -
                        new Date(a.createdAt.S).getTime());
                });
                return this.mapToDomain(registrosOrdenados[0]);
            }
        }
        catch (error) {
            console.error('Error al obtener el registro más reciente:', error);
            throw error;
        }
    }
    async getInvoiceByIdReference(payment_reference) {
        const params = {
            TableName: Constants_1.TABLE_COMPRA_NAME,
            IndexName: Constants_1.REVERSE_INDEX,
            KeyConditionExpression: 'sid = :sid AND begins_with(pid, :pid)',
            FilterExpression: 'payment_reference = :paymentReference',
            ExpressionAttributeValues: {
                ':pid': {
                    S: microlib_1.DomainSession.getTenantId(),
                },
                ':sid': { S: microlib_1.DomainSession.getTenantId() },
                ':paymentReference': { S: payment_reference },
            },
        };
        const result = await this.fullClientDynamodb.fullClient.query(params);
        return result.Items[0];
    }
    async updateStatusInvoice(payment_reference, status, quantity) {
        const invoiceReference = await this.getInvoiceByIdReference(payment_reference);
        const params = new lib_dynamodb_1.UpdateCommand({
            TableName: Constants_1.TABLE_COMPRA_NAME,
            Key: {
                pid: invoiceReference.id,
                sid: invoiceReference.tenantId,
            },
            UpdateExpression: 'SET transaction_state = :status',
            ExpressionAttributeValues: {
                ':status': status,
            },
            ReturnValues: 'ALL_NEW',
        });
        try {
            await this.fullClientDynamodb.fullClient.send(params);
            const invoiceCurrent = await this.getCurrentInvoice();
            const quantityNew = this.availableAmoutCampaigns.addCampaignsAmount(quantity, invoiceCurrent.quantity);
            this.updateAmountCurrent(quantityNew);
            return {
                status: 200,
                msj: 'edited status success',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async updateAmountCurrent(quantity) {
        const invoiceCurrent = await this.getCurrentInvoice();
        const params = new lib_dynamodb_1.UpdateCommand({
            TableName: Constants_1.TABLE_COMPRA_NAME,
            Key: {
                pid: invoiceCurrent.id,
                sid: invoiceCurrent.tenantId,
            },
            UpdateExpression: 'SET quantity = :quantity',
            ExpressionAttributeValues: {
                ':quantity': quantity,
            },
            ReturnValues: 'ALL_NEW',
        });
        try {
            await this.fullClientDynamodb.fullClient.send(params);
            return {
                status: 200,
                msj: 'edited status success',
            };
        }
        catch (error) {
            throw error;
        }
    }
    mapToDomain(item) {
        return {
            tenantId: item.sid.S,
            id: item.pid.S,
            transaction_state: item.transaction_state.S,
            payment_reference: item.payment_reference.S,
            quantity: item.quantity.N,
            transaction_date: item.transaction_date.S,
            description: item.description.S,
            type_payment: item.type_payment.S,
            transaction_response: item.transaction_response.S,
            payment_gateway: item.payment_gateway.S,
            email: item.email.S,
            createdAt: item.createdAt.S,
        };
    }
    async createNewItemFromDomainModel(bc) {
        if (bc.transaction_state === constants_1.Status.success) {
            const emailQuantity = await this.getEmailquantity();
            const quantity = this.availableAmoutCampaigns.addCampaignsAmount(Number(emailQuantity.quantity), bc.quantity);
            bc.quantity = quantity;
        }
        let item = {
            payment_reference: { S: bc.payment_reference },
            transaction_state: { S: bc.transaction_state },
            quantity: { N: bc.quantity.toString() },
            transaction_date: { S: bc.transaction_date },
            description: { S: bc.description },
            type_payment: { S: bc.type_payment },
            transaction_response: { S: bc.transaction_response },
            payment_gateway: { S: bc.payment_gateway },
            email: { S: bc.email },
            createdAt: { S: new Date() },
        };
        const pidsid = microlib_1.TUID.generateCreztuIDDynamoDBBasedOnTenant(BuyCampaignRepository_1.GROUP);
        item = { ...item, pid: pidsid.pid, sid: pidsid.sid };
        return item;
    }
    mapToFirstInvoice() {
        let item = {
            payment_reference: { S: '' },
            transaction_state: { S: constants_1.Status.success },
            quantity: { N: '100' },
            transaction_date: { S: '' },
            description: { S: '' },
            type_payment: { S: '' },
            transaction_response: { S: '' },
            payment_gateway: { S: '' },
            email: { S: '' },
            createdAt: { S: new Date() },
        };
        const pidsid = microlib_1.TUID.generateCreztuIDDynamoDBBasedOnTenant(BuyCampaignRepository_1.GROUP);
        item = { ...item, pid: pidsid.pid, sid: pidsid.sid };
        return item;
    }
};
exports.BuyCampaignRepository = BuyCampaignRepository;
BuyCampaignRepository.GROUP = 'BCC';
exports.BuyCampaignRepository = BuyCampaignRepository = BuyCampaignRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_dynamodb_1.ClientDynamodb,
        availableAmoutCampaigns_1.AvailableAmoutCampaigns,
        cron_job_service_1.CronJobService,
        searchInvoice_service_1.SearchInvoiceService])
], BuyCampaignRepository);
//# sourceMappingURL=buyCampaigns.repository.js.map