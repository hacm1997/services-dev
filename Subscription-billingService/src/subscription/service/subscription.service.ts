import { Injectable, NotFoundException } from "@nestjs/common";
import { SubscriptionRepository } from "../data/subscription.repository";
import { TenantService } from "src/common/getCookies/tenantService";
import { SubscriptionDTO } from "../rest/subscriptionDTO";
import { SubscriptionModel } from "../data/subscription.model";
import { RecurringBillingItemService } from "src/recurringBillingItems/service/recurringBillingItem.service";
import { ACTIVE_SUBS, CANCEL_SUBS, EPAYCO } from "src/common/constants/const";
import paginationFunction from "src/common/utils/pagination";
import { RecurringBillingItemDTO } from "src/recurringBillingItems/rest/recurringBillingItemDTO";
import { EpaycoRules } from "../utils/epayco.rules";
import { BillItemService } from "src/billItem/service/billItem.service";

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly tenantService: TenantService,
    private subscriptionRepository: SubscriptionRepository,
    private recurringService: RecurringBillingItemService,
    private billItemService: BillItemService,
    private epaycoRules: EpaycoRules
  ) {}
  public async createSubscription(
    subscriptionDTO: SubscriptionDTO
  ): Promise<any> {
    const tenant = this.tenantService.getTenantID();
    const dataFromEpayco = await this.epaycoRules.getDataFromEpayco(
      subscriptionDTO
    );
    const createdSubscription =
      await this.subscriptionRepository.subscriptionCreate(
        this.mapDTOToDomain(dataFromEpayco.SubWithPlanInfo),
        tenant
      );
    if (!createdSubscription) {
      throw new NotFoundException("subscription not created");
    } else {
      try {
        if (subscriptionDTO.gateway === EPAYCO) {
          const dataSubsBillInvoice = await this.epaycoRules.generateSaveData(
            subscriptionDTO,
            tenant
          );
          const subsReponse = this.mapDomainToDTO(subscriptionDTO);
          return {
            subscription: subsReponse,
            payment: dataSubsBillInvoice.paymentData.data,
            invoice: dataSubsBillInvoice.invoiceInfo,
          };
        }
      } catch (error) {
        console.log(error);
        throw new NotFoundException(
          "recurring or bill item could not be created"
        );
      }
    }
  }

  public async getAllSubscriptions(
    page: number,
    pageSize: number
  ): Promise<any> {
    // const tenant = this.tenantService.getTenantID();
    try {
      const subs = await this.subscriptionRepository.getSubscriptions();
      if (!subs || subs.length === 0) {
        throw new NotFoundException("Subscriptions not found");
      }
      const dataPaginate = await paginationFunction(subs, page, pageSize);
      return dataPaginate;
    } catch (error) {
      throw new NotFoundException("subscription(s) not found");
    }
  }

  public async getSubscriptions(): Promise<any> {
    // const tenant = this.tenantService.getTenantID();
    try {
      const subs: SubscriptionModel[] =
        await this.subscriptionRepository.getSubscriptions();
      if (!subs || subs.length === 0) {
        throw new NotFoundException("Subscriptions not found");
      }
      return subs.map(this.mapDomainToDTO);
    } catch (error) {
      throw new NotFoundException("subscription(s) not found");
    }
  }

  public async getSubscriptionsByTenant(tenant: string): Promise<any> {
    try {
      const subscription = await this.subscriptionRepository.getSubscriptions(
        tenant
      );
      if (!subscription || subscription.length === 0) {
        throw new NotFoundException("Subscriptions not found");
      }
      return this.mapDomainToDTO(subscription[0]);
    } catch (error) {
      throw new NotFoundException("subscription not found");
    }
  }

  public async updateSubscription(subscription: SubscriptionDTO): Promise<any> {
    const tenant = this.tenantService.getTenantID();
    const putPendingPaymentSubs =
      await this.subscriptionRepository.updateSubscription(
        tenant,
        subscription
      );
    return this.mapDomainToDTO(putPendingPaymentSubs);
  }

  public async updateSubsPendingPayment(
    tenant: string,
    pendingPayment: string
  ): Promise<any> {
    const putPendingPaymentSubs =
      await this.subscriptionRepository.updateSubsPendingPayment(
        tenant,
        Boolean(pendingPayment)
      );
    return putPendingPaymentSubs;
  }

  public async activateSubscription(newTenant?: string): Promise<any> {
    const tenant = this.tenantService.getTenantID();
    const realTenant = newTenant ? newTenant : tenant;
    const getSubsDetails = await this.getSubscriptionsByTenant(realTenant);
    const activateCustomerSub = {
      ...getSubsDetails.customerInformation,
      status: ACTIVE_SUBS,
    };
    try {
      await this.subscriptionRepository.putCustomerInfoSubscription(
        realTenant,
        JSON.stringify(activateCustomerSub)
      );
      if (getSubsDetails.gateway === EPAYCO) {
        const dataSubsBillInvoice = await this.epaycoRules.generateSaveData(
          getSubsDetails,
          realTenant
        );
        const subsReponse = this.mapDomainToDTO(getSubsDetails);
        return {
          subscription: subsReponse,
          payment: dataSubsBillInvoice.paymentData.data,
          invoice: dataSubsBillInvoice.invoiceInfo,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async reactivateSubscription(newTenant?: string): Promise<any> {
    const tenant = this.tenantService.getTenantID();
    const realTenant = newTenant ? newTenant : tenant;
    const getSubsDetails = await this.getSubscriptionsByTenant(realTenant);
    const activateCustomerSub = {
      ...getSubsDetails.customerInformation,
      status: ACTIVE_SUBS,
    };
    const recurringData = {
      billingFrequency: getSubsDetails.billingInformation?.billingFrequency,
      itemCode: getSubsDetails.billingInformation?.itemCode,
      itemDescription: getSubsDetails.billingInformation?.itemDescription,
    };
    const billItemData = {
      itemCode: getSubsDetails.planInformation?.id_plan,
      price: getSubsDetails.planInformation?.amount.toString(),
    };

    try {
      await this.subscriptionRepository.putCustomerInfoSubscription(
        realTenant,
        JSON.stringify(activateCustomerSub)
      );
      const lastRecurring = await this.recurringService.getLastRecurringBill(
        realTenant
      );
      if (!lastRecurring || lastRecurring.length === 0) {
        console.log("no data available");
        await this.recurringService.RecurringBillingItemCreate(
          recurringData as RecurringBillingItemDTO,
          "",
          lastRecurring[0].nextPaymentDate
        );
        await this.billItemService.BillItemCreate(billItemData);
      } else {
        await this.billItemService.BillItemCreate(billItemData);
      }
    } catch (error) {
      throw error;
    }
  }

  public async cancelSubscription(newTenant?: string) {
    const tenant = this.tenantService.getTenantID();
    const realTenant = newTenant ? newTenant : tenant;

    const getSubsDetails = await this.getSubscriptionsByTenant(realTenant);
    const cancelCustomerSub = {
      ...getSubsDetails.customerInformation,
      status: CANCEL_SUBS,
    };
    const putStatusSubs =
      await this.subscriptionRepository.putCustomerInfoSubscription(
        realTenant,
        JSON.stringify(cancelCustomerSub)
      );

    return putStatusSubs;
  }

  public async deleteSubscription(reqTenant?: string) {
    const tenant = this.tenantService.getTenantID();
    try {
      return await this.subscriptionRepository.deleteSubscription(
        reqTenant ? reqTenant : tenant
      );
    } catch (error) {
      throw new NotFoundException("Subscription not deleted, not found");
    }
  }

  private mapDTOToDomain(
    SubscriptionDTO: SubscriptionModel
  ): SubscriptionModel {
    const SubscriptionModel: SubscriptionModel = {
      billingInformation: SubscriptionDTO.billingInformation,
      customerInformation: SubscriptionDTO.customerInformation,
      pendingPayments: SubscriptionDTO.pendingPayments,
      planInformation: SubscriptionDTO.planInformation,
      creationDate: SubscriptionDTO.creationDate,
      gateway: SubscriptionDTO.gateway,
    };
    return SubscriptionModel;
  }
  private mapDomainToDTO(subscription: SubscriptionModel): SubscriptionDTO {
    const SubscriptionDTO: SubscriptionModel = {
      subsID: subscription.subsID,
      billingInformation: subscription.billingInformation,
      customerInformation: subscription.customerInformation,
      pendingPayments: subscription.pendingPayments,
      planInformation: subscription.planInformation,
      creationDate: subscription.creationDate,
      gateway: subscription.gateway,
    };
    return SubscriptionDTO;
  }
}
