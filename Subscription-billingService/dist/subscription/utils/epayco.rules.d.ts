import { EpaycoService } from "src/paymentMethods/epayco/service/epayco.service";
import { SubscriptionDTO } from "../rest/subscriptionDTO";
import { BillItemDTO } from "src/billItem/rest/billItemDTO";
import { BillItemService } from "src/billItem/service/billItem.service";
import { SubscriptionRepository } from "../data/subscription.repository";
import { InvoiceService } from "src/invoice/service/invoice.service";
import { RecurringBillingItemService } from "src/recurringBillingItems/service/recurringBillingItem.service";
export declare class EpaycoRules {
    private epayco;
    private billItemService;
    private subscriptionRepository;
    private invoiceService;
    private recurringService;
    constructor(epayco: EpaycoService, billItemService: BillItemService, subscriptionRepository: SubscriptionRepository, invoiceService: InvoiceService, recurringService: RecurringBillingItemService);
    getDataInfo(plan_id: string, subscriptionDTO: SubscriptionDTO): Promise<{
        SubWithPlanInfo: {
            planInformation: any;
            billingInformation: any;
            customerInformation: any;
            creationDate?: string;
            pendingPayments: boolean;
            gateway?: string;
            plan_id?: string;
            recurrentPayments?: string;
            cardInfo?: any;
        };
        recurringData: {
            billingFrequency: any;
            itemCode: any;
            itemDescription: any;
        };
        billItemData: {
            itemCode: any;
            price: any;
        };
    }>;
    createPaymente(dataForPayment: SubscriptionDTO, billItemRequest: any, newBillId?: string): Promise<any>;
    generateSaveData(getSubsDetails: any, tenant: string): Promise<{
        paymentData: any;
        invoiceInfo: {};
    }>;
    getDataFromEpayco(subs: any): Promise<{
        recurringData: {};
        SubWithPlanInfo: SubscriptionDTO;
        billItemData: BillItemDTO;
    }>;
}
