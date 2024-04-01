import { BillItemService } from "src/billItem/service/billItem.service";
import { InvoiceService } from "src/invoice/service/invoice.service";
import { RecurringBillingItemService } from "src/recurringBillingItems/service/recurringBillingItem.service";
import { SubscriptionDTO } from "src/subscription/rest/subscriptionDTO";
import { SubscriptionService } from "src/subscription/service/subscription.service";
import { EpaycoRules } from "src/subscription/utils/epayco.rules";
export declare class OpenBillsJob {
    private recurringService;
    private billItemService;
    private subscriptionService;
    private epaycoRules;
    private invoiceService;
    constructor(recurringService: RecurringBillingItemService, billItemService: BillItemService, subscriptionService: SubscriptionService, epaycoRules: EpaycoRules, invoiceService: InvoiceService);
    handleOpenBillingsCron(): Promise<void>;
    createPaymentFunction(subs: SubscriptionDTO, tenant: string, billPID: string): Promise<void>;
}
