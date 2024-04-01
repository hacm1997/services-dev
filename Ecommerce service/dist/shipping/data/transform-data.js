"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shipping_model_data_1 = require("../../infrastructure/model/shipping/shipping.model.data");
async function transformData(itmes) {
    try {
        const shipping = itmes?.map((item) => {
            return new shipping_model_data_1.ShippingModelData(item.pid.S, item.sid.S, item.city.S, parseFloat(item.price.N), item.extraInfo ? JSON.parse(item.extraInfo) : {});
        });
        return shipping;
    }
    catch (error) {
        return null;
    }
}
exports.default = transformData;
//# sourceMappingURL=transform-data.js.map