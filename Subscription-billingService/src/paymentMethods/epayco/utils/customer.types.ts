export interface CustomerInfo {
  cardInfo?: {
    card_number: string;
    card_exp_year: string;
    card_exp_month: string;
    card_cvc: string;
    token_id?: string;
  };
  token_card?: string;
  name: string;
  doc_type: string;
  doc_number: string;
  email: string;
  default: boolean;
  //Optional parameters: These parameters are important when validating the credit card transaction
  city?: string;
  address?: string;
  phone?: string;
}
