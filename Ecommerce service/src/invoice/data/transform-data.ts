import { InvoiceModelData } from 'src/infrastructure/model/invoice/invoice.model.data';

export default async function transformData(itmes: any) {
  try {
    const invoice: InvoiceModelData[] | undefined = itmes?.map((item) => {
      return new InvoiceModelData(
        item.pid.S,
        item.sid.S,
        item.reference.S,
        item.createdAt.S,
        JSON.parse(item.customer.S),
        JSON.parse(item.products.S),
        JSON.parse(item.shipping.S),
        item.iva.N,
        item.total.N,
        item.payment_method.S,
        item.status?.S,
        item.extraInfo?.S ? JSON.parse(item.extraInfo.S) : undefined,
      );
    });
    console.log('invoice transform => ', invoice);
    return invoice;
  } catch (error) {
    return null;
  }
}

export async function transformDataPaginate(invoiceObject: any) {
  //console.log('items => ', itmes);
  try {
    const invoice: InvoiceModelData[] | undefined = invoiceObject?.map(
      (item) => {
        return new InvoiceModelData(
          item.pid.S,
          item.sid.S,
          item.reference.S,
          item.createdAt.S,
          JSON.parse(item.customer.S),
          JSON.parse(item.products.S),
          JSON.parse(item.shipping.S),
          item.iva.N,
          item.total.N,
          item.payment_method.S,
          item.status?.S,
          item.extraInfo?.S ? JSON.parse(item.extraInfo.S) : undefined,
        );
      },
    );
    return invoice;
  } catch (error) {
    return null;
  }
}
