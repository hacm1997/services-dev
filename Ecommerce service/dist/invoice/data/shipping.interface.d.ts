export interface ShippingInterface {
    shipping_code: string;
    city: string;
    price: number;
    neighborhood?: string;
    postal_code?: number | null | undefined;
    extraInfo?: JSON;
}
