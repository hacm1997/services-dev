import { emailTemplate } from "./email.template";
import { emailService } from "./email.service";
import { SubscriptionDTO } from "src/subscription/rest/subscriptionDTO";
import { InvoiceDTO } from "src/invoice/rest/invoiceDTO";

export async function emailSend(
  subs: SubscriptionDTO,
  dataInvoice: InvoiceDTO,
  paymentEpayco: any,
  titleMessage: string
) {
  try {
    const buildEmailMessageFailed = await emailTemplate(
      subs,
      dataInvoice,
      paymentEpayco,
      titleMessage
    );
    await emailService(
      subs.customerInformation?.customerEmail as string,
      buildEmailMessageFailed
    );
  } catch (error) {
    console.log(error);
  }
}
