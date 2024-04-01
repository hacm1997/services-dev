import { SubscriptionRepository } from "../data/subscription.repository";
import { TenantService } from "src/common/getCookies/tenantService";
import { SubscriptionDTO } from "../rest/subscriptionDTO";
import { RecurringBillingItemService } from "src/recurringBillingItems/service/recurringBillingItem.service";
import { EpaycoRules } from "../utils/epayco.rules";
import { BillItemService } from "src/billItem/service/billItem.service";
import { InvoiceService } from "src/invoice/service/invoice.service";
export declare class SubscriptionService {
    private readonly tenantService;
    private subscriptionRepository;
    private recurringService;
    private billItemService;
    private epaycoRules;
    private invoiceService;
    constructor(tenantService: TenantService, subscriptionRepository: SubscriptionRepository, recurringService: RecurringBillingItemService, billItemService: BillItemService, epaycoRules: EpaycoRules, invoiceService: InvoiceService);
    createSubscription(subscriptionDTO: SubscriptionDTO): Promise<any>;
    getAllSubscriptions(page: number, pageSize: number): Promise<any>;
    getSubscriptions(): Promise<any>;
    getSubscriptionsByTenant(tenant: string): Promise<any>;
    updateSubscription(subscription: SubscriptionDTO): Promise<any>;
    updateSubsPendingPayment(tenant: string, pendingPayment: string): Promise<any>;
    activateSubscription(newTenant?: string): Promise<any>;
    reactivateSubscription(newTenant?: string): Promise<any>;
    cancelSubscription(newTenant?: string): Promise<{
        message: string;
    }>;
    deleteSubscription(reqTenant?: string): Promise<any>;
    private mapDTOToDomain;
    private mapDomainToDTO;
}
