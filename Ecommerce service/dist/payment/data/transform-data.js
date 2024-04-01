"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payment_model_data_1 = require("../../infrastructure/model/payment/payment.model.data");
async function transformData(paymentObject) {
    try {
        const payment = paymentObject?.map((item) => {
            return new payment_model_data_1.PaymentModelData(item.pid.S, item.sid.S, item.key_code.S, new Date(item.createdAt.S), item.extraInfo?.S ? JSON.parse(item.extraInfo.S) : item.extraInfo);
        });
        return payment;
    }
    catch (error) {
        return null;
    }
}
exports.default = transformData;
//# sourceMappingURL=transform-data.js.map