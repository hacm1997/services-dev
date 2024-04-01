export interface ProductItem {
  pid: { S: string };
  sid: { S: string };
  id: { S: string };
  name: { S: string };
  image: { S: string };
  description: { S: string };
  price: { N: number };
  createdAt: { S: string };
  status: { S: string };
  extraInfo: { S: string };
  inventory?: { N: number };
}
