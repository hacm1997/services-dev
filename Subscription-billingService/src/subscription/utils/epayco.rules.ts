import { Injectable } from "@nestjs/common";
import { EpaycoService } from "src/paymentMethods/epayco/service/epayco.service";
import { SubscriptionDTO } from "../rest/subscriptionDTO";
import { CustomerInfo } from "src/paymentMethods/epayco/utils/customer.types";
import {
  ACTIVE_SUBS,
  BILL_GROUP,
  EMAIL_FAILED,
  EMAIL_SUCCESS,
  EPAYCO,
} from "src/common/constants/const";
import { InvoiceDTO } from "src/invoice/rest/invoiceDTO";
import { BillItemDTO } from "src/billItem/rest/billItemDTO";
import * as moment from "moment";
import { BillItemService } from "src/billItem/service/billItem.service";
import { SubscriptionRepository } from "../data/subscription.repository";
import { InvoiceService } from "src/invoice/service/invoice.service";
import { emailSend } from "src/common/templates/email/emailSend";
import { RecurringBillingItemService } from "src/recurringBillingItems/service/recurringBillingItem.service";
import { RecurringBillingItemDTO } from "src/recurringBillingItems/rest/recurringBillingItemDTO";

@Injectable()
export class EpaycoRules {
  constructor(
    private epayco: EpaycoService,
    private billItemService: BillItemService,
    private subscriptionRepository: SubscriptionRepository,
    private invoiceService: InvoiceService,
    private recurringService: RecurringBillingItemService
  ) {}

  public async getDataInfo(plan_id: string, subscriptionDTO: SubscriptionDTO) {
    // Verifica si subscriptionDTO.cardInfo existe
    const cardInfo = subscriptionDTO.cardInfo
      ? {
          card_number: subscriptionDTO.cardInfo.card_number,
          card_exp_year: subscriptionDTO.cardInfo.card_exp_year,
          card_exp_month: subscriptionDTO.cardInfo.card_exp_month,
          card_cvc: subscriptionDTO.cardInfo.card_cvc,
        }
      : {
          card_number: subscriptionDTO.customerInformation.cardInfo.card_number,
          card_exp_year:
            subscriptionDTO.customerInformation.cardInfo.card_exp_year,
          card_exp_month:
            subscriptionDTO.customerInformation.cardInfo.card_exp_month,
          card_cvc: subscriptionDTO.customerInformation.cardInfo.card_cvc,
        };

    const customerInfo: CustomerInfo = {
      cardInfo: cardInfo,
      name:
        subscriptionDTO.customerInformation.customerName +
        " " +
        subscriptionDTO.customerInformation.customerLastName,
      doc_type: subscriptionDTO.customerInformation.customerDocType,
      doc_number: subscriptionDTO.customerInformation.customerDocNumber,
      email: subscriptionDTO.customerInformation.customerEmail,
      default: subscriptionDTO.customerInformation.customerDeafulCard,
      phone: subscriptionDTO.customerInformation.customerPhone,
    };

    try {
      const customer = await this.epayco.createCustomer(customerInfo);
      const customerToSave = {
        ...subscriptionDTO.customerInformation,
        customerID: customer.customerData.data.customerId,
        customerName: customer.customerData.data.name,
        customerEmail: customer.customerData.data.email,
        cardInfo: {
          ...subscriptionDTO.cardInfo,
          token_card: customer.tokenCard,
        },
        status: ACTIVE_SUBS,
      };
      const plan = await this.epayco.getPlan(plan_id);
      const recurringData = {
        billingFrequency: plan.plan.interval,
        itemCode: plan.plan.id_plan,
        itemDescription: plan.plan.description,
      };

      const SubWithPlanInfo = {
        ...subscriptionDTO,
        planInformation: plan.plan,
        billingInformation: recurringData as any,
        customerInformation: customerToSave,
      };

      const billItemData = {
        itemCode: plan.plan.id_plan,
        price: plan.plan.amount.toString(),
      };

      return {
        SubWithPlanInfo,
        recurringData,
        billItemData,
      };
    } catch (error) {
      throw new Error(
        "Error to create data information for subscription from epayco"
      );
    }
  }

  public async createPaymente(
    dataForPayment: SubscriptionDTO,
    billItemRequest: any,
    newBillId?: string
  ) {
    const paymentInfo = {
      token_card: dataForPayment.customerInformation?.cardInfo?.token_card,
      customer_id: dataForPayment.customerInformation?.customerID,
      doc_type: dataForPayment.customerInformation?.customerDocType,
      doc_number: dataForPayment.customerInformation?.customerDocNumber,
      name: dataForPayment.customerInformation?.customerName,
      last_name: dataForPayment.customerInformation?.customerLastName,
      email: dataForPayment.customerInformation?.customerEmail,
      // city: "Bogota",
      // address: "Cr 4 # 55 36",
      phone: dataForPayment.customerInformation?.customerPhone,
      // cell_phone: "3010000001",
      bill: newBillId ? newBillId : billItemRequest.pid,
      description: dataForPayment.billingInformation?.itemDescription,
      value: dataForPayment.planInformation?.amount.toString(),
      // tax: "16000",
      // tax_base: "100000",
      currency: dataForPayment.planInformation?.currency.toUpperCase(),
      // dues: "12",
      ip: "190.000.000.000" /*This is the client's IP, it is required */,
      //url_response: "https://ejemplo.com/respuesta.html",
      //url_confirmation: "https://ejemplo.com/confirmacion",
      method_confirmation: "GET",
    };
    try {
      const payment = await this.epayco.createPayment(paymentInfo);
      return payment;
    } catch (error) {
      console.log("error payment => ", error);
      throw new Error(error);
    }
  }

  public async generateSaveData(getSubsDetails: any, tenant: string) {
    const dataToUpdateBill = {
      billId: "",
      billItemDate: "",
    };
    let invoiceInfo = {};
    const currentDateInvoice = moment();
    const dataFromEpayco = await this.getDataFromEpayco(getSubsDetails);
    await this.recurringService.RecurringBillingItemCreate(
      dataFromEpayco.recurringData as RecurringBillingItemDTO
    );
    const billItemRequest = await this.billItemService.BillItemCreate(
      dataFromEpayco.billItemData
    );
    const paymentData = await this.createPaymente(
      dataFromEpayco.SubWithPlanInfo,
      billItemRequest
    );
    const cleanItemSource = paymentData.data.factura
      .toString()
      .replace(BILL_GROUP + "-", "");
    const dataInvoice: InvoiceDTO = {
      invoiceId: cleanItemSource,
      amount: dataFromEpayco.SubWithPlanInfo.planInformation.amount,
      invoicePaidAt: paymentData.data.fecha,
      creationDate: currentDateInvoice.toISOString(),
      invoiceNumber: paymentData.data.ref_payco.toString(),
      attri2: "",
    };
    dataToUpdateBill.billId = paymentData.data.ref_payco.toString();
    dataToUpdateBill.billItemDate = paymentData.data.fecha;

    if (paymentData.data.estado === "Aceptada") {
      await this.billItemService.updateBillItem(
        dataToUpdateBill,
        billItemRequest.pid,
        tenant
      );
      await this.subscriptionRepository.updateSubsPendingPayment(tenant, false);
      dataInvoice.attri2 = "PAID";
      invoiceInfo = await this.invoiceService.createInvoice(
        dataInvoice,
        tenant
      );
      await emailSend(getSubsDetails, dataInvoice, paymentData, EMAIL_SUCCESS);
    } else {
      await this.subscriptionRepository.updateSubsPendingPayment(tenant, true);
      await emailSend(getSubsDetails, dataInvoice, paymentData, EMAIL_FAILED);
      dataInvoice.attri2 = "FAILED";
      invoiceInfo = await this.invoiceService.createInvoice(
        dataInvoice,
        tenant
      );
    }
    return {
      paymentData,
      invoiceInfo,
    };
  }

  public async getDataFromEpayco(subs: any) {
    let recurringData = {};
    let SubWithPlanInfo: SubscriptionDTO = {} as SubscriptionDTO;
    let billItemData: BillItemDTO = {} as BillItemDTO;
    const planID =
      subs.planInformation && subs.planInformation.id_plan
        ? subs.planInformation.id_plan
        : subs.plan_id;
    if (subs.gateway === EPAYCO) {
      const dataFromEpayco = await this.getDataInfo(planID, subs);
      recurringData = dataFromEpayco.recurringData;
      SubWithPlanInfo = dataFromEpayco.SubWithPlanInfo;
      billItemData = dataFromEpayco.billItemData;
    }

    return {
      recurringData,
      SubWithPlanInfo,
      billItemData,
    };
  }
}
