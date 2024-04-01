export interface FilterCustomerOptions {
    id?: string;
    startDate?: string;
    endDate?: string;
    customerName?: string;
    email?: string;
    city?: string;
}
export interface CustomerFromInvoice {
    id: string;
}
export interface CustomerInterface {
    tenantID?: string;
    id?: string;
    sid?: string;
    name: string;
    last_name: string;
    email?: string;
    phone?: number;
    city?: string;
    address?: string;
    createdAt?: string;
    extraInfo?: JSON | any;
}
