"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformDataPaginate = void 0;
const product_model_data_1 = require("../../infrastructure/model/product/product.model.data");
async function transformData(productObject) {
    try {
        const product = productObject?.map((item) => {
            return new product_model_data_1.ProductModelData(item.pid.S, item.sid.S, item.name.S, parseFloat(item.price.N), item.createdAt.S, item.status?.S, item.image?.S, item.description?.S, item.extraInfo?.S ? JSON.parse(item.extraInfo.S) : item.extraInfo, parseFloat(item.inventory?.N));
        });
        return product;
    }
    catch (error) {
        return null;
    }
}
exports.default = transformData;
async function transformDataPaginate(productObject) {
    try {
        const product = productObject?.map((item) => {
            if (item.inventory) {
                return new product_model_data_1.ProductModelData(item.pid.S, item.sid.S, item.name.S, parseFloat(item.price.N), item.createdAt.S, item.status?.S, item.image?.S, item.description?.S, item.extraInfo?.S ? JSON.parse(item.extraInfo.S) : item.extraInfo, item.inventory.N ? Number(item.inventory.N) : undefined);
            }
            else {
                return new product_model_data_1.ProductModelData(item.pid.S, item.sid.S, item.name.S, parseFloat(item.price.N), item.createdAt.S, item.status?.S, item.image?.S, item.description?.S, item.extraInfo?.S ? JSON.parse(item.extraInfo.S) : item.extraInfo);
            }
        });
        return product;
    }
    catch (error) {
        return null;
    }
}
exports.transformDataPaginate = transformDataPaginate;
//# sourceMappingURL=transform-data.js.map