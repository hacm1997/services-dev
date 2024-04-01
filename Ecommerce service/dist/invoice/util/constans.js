"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WOMPI_STATUS = exports.StatusEpayco = exports.FILTER_CONDITION = exports.CANCEL_STATUS = exports.FAILED_STATUS = exports.PENDING_STATUS = exports.PAID_STATUS = void 0;
exports.PAID_STATUS = 'paid';
exports.PENDING_STATUS = 'pending';
exports.FAILED_STATUS = 'failed';
exports.CANCEL_STATUS = 'cancel';
exports.FILTER_CONDITION = 'filtro';
var StatusEpayco;
(function (StatusEpayco) {
    StatusEpayco["success"] = "Aceptada";
    StatusEpayco["pending"] = "Pendiente";
    StatusEpayco["failed"] = "Fallida";
    StatusEpayco["declined"] = "Rechazada";
})(StatusEpayco || (exports.StatusEpayco = StatusEpayco = {}));
var WOMPI_STATUS;
(function (WOMPI_STATUS) {
    WOMPI_STATUS["approved"] = "APPROVED";
    WOMPI_STATUS["pendings"] = "PENDING";
    WOMPI_STATUS["declined"] = "DECLINED";
    WOMPI_STATUS["voided"] = "VOIDED";
    WOMPI_STATUS["error"] = "ERROR";
})(WOMPI_STATUS || (exports.WOMPI_STATUS = WOMPI_STATUS = {}));
//# sourceMappingURL=constans.js.map