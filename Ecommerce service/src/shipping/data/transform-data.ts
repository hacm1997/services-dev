import { ShippingModelData } from 'src/infrastructure/model/shipping/shipping.model.data';

export default async function transformData(itmes: any) {
  try {
    const shipping: ShippingModelData[] | undefined = itmes?.map((item) => {
      return new ShippingModelData(
        item.pid.S,
        item.sid.S,
        item.city.S,
        parseFloat(item.price.N),
        item.extraInfo ? JSON.parse(item.extraInfo) : {},
      );
    });
    return shipping;
  } catch (error) {
    return null;
  }
}
