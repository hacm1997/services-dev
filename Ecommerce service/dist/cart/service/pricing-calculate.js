"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingCalculate = void 0;
class PricingCalculate {
    calculateTotal(cartData) {
        const price_shipping = cartData.shipping_price;
        const sumProductsPriceIva = cartData.products.reduce((acc, item) => {
            acc += item.price * (item.iva / 100);
            return acc;
        }, 0);
        const sumProductsPrice = cartData.products.reduce((acc, item) => {
            acc += item.price * item.quantity;
            return acc;
        }, 0);
        const totalPrice = sumProductsPriceIva + price_shipping + sumProductsPrice;
        return {
            price_without_iva: sumProductsPrice - sumProductsPriceIva,
            price_shipping: price_shipping,
            price_without_shipping: totalPrice - price_shipping,
            total_price: totalPrice,
        };
    }
}
exports.PricingCalculate = PricingCalculate;
//# sourceMappingURL=pricing-calculate.js.map