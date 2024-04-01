export interface RecurringBillingItemDTO {
    billingFrequency: string;
    itemCode: string;
    itemDescription: string;
    itemSource?: string;
    startBillingDate?: string;
}
