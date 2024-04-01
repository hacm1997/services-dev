import { CustomerInfo } from "../utils/customer.types";
import { PlanInfo } from "../utils/plan.types";
import { CreditCardInfo } from "../utils/creditCard.types";
export declare class EpaycoService {
    private epayco;
    constructor();
    createSuscripcion(idPlan: string, creaditCart: CreditCardInfo, customerDocType: string, customerDocNumber: string, customerData: CustomerInfo): Promise<any>;
    createTokenCard(creditInfo: any): Promise<any>;
    createCustomer(customerInfo: CustomerInfo): Promise<any>;
    createPlan(planInfo: PlanInfo): Promise<any>;
    getPlan(planID: string): Promise<any>;
    createPayment(paymentInfo: any): Promise<any>;
}
