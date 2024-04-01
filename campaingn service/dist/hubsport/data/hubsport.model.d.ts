export interface ClientHubsportModel {
    id?: string;
    firstname: string;
    email: string;
    phone: string;
    state: string;
    city: string;
    address: string;
    servicio: string;
    noticia: string;
    tenant?: string;
}
export interface CredentialsHubsportModel {
    id?: string;
    apiKey: string;
    tenantName: string;
}
