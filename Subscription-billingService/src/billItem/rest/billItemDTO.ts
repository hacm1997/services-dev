export interface BillItemDTO {
  pid?: string;
  billId?: string;
  billItemDate?: string;
  itemCode: string;
  itemSource?: string;
  price?: number | string;
}
