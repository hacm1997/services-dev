import { CartInterface } from '../data/cart.interface';
export declare class PricingCalculate {
    calculateTotal(cartData: CartInterface): {
        price_without_iva: number;
        price_shipping: number;
        price_without_shipping: number;
        total_price: number;
    };
}
