import { Injectable } from "@nestjs/common";
import * as Epayco from "epayco-sdk-node";
import { CustomerInfo } from "../utils/customer.types";
import { PlanInfo } from "../utils/plan.types";
import { SubscriptionInfo } from "../utils/subscription.types";
import { CreditCardInfo } from "../utils/creditCard.types";

@Injectable()
export class EpaycoService {
  private epayco: Epayco;

  constructor() {
    this.epayco = Epayco({
      apiKey: process.env.APP_EPAYCO_PLUBLIC_KEY,
      privateKey: process.env.APP_EPAYCO_PRIVATE_KEY,
      lang: "ES",
      test: true,
    });
  }

  public async createSuscripcion(
    idPlan: string,
    creaditCart: CreditCardInfo,
    customerDocType: string,
    customerDocNumber: string,
    customerData: CustomerInfo
  ): Promise<any> {
    try {
      const creditInfo = {
        "card[number]": creaditCart.card_number,
        "card[exp_year]": creaditCart.card_exp_year,
        "card[exp_month]": creaditCart.card_exp_month,
        "card[cvc]": creaditCart.card_cvc,
        hasCvv: true, //hasCvv: validar codigo de seguridad en la transacción
      };
      const token_card = await this.epayco.createTokenCard(creditInfo);
      const customer = await this.epayco.createCustomer(customerData);

      const subscription_info: SubscriptionInfo = {
        id_plan: idPlan,
        customer: customer.id_customer,
        token_card: token_card,
        doc_type: customerDocType,
        doc_number: customerDocNumber,
      };
      const suscripcion = await this.epayco.subscriptions.create(
        subscription_info
      );
      return suscripcion;
    } catch (error) {
      throw new Error("Error to create subscription");
    }
  }

  public async createTokenCard(creditInfo: any): Promise<any> {
    try {
      const token = await this.epayco.token.create(creditInfo);
      console.log("token created => ", token);
      return token;
    } catch (error) {
      throw new Error("Error to create and get tokend card");
    }
  }

  public async createCustomer(customerInfo: CustomerInfo): Promise<any> {
    try {
      const tokenCardData = {
        "card[number]": customerInfo.cardInfo.card_number,
        "card[exp_year]": customerInfo.cardInfo.card_exp_year,
        "card[exp_month]": customerInfo.cardInfo.card_exp_month,
        "card[cvc]": customerInfo.cardInfo.card_cvc,
        hasCvv: true,
      };
      const tokenCard = await this.epayco.token.create(tokenCardData);
      const extraCustomerInfo: CustomerInfo = {
        ...customerInfo,
        token_card: tokenCard.id,
      };
      const customer = await this.epayco.customers.create(extraCustomerInfo);
      // console.log('customer created => ', customer);
      return { customerData: customer, tokenCard: tokenCard.id };
    } catch (error) {
      throw new Error("Error to create customer");
    }
  }

  public async createPlan(planInfo: PlanInfo): Promise<any> {
    try {
      const plan = await this.epayco.plans.create(planInfo);
      return plan;
    } catch (error) {
      throw new Error("Error to create plan");
    }
  }

  public async getPlan(planID: string): Promise<any> {
    try {
      const plan = await this.epayco.plans.get(planID);
      return plan;
    } catch (error) {
      throw new Error("Error to get plan");
    }
  }

  public async createPayment(paymentInfo: any): Promise<any> {
    try {
      const payment = await this.epayco.charge.create(paymentInfo);
      return payment;
    } catch (error) {
      throw new Error("Error to create payment");
    }
  }
}
