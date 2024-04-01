import { formatNumber } from "src/common/constants/const";
import { InvoiceDTO } from "src/invoice/rest/invoiceDTO";
import { SubscriptionDTO } from "src/subscription/rest/subscriptionDTO";

export const emailTemplate = async (
  subs: SubscriptionDTO,
  invoice: InvoiceDTO,
  payment: any,
  titleMessage?: string
) => {
  const bodyEmailTemplate = `<h1>Hola ${
    subs.customerInformation?.customerName.toUpperCase() +
    " " +
    subs.customerInformation?.customerLastName.toUpperCase()
  }</h1>
  <h1>${titleMessage}</h1>
    <h2>Datos de la subscripción</h2>
    <p>Plan: <strong>${
      subs.planInformation?.name || subs.planInformation?.description
    }</strong></p>
    <p>Valor: </strong>${formatNumber(Number(invoice.amount))}</strong></p>
    <p>Fecha de cobro: ${payment.data.fecha}</p>
    `;

  return bodyEmailTemplate;
};
