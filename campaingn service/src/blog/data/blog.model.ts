export interface BlogModel {
  tenantId?: string | number;
  id?: string;
  title: string;
  image: string;
  content: string;
  status: string;
  extraInfo?: JSON;
  createdAt?: string;
}
