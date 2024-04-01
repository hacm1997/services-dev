export interface PersonDTO {
    pid?: {
        S: string;
    };
    sid?: {
        S: string;
    };
    name: {
        S: string;
    };
    personInfo?: {
        S: string | JSON | any;
    };
}
