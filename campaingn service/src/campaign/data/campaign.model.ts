export interface CampaignModel {
  tenantId?: string | number;
  id?: string;
  title: string;
  subject: string;
  body: string;
  file?: string;
}
