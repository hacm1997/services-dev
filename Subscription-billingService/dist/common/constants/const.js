"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTIVE_SUBS = exports.CANCEL_SUBS = exports.formatNumber = exports.EMAIL_FAILED = exports.EMAIL_SUCCESS = exports.EMAIL_SENDER = exports.INVOICE_GROUP = exports.BILL_GROUP = exports.RECURRING_GROUP = exports.SUBS_GROUP = exports.EPAYCO = void 0;
exports.EPAYCO = "epayco";
exports.SUBS_GROUP = "SUB";
exports.RECURRING_GROUP = "RBI";
exports.BILL_GROUP = "BIT";
exports.INVOICE_GROUP = "INV";
exports.EMAIL_SENDER = "no-replay@kru360.com";
exports.EMAIL_SUCCESS = "Se ha hecho la renovación de tu subscripción";
exports.EMAIL_FAILED = "No se ha podido realizar la renovación de tu subscripción";
const formatNumber = (number) => {
    const COP = new Intl.NumberFormat("es-co", {
        style: "currency",
        currency: "COP",
    }).format(number);
    return COP.slice(0, -3);
};
exports.formatNumber = formatNumber;
exports.CANCEL_SUBS = "canceled";
exports.ACTIVE_SUBS = "active";
//# sourceMappingURL=const.js.map