export interface CompanyDTO {
    pid?: {
        S: string;
    };
    sid?: {
        S: string;
    };
    name: {
        S: string;
    };
    companyInfo?: {
        S: string | JSON | any;
    };
}
