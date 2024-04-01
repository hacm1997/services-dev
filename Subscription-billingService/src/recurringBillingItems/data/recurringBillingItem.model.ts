export interface RecurringBillingItemModel {
  tenant?: string;
  bitID?: string;
  billingFrequency: string;
  itemCode: string;
  itemDescription: string;
  itemSource?: string;
  startBillingDate?: string;
  nextPaymentDate?: string;
}
