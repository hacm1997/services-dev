import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { BillItemDTO } from "src/billItem/rest/billItemDTO";
import { BillItemService } from "src/billItem/service/billItem.service";
import {
  ACTIVE_SUBS,
  BILL_GROUP,
  EMAIL_FAILED,
  EMAIL_SUCCESS,
  EPAYCO,
  RECURRING_GROUP,
} from "src/common/constants/const";
import { InvoiceDTO } from "src/invoice/rest/invoiceDTO";
import { InvoiceService } from "src/invoice/service/invoice.service";
import { RecurringBillingItemDTO } from "src/recurringBillingItems/rest/recurringBillingItemDTO";
import { RecurringBillingItemService } from "src/recurringBillingItems/service/recurringBillingItem.service";
import { SubscriptionDTO } from "src/subscription/rest/subscriptionDTO";
import { SubscriptionService } from "src/subscription/service/subscription.service";
import { EpaycoRules } from "src/subscription/utils/epayco.rules";
import * as moment from "moment";
import generatorCode from "../generateCode";
import { emailSend } from "src/common/templates/email/emailSend";

@Injectable()
export class OpenBillsJob {
  constructor(
    private recurringService: RecurringBillingItemService,
    private billItemService: BillItemService,
    private subscriptionService: SubscriptionService,
    private epaycoRules: EpaycoRules,
    private invoiceService: InvoiceService
  ) {}

  @Cron("0 15 * * *")
  async handleOpenBillingsCron() {
    const tenants = [];
    // const getSubscriptions = await this.subscriptionService.getSubscriptions();
    const getRecurrings = await this.recurringService.getAllRecurringsBills();
    getRecurrings.forEach((item: any) => {
      const cleanItemSource = item.itemSource.replace(
        RECURRING_GROUP + "-",
        ""
      );
      tenants.push(cleanItemSource);
    });
    const uniqueTenants = tenants.filter(
      (item, index) => tenants.indexOf(item) === index
    );
    uniqueTenants.forEach(async (tenant: string) => {
      const recurrings = await this.recurringService.getLastRecurringBill(
        tenant
      );
      if (!recurrings || recurrings.length === 0) {
        const subs: SubscriptionDTO =
          await this.subscriptionService.getSubscriptionsByTenant(tenant);
        if (subs.customerInformation?.status === ACTIVE_SUBS) {
          const getBills: BillItemDTO[] =
            await this.billItemService.getAllBills(tenant);
          if (getBills.length > 0) {
            const verifyOpenBills = getBills.filter(
              (item) => item.billId === ""
            );
            if (verifyOpenBills.length > 0) {
              getBills.forEach(async (item) => {
                await this.createPaymentFunction(subs, tenant, item.pid);
              });
            } else {
              console.log("tenant ", tenant, " not Bills Opens");
            }
          }
        }
      }
    });
    console.log("Tarea diaria ejecutada");
  }

  async createPaymentFunction(
    subs: SubscriptionDTO,
    tenant: string,
    billPID: string
  ) {
    const dataToUpdateBill = {
      billId: "",
      billItemDate: "",
    };
    const newInoiceCode = generatorCode(BILL_GROUP);
    const currentDateInvoice = moment();
    const createBill = {};
    const recurringData: RecurringBillingItemDTO = {
      billingFrequency: subs.planInformation?.interval,
      itemCode: subs.billingInformation?.itemCode,
      itemDescription: subs.billingInformation?.itemDescription,
    };
    if (subs.gateway === EPAYCO) {
      try {
        const paymentEpayco = await this.epaycoRules.createPaymente(
          subs,
          createBill,
          newInoiceCode
        );
        dataToUpdateBill.billId = paymentEpayco.data.ref_payco.toString();
        dataToUpdateBill.billItemDate = paymentEpayco.data.fecha;
        const cleanItemSource = paymentEpayco.data.factura
          .toString()
          .replace(BILL_GROUP + "-", "");
        const dataInvoice: InvoiceDTO = {
          invoiceId: cleanItemSource,
          amount: subs.planInformation.amount,
          invoicePaidAt: paymentEpayco.data.fecha,
          creationDate: currentDateInvoice.toISOString(),
          invoiceNumber: paymentEpayco.data.ref_payco.toString(),
          attri2: "",
        };
        if (paymentEpayco.data.estado === "Aceptada") {
          // Update data of invoice: invoicePaidAt, invoiceNumber AND attri2 to status PAID
          dataInvoice.attri2 = "PAID";
          await this.invoiceService.createInvoice(dataInvoice, tenant);
          await this.billItemService.updateBillItem(
            dataToUpdateBill,
            billPID,
            tenant
          );
          await this.subscriptionService.updateSubsPendingPayment(
            tenant,
            "false"
          );
          await this.recurringService.RecurringBillingItemCreate(
            recurringData,
            tenant
          );
          await emailSend(subs, dataInvoice, paymentEpayco, EMAIL_SUCCESS);
        } else {
          // Update data of invoice: invoicePaidAt, invoiceNumber AND attri2 to status FAILED
          dataInvoice.attri2 = "FAILED";
          await this.invoiceService.createInvoice(dataInvoice, tenant);
          await this.subscriptionService.updateSubsPendingPayment(
            tenant,
            "true"
          );
          await emailSend(subs, dataInvoice, paymentEpayco, EMAIL_FAILED);
        }
      } catch (error) {
        await this.subscriptionService.updateSubsPendingPayment(tenant, "true");
      }
    }
  }
}
