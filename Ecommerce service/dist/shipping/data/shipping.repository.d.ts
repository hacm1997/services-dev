import { AppService } from 'src/app.service';
import { ClientDynamodb } from 'src/infrastructure/dynamodb/client';
import { ShippingModelData } from 'src/infrastructure/model/shipping/shipping.model.data';
export interface ShippingRepository {
    createShipping: (product: ShippingModelData) => Promise<ShippingModelData>;
    getAllShipping: (shippingCode: string) => Promise<ShippingModelData[] | null>;
    getShippingByCode: (shippingCode: string, tenantID: string) => Promise<ShippingModelData[] | null>;
    putShipping: (tenantID: string, shipping: ShippingModelData) => Promise<ShippingModelData>;
    deleteShipping: (id: string, tenantID: string) => Promise<any>;
}
export declare class ShippingRepositoryImpl implements ShippingRepository {
    private fullClientDynamodb;
    constructor(fullClientDynamodb: ClientDynamodb);
    static GROUP: string;
    static appService: AppService;
    createShipping(shipping: ShippingModelData): Promise<ShippingModelData>;
    getAllShipping(tenantID: string): Promise<any | null>;
    getShippingByCode(tenantID: string, shippingCode: string): Promise<ShippingModelData[] | null>;
    putShipping(tenantID: string, shipping: ShippingModelData): Promise<ShippingModelData>;
    deleteShipping(sid: string, tenantID: string): Promise<any>;
}
