import { EpaycoService } from "../service/epayco.service";
import { PlanDTO } from "./planDTO";
import { CustomerDTO } from "./customerDTO";
export declare class EpaycoResource {
    private epaycoService;
    constructor(epaycoService: EpaycoService);
    createPlan(planDTO: PlanDTO): Promise<any>;
    getPlan(id: string): Promise<any>;
    createCustomer(CustomerDTO: CustomerDTO): Promise<any>;
    createTokenCard(card: any): Promise<any>;
}
