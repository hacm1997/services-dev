import { CartInterface } from '../data/cart.interface';
import { PricingCalculate } from '../service/pricing-calculate';
export declare class CartController {
    private priceCaculated;
    constructor(priceCaculated: PricingCalculate);
    createInvoice(cartData: CartInterface, request: Request): Promise<any>;
}
