import { BillItemService } from "src/billItem/service/billItem.service";
import { InvoiceService } from "src/invoice/service/invoice.service";
import { RecurringBillingItemService } from "src/recurringBillingItems/service/recurringBillingItem.service";
import { SubscriptionDTO } from "src/subscription/rest/subscriptionDTO";
import { SubscriptionService } from "src/subscription/service/subscription.service";
import { EpaycoRules } from "src/subscription/utils/epayco.rules";
export declare class RecurringJobService {
    private recurringService;
    private billItemService;
    private subscriptionService;
    private epaycoRules;
    private invoiceService;
    private readonly logger;
    constructor(recurringService: RecurringBillingItemService, billItemService: BillItemService, subscriptionService: SubscriptionService, epaycoRules: EpaycoRules, invoiceService: InvoiceService);
    handleRecurringJobCron(): Promise<void>;
    generateBillOnNextDatePayment(subs: SubscriptionDTO, tenant: string): Promise<import("../../../billItem/rest/billItemDTO").BillItemDTO>;
    createPaymentFunction(subs: SubscriptionDTO, tenant: string, billPID: string): Promise<void>;
}
