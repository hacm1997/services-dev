import { CartInterface } from '../data/cart.interface';

export class PricingCalculate {
  calculateTotal(cartData: CartInterface) {
    const price_shipping = cartData.shipping_price;
    const sumProductsPriceIva = cartData.products.reduce((acc, item) => {
      // Multiply price and quantity for each product and add to the accumulator
      acc += item.price * (item.iva / 100);
      return acc;
    }, 0); // Initialize accumulator with 0

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
