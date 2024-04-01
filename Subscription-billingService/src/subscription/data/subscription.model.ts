export interface SubscriptionModel {
  tenant?: string;
  subsID?: string;
  billingInformation?: JSON;
  customerInformation?: JSON | any;
  pendingPayments: boolean;
  planInformation?: JSON;
  creationDate?: string;
  cardInformation?: JSON | any;
  gateway?: string;
}
