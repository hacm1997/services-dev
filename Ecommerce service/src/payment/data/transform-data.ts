import { PaymentModelData } from 'src/infrastructure/model/payment/payment.model.data';
export default async function transformData(paymentObject: any) {
  //console.log('items => ', itmes);
  try {
    const payment: PaymentModelData[] | undefined = paymentObject?.map(
      (item) => {
        return new PaymentModelData(
          item.pid.S,
          item.sid.S,
          item.key_code.S,
          new Date(item.createdAt.S),
          item.extraInfo?.S ? JSON.parse(item.extraInfo.S) : item.extraInfo,
        );
      },
    );
    return payment;
  } catch (error) {
    return null;
  }
}
