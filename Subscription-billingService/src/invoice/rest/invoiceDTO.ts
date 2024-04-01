export interface InvoiceDTO {
  invoiceId: string;
  amount: number | string;
  invoicePaidAt: string;
  creationDate?: string;
  invoiceNumber?: string;
  attri2?: string;
}
