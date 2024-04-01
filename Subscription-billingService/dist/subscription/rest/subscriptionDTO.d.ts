export interface SubscriptionDTO {
    billingInformation?: JSON | any;
    creationDate?: string;
    customerInformation?: JSON | any;
    pendingPayments: boolean;
    planInformation?: JSON | any;
    gateway?: string;
    plan_id?: string;
    recurrentPayments?: string;
    cardInfo?: JSON | any;
}
