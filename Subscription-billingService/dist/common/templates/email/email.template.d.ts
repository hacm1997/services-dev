import { InvoiceDTO } from "src/invoice/rest/invoiceDTO";
import { SubscriptionDTO } from "src/subscription/rest/subscriptionDTO";
export declare const emailTemplate: (subs: SubscriptionDTO, invoice: InvoiceDTO, payment: any, titleMessage?: string) => Promise<string>;
