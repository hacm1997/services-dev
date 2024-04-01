"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformCustomerDataPaginate = void 0;
const customer_model_data_1 = require("../../infrastructure/model/customer/customer.model.data");
async function transformCustomerData(itmes) {
    try {
        const client = itmes?.map((item) => {
            return new customer_model_data_1.CustomerModelData(item.pid.S, item.sid.S, item.name.S, item.last_name.S, item.email.S, parseFloat(item.phone.N), item.city?.S, item.address?.S, item.createdAt.S, item.extraInfo?.S ? JSON.parse(item.extraInfo.S) : item.extraInfo);
        });
        return client;
    }
    catch (error) {
        return null;
    }
}
exports.default = transformCustomerData;
async function transformCustomerDataPaginate(customerObject) {
    try {
        const customer = customerObject?.map((item) => {
            return new customer_model_data_1.CustomerModelData(item.pid.S, item.sid.S, item.name.S, item.last_name.S, item.email.S, parseFloat(item.phone.N), item.city?.S, item.address?.S, item.createdAt.S, item.extraInfo?.S ? JSON.parse(item.extraInfo.S) : item.extraInfo);
        });
        return customer;
    }
    catch (error) {
        return null;
    }
}
exports.transformCustomerDataPaginate = transformCustomerDataPaginate;
//# sourceMappingURL=transform-data.js.map