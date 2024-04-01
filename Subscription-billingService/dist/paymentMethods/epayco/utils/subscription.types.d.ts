export interface SubscriptionInfo {
    id_plan: string;
    customer: string;
    token_card: string;
    doc_type: string;
    doc_number: string;
    url_confirmation?: string;
    method_confirmation?: string;
}
