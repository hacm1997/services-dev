export interface ShippingItem {
    pid: {
        S: string;
    };
    sid: {
        S: string;
    };
    city: {
        S: string;
    };
    price: {
        N: number;
    };
    extraInfo?: {
        S: string;
    };
}
