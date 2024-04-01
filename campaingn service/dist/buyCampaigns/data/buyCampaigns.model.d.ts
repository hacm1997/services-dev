export interface BuyCampaignModel {
    tenantId?: string | number;
    id?: string;
    transaction_state: string;
    payment_reference: string;
    quantity: number;
    transaction_date: string;
    description: string;
    type_payment: string;
    transaction_response: string;
    payment_gateway: string;
    email: string;
    moreInformation?: JSON;
    createdAt?: Date;
    userNew?: boolean;
}
