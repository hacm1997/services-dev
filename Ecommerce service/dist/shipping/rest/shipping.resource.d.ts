import { ShippingModelDTO } from './shipping.model.dto';
import { ShippingUsecase } from './shipping.usecase';
export declare class ShippingResource {
    private shippingUseCase;
    constructor(shippingUseCase: ShippingUsecase);
    createProduct(shippingDTO: ShippingModelDTO, request: Request): Promise<ShippingModelDTO>;
    getShippingByCode(request: Request, code: string): Promise<ShippingModelDTO[] | null>;
    getAllShipping(request: Request): Promise<ShippingModelDTO[] | null>;
    putProduct(shippingDTO: ShippingModelDTO, request: Request): Promise<ShippingModelDTO>;
    deleteProduct(request: Request, id: string): Promise<any>;
}
