export const EPAYCO = "epayco";
export const SUBS_GROUP = "SUB";
export const RECURRING_GROUP = "RBI";
export const BILL_GROUP = "BIT";
export const INVOICE_GROUP = "INV";
export const EMAIL_SENDER = "no-replay@kru360.com";
export const EMAIL_SUCCESS = "Se ha hecho la renovación de tu subscripción";
export const EMAIL_FAILED =
  "No se ha podido realizar la renovación de tu subscripción";
export const formatNumber = (number: number) => {
  const COP = new Intl.NumberFormat("es-co", {
    style: "currency",
    currency: "COP",
  }).format(number);
  return COP.slice(0, -3);
};
export const CANCEL_SUBS = "canceled";
export const ACTIVE_SUBS = "active";
