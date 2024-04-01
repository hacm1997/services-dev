export interface CustomerItem {
  pid: { S: string };
  sid: { S: number };
  name: { S: string };
  last_name: { S: string };
  email: { S: string };
  phone: { N: number };
  city: { S: string };
  address: { S: string };
  createdAt: { S: string };
  extraInfo: { S: string };
}
