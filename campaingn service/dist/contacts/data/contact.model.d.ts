export interface contactModel {
    id?: string;
    full_name: string;
    email: string;
    phone?: string;
    contactStatus?: number;
    age?: number;
    lastComunication: string;
    personId?: string;
    companyId?: string;
    personDetails?: JSON | any;
    companyDetails?: JSON | any;
}
