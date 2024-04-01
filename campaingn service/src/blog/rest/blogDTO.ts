export interface BlogDTO {
  id?: string;
  title: string;
  image: string;
  content: string;
  status: string;
  extraInfo?: JSON;
  createdAt?: string;
}
