import { ShippingGateway } from './shipping.gateway';
import { ShippingModelDTO } from './shipping.model.dto';
export declare class ShippingUsecase {
    private shippingGateway;
    constructor(shippingGateway: ShippingGateway);
    getAllShipping(request: Request): Promise<ShippingModelDTO[]>;
    createShipping(shippingDTO: ShippingModelDTO, request: Request): Promise<ShippingModelDTO>;
    getShippingByCode(request: Request, shippingCode: string): Promise<ShippingModelDTO[]>;
    putShipping(shippingDTO: ShippingModelDTO, request: Request): Promise<ShippingModelDTO>;
    deleteShipping(request: Request, id: string): Promise<any>;
    private mapDTOToDomain;
    private mapDomainToDTO;
}
