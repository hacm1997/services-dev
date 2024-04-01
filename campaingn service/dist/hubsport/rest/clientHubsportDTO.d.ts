export interface ClientHubsportDTO {
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
export interface CredentialsHubsportDTO {
    id?: string;
    apiKey: string;
    tenantName: string;
}
