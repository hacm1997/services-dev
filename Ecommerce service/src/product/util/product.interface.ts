export interface ProductInterface {
  tenantID?: string;
  id?: string;
  sid?: string;
  name: string;
  price: number;
  createdAt?: string;
  status: string;
  image?: string;
  description?: string;
  extraInfo?: JSON | any;
  inventory?: number | undefined;
  discount_date_start?: string;
  discount_date_end?: string;
  discount_percent?: number;
  free_shipping?: boolean;
}
