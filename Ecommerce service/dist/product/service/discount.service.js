"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectSingleDiscountProducts = exports.detecteDiscountProducts = void 0;
const moment = require("moment");
function detecteDiscountProducts(products) {
    const extraInfo = JSON.parse(products.extraInfo);
    if (extraInfo && extraInfo.discount) {
        const { date_start, date_end, percent } = extraInfo.discount;
        const currentDate = moment().subtract(5, 'hours');
        const startDate = moment(date_start);
        const endDate = moment(date_end);
        if (currentDate.isBetween(startDate, endDate, 'minutes', '[]')) {
            const discountedPrice = products.price - (products.price * percent) / 100;
            return { ...products, price_discount: discountedPrice };
        }
    }
    return products;
}
exports.detecteDiscountProducts = detecteDiscountProducts;
function detectSingleDiscountProducts(products) {
    if (products && products.extraInfo) {
        const { date_start, date_end, percent } = products.extraInfo.discount;
        const currentDate = moment().subtract(5, 'hours');
        const startDate = moment(date_start);
        const endDate = moment(date_end);
        if (currentDate.isBetween(startDate, endDate, 'minutes', '[]')) {
            const discountedPrice = products.price - (products.price * percent) / 100;
            return { ...products, price_discount: discountedPrice };
        }
    }
    return products;
}
exports.detectSingleDiscountProducts = detectSingleDiscountProducts;
//# sourceMappingURL=discount.service.js.map