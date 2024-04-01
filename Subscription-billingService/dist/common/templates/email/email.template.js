"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplate = void 0;
const const_1 = require("../../constants/const");
const emailTemplate = async (subs, invoice, payment, titleMessage) => {
    const bodyEmailTemplate = `<h1>Hola ${subs.customerInformation?.customerName.toUpperCase() +
        " " +
        subs.customerInformation?.customerLastName.toUpperCase()}</h1>
  <h1>${titleMessage}</h1>
    <h2>Datos de la subscripción</h2>
    <p>Plan: <strong>${subs.planInformation?.name || subs.planInformation?.description}</strong></p>
    <p>Valor: </strong>${(0, const_1.formatNumber)(Number(invoice.amount))}</strong></p>
    <p>Fecha de cobro: ${payment.data.fecha}</p>
    `;
    return bodyEmailTemplate;
};
exports.emailTemplate = emailTemplate;
//# sourceMappingURL=email.template.js.map