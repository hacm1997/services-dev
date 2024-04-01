import { SubscriptionService } from "../service/subscription.service";
import { SubscriptionDTO } from "./subscriptionDTO";
export declare class SubscriptionResource {
    private subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    createBlog(SubscriptionDTO: SubscriptionDTO): Promise<any>;
    getAllSubs(page: string, pageSize: string): Promise<any>;
    getSubByTenant(tenant: string): Promise<any>;
    updateSubs(subscriptionDTO: SubscriptionDTO): Promise<SubscriptionDTO>;
    updateSubsPendingPayment(tenant: string, payment: string): Promise<SubscriptionDTO>;
    cancelSubscription(tenant: string): Promise<any>;
    reactivateSubscription(tenant: string): Promise<any>;
    activateSubscription(tenant: string): Promise<any>;
    deleteSubscription(tenant: string): Promise<any>;
}
