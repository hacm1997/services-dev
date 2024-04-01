export interface InvoiceItem {
    pid: {
        S: string;
    };
    sid: {
        S: string;
    };
    reference: {
        S: string;
    };
    createdAt: {
        S: string;
    };
    customer: {
        S: string;
    };
    products: {
        S: string;
    };
    shipping: {
        S: string;
    };
    iva: {
        N: number;
    };
    total: {
        N: number;
    };
    payment_method: {
        S: string;
    };
    status: {
        S: string;
    };
    extraInfo: {
        S: string;
    };
}
