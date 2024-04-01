import { ClientDynamodb } from "src/infrastructure/dynamodb/client.dynamodb";
import { SubscriptionModel } from "./subscription.model";
import { SubscriptionDTO } from "../rest/subscriptionDTO";
export declare class SubscriptionRepository {
    private fullClientDynamodb;
    static GROUP: string;
    constructor(fullClientDynamodb: ClientDynamodb);
    subscriptionCreate(subscription: SubscriptionModel, tenant: string): Promise<SubscriptionModel>;
    getSubscriptions(tenant?: string): Promise<any>;
    updateSubscription(tenant: string, subs: SubscriptionDTO): Promise<SubscriptionDTO>;
    updateSubsPendingPayment(tenant: string, pendingPayments: boolean): Promise<{
        message: string;
    }>;
    putCustomerInfoSubscription(tenant: string, customerInfo: any): Promise<{
        message: string;
    }>;
    deleteSubscription(tenant: string): Promise<any>;
    private createNewItemFromDomainModel;
    private mapToDomain;
}
