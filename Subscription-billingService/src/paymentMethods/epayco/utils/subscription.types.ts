export interface SubscriptionInfo {
  id_plan: string;
  customer: string;
  token_card: string;
  doc_type: string;
  doc_number: string;
  //Optional parameter: if these parameter it's not send, system get ePayco dashboard's url_confirmation
  url_confirmation?: string;
  method_confirmation?: string;
}
