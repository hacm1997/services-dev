export async function HasEncode(data: any): Promise<string> {
  const buffer = Buffer.from(data);
  return buffer.toString('base64');
}
export async function HasDecode(data: any): Promise<string> {
  const buffer = Buffer.from(data, 'base64');
  return buffer.toString();
}
