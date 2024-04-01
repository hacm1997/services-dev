import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import * as moment from "moment";
import { BillItemService } from "src/billItem/service/billItem.service";
import {
  ACTIVE_SUBS,
  BILL_GROUP,
  EMAIL_FAILED,
  EMAIL_SUCCESS,
  EPAYCO,
  RECURRING_GROUP,
} from "src/common/constants/const";
import { InvoiceService } from "src/invoice/service/invoice.service";
import { RecurringBillingItemService } from "src/recurringBillingItems/service/recurringBillingItem.service";
import { SubscriptionDTO } from "src/subscription/rest/subscriptionDTO";
import { SubscriptionService } from "src/subscription/service/subscription.service";
import { EpaycoRules } from "src/subscription/utils/epayco.rules";
import { InvoiceDTO } from "src/invoice/rest/invoiceDTO";
import { RecurringBillingItemDTO } from "src/recurringBillingItems/rest/recurringBillingItemDTO";
import { emailSend } from "src/common/templates/email/emailSend";

@Injectable()
export class RecurringJobService {
  private readonly logger = new Logger(RecurringJobService.name);
  constructor(
    private recurringService: RecurringBillingItemService,
    private billItemService: BillItemService,
    private subscriptionService: SubscriptionService,
    private epaycoRules: EpaycoRules,
    private invoiceService: InvoiceService
  ) {}

  @Cron("0 14 * * *")
  async handleRecurringJobCron() {
    // CREATE BILL WITH CURRENT DATE PAYMENTE //
    const tenants = [];
    const currentDate = moment().format("YYYY-MM-DD");
    // const getSubscriptions = await this.subscriptionService.getSubscriptions();
    const getRecurrings = await this.recurringService.getRecurringsBill(
      currentDate
    );

    // console.log("recurrings in job 2 => ", getRecurrings);
    getRecurrings.forEach((item: any) => {
      // console.log(item);
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
      if (tenant !== "" && tenant !== undefined) {
        const subs: SubscriptionDTO =
          await this.subscriptionService.getSubscriptionsByTenant(tenant);
        if (subs.customerInformation?.status === ACTIVE_SUBS) {
          await this.generateBillOnNextDatePayment(subs, tenant);
        }
      }
    });
    this.logger.debug("Called when the second is 1");
  }

  async generateBillOnNextDatePayment(subs: SubscriptionDTO, tenant: string) {
    const currentDateInvoice = moment();
    const dataBillItem = {
      itemCode: subs.billingInformation.itemCode,
      price: subs.planInformation.amount.toString(),
    };
    const dataToUpdateBill = {
      billId: "",
      billItemDate: "",
    };
    const createBill = await this.billItemService.BillItemCreate(
      dataBillItem,
      tenant
    );
    // console.log("create bill item => ", createBill);
    const recurringData: RecurringBillingItemDTO = {
      billingFrequency: subs.planInformation?.interval,
      itemCode: subs.billingInformation?.itemCode,
      itemDescription: subs.billingInformation?.itemDescription,
    };

    if (subs.gateway === EPAYCO) {
      try {
        const paymentEpayco = await this.epaycoRules.createPaymente(
          subs,
          createBill
        );
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
        dataToUpdateBill.billId = paymentEpayco.data.ref_payco.toString();
        dataToUpdateBill.billItemDate = paymentEpayco.data.fecha;
        // console.log("createBill pid => ", createBill.pid);
        if (paymentEpayco.data.estado === "Aceptada") {
          dataInvoice.attri2 = "PAID";
          await this.invoiceService.createInvoice(dataInvoice, tenant);
          await this.billItemService.updateBillItem(
            dataToUpdateBill,
            createBill.pid,
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

    console.log(createBill);
    return createBill;
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
          billPID
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
          await this.recurringService.RecurringBillingItemCreate(recurringData);
        } else {
          // Update data of invoice: invoicePaidAt, invoiceNumber AND attri2 to status FAILED
          await this.invoiceService.createInvoice(dataInvoice, tenant);
          await this.subscriptionService.updateSubsPendingPayment(
            tenant,
            "true"
          );
        }
      } catch (error) {
        await this.subscriptionService.updateSubsPendingPayment(tenant, "true");
      }
    }
  }
}
