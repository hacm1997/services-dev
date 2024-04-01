export interface BillItemModel {
  pid?: string;
  tenant?: string;
  billId?: string | undefined;
  billItemDate?: string | undefined;
  itemCode: string;
  itemSource?: string;
  price?: number | string;
}
