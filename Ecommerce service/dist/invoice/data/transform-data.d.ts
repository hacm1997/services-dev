import { InvoiceModelData } from 'src/infrastructure/model/invoice/invoice.model.data';
export default function transformData(itmes: any): Promise<InvoiceModelData[]>;
export declare function transformDataPaginate(invoiceObject: any): Promise<InvoiceModelData[]>;
