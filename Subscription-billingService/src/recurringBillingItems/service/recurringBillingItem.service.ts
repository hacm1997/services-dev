import { Injectable, NotFoundException } from "@nestjs/common";
import { RecurringBillingItemDTO } from "../rest/recurringBillingItemDTO";
import { TenantService } from "src/common/getCookies/tenantService";
import { RecurringBillingItemModel } from "../data/recurringBillingItem.model";
import { RecurringBillingItemRepository } from "../data/recurringBillingItem.repository";

@Injectable()
export class RecurringBillingItemService {
  constructor(
    private readonly tenantService: TenantService,
    private recurrinngBillingItemRepository: RecurringBillingItemRepository
  ) {}
  public async RecurringBillingItemCreate(
    RecurringBillingItemDTO: RecurringBillingItemDTO,
    newTenant?: string,
    nextPay?: string
  ): Promise<RecurringBillingItemDTO> {
    const tenant = this.tenantService.getTenantID();
    const createdRecurringBillingItem: RecurringBillingItemModel =
      await this.recurrinngBillingItemRepository.recurringBillingItemCreate(
        this.mapDTOToDomain(RecurringBillingItemDTO),
        newTenant && newTenant !== "" ? newTenant : tenant,
        nextPay
      );
    if (!createdRecurringBillingItem) {
      throw new Error("Error to create the Recurring Billing Item");
    }
    return this.mapDomainToDTO(createdRecurringBillingItem);
  }

  public async getRecurringsBill(date: string): Promise<any> {
    try {
      const recurrings =
        await this.recurrinngBillingItemRepository.getRecurrings(date);
      if (!recurrings || recurrings.length === 0) {
        console.log("recurrings not found");
      }
      return recurrings;
    } catch (error) {
      console.log(error);
      throw new NotFoundException("recurrings not found");
    }
  }

  public async getAllRecurringsBills(): Promise<any> {
    try {
      const recurrings =
        await this.recurrinngBillingItemRepository.getRecurringByAttri();
      if (!recurrings || recurrings.length === 0) {
        throw new NotFoundException("recurrings not found");
      }
      return recurrings;
    } catch (error) {
      console.log(error);
      throw new NotFoundException("recurrings not found");
    }
  }

  public async getLastRecurringBill(newTenant?: string): Promise<any> {
    const tenant = this.tenantService.getTenantID();
    const realTenant = newTenant ? newTenant : tenant;
    try {
      const recurrings =
        await this.recurrinngBillingItemRepository.getLastRecurringBill(
          realTenant
        );
      if (!recurrings || recurrings.length === 0) {
        console.log("recurring not found");
        return [];
      } else {
        return recurrings;
      }
    } catch (error) {
      console.log(error);
      throw new NotFoundException("recurring not found");
    }
  }

  public async deleteRecurring(
    recurringCode: string,
    reqTenant: string
  ): Promise<any> {
    const tenant = this.tenantService.getTenantID();
    const deleteRecurring: any =
      await this.recurrinngBillingItemRepository.deleteRecurring(
        recurringCode,
        reqTenant ? reqTenant : tenant
      );
    return deleteRecurring;
  }

  private mapDTOToDomain(
    RecurringBillingItemDTO: RecurringBillingItemModel
  ): RecurringBillingItemModel {
    const RBIModel: RecurringBillingItemModel = {
      billingFrequency: RecurringBillingItemDTO.billingFrequency,
      itemCode: RecurringBillingItemDTO.itemCode,
      itemDescription: RecurringBillingItemDTO.itemDescription,
      itemSource: RecurringBillingItemDTO.itemSource,
      startBillingDate: RecurringBillingItemDTO.startBillingDate,
    };
    return RBIModel;
  }
  private mapDomainToDTO(
    RecurringBillingItem: RecurringBillingItemModel
  ): RecurringBillingItemDTO {
    const RBIDTO: RecurringBillingItemModel = {
      bitID: RecurringBillingItem.bitID,
      billingFrequency: RecurringBillingItem.billingFrequency,
      itemCode: RecurringBillingItem.itemCode,
      itemDescription: RecurringBillingItem.itemDescription,
      itemSource: RecurringBillingItem.itemSource,
      startBillingDate: RecurringBillingItem.startBillingDate,
    };
    return RBIDTO;
  }
}
