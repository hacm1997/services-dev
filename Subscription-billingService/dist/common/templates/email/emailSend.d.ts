import { SubscriptionDTO } from "src/subscription/rest/subscriptionDTO";
import { InvoiceDTO } from "src/invoice/rest/invoiceDTO";
export declare function emailSend(subs: SubscriptionDTO, dataInvoice: InvoiceDTO, paymentEpayco: any, titleMessage: string): Promise<void>;
