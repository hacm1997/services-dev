import { ShippingModel } from '../data/shipping.model';

export abstract class ShippingGateway {
  abstract createShipping(shipping: ShippingModel): Promise<ShippingModel>;
  // abstract deleteShipping(shippingCode: string): void;
  abstract getAllShipping(tenantID: string): Promise<ShippingModel[]>;
  abstract getShippingByCode(
    tenantID: string,
    shippingCode: string,
  ): Promise<ShippingModel[]>;
  abstract putShipping(
    shipping: ShippingModel,
    tenantID: string,
  ): Promise<ShippingModel>;
  abstract deleteShipping(tenantID: string, id: string): Promise<any>;
}
