import { ShippingModel } from 'src/shipping/data/shipping.model';
import { ShippingRepository } from 'src/shipping/data/shipping.repository';
import { ShippingGateway } from 'src/shipping/rest/shipping.gateway';
export declare class ShippingAdapter extends ShippingGateway {
    private shippingRepository;
    constructor(shippingRepository: ShippingRepository);
    createShipping(shipping: ShippingModel): Promise<ShippingModel>;
    getAllShipping(tenantID: string): Promise<ShippingModel[]>;
    getShippingByCode(shippingCode: string, tenantID: string): Promise<ShippingModel[]>;
    putShipping(shipping: ShippingModel, tenantID: string): Promise<ShippingModel>;
    deleteShipping(id: string, tenantID: string): Promise<void>;
    private mapToData;
    private mapToDomain;
}
