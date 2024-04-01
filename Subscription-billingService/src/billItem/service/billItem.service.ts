import { Injectable, NotFoundException } from "@nestjs/common";
import { TenantService } from "src/common/getCookies/tenantService";
import { BillItemRepository } from "../data/billItem.repository";
import { BillItemDTO } from "../rest/billItemDTO";
import { BillItemModel } from "../data/billItem.model";

@Injectable()
export class BillItemService {
  constructor(
    private readonly tenantService: TenantService,
    private billItemRepository: BillItemRepository
  ) {}
  public async BillItemCreate(
    BillItemDTO: BillItemDTO,
    newTenant?: string
  ): Promise<BillItemDTO> {
    console.log("billItemCreateDTO => ", BillItemDTO);
    const tenant = this.tenantService.getTenantID();
    const createdBillItem: BillItemModel =
      await this.billItemRepository.billItemCreate(
        this.mapDTOToDomain(BillItemDTO),
        newTenant ? newTenant : tenant
      );
    if (!createdBillItem) {
      throw new Error("Error to create Bill Item");
    }
    return this.mapDomainToDTO(createdBillItem);
  }

  public async getAllBills(tenant?: string): Promise<any> {
    try {
      // const tenant = this.tenantService.getTenantID();
      const bill = await this.billItemRepository.getBillItems(tenant);
      if (!bill || bill.length === 0) {
        console.log("Bills not found");
        return [];
      } else {
        return bill;
      }
    } catch (error) {
      console.error("Error occurred while fetching bills:", error);
      return [];
    }
  }

  public async updateBillItem(
    billItemDTO: any,
    id: string,
    tenant?: string
  ): Promise<any> {
    const cookie_tenant = this.tenantService.getTenantID();
    if (tenant !== undefined && tenant !== "") {
      const updateBill = await this.billItemRepository.updateBillItem(
        tenant ? tenant : cookie_tenant,
        billItemDTO,
        id
      );
      return updateBill;
    } else {
      throw new NotFoundException("Tenant is undefined or empty");
    }
  }

  public async deleteBillItem(billId: string, reqTenant?: string) {
    const tenant = this.tenantService.getTenantID();
    try {
      return await this.billItemRepository.deleteBillItem(
        billId,
        reqTenant ? reqTenant : tenant
      );
    } catch (error) {
      throw new NotFoundException("Bill item not deleted, not found");
    }
  }

  private mapDTOToDomain(billItemDTO: BillItemModel): BillItemModel {
    const BillItemModel: BillItemModel = {
      itemCode: billItemDTO.itemCode,
      itemSource: billItemDTO.itemSource,
      price: billItemDTO.price.toString() || billItemDTO.price,
    };
    return BillItemModel;
  }
  private mapDomainToDTO(billItem: BillItemModel): BillItemDTO {
    const BillItemDTO: BillItemModel = {
      pid: billItem.pid,
      billId: billItem.billId,
      // billItemDate: billItem.billItemDate,
      itemCode: billItem.itemCode,
      itemSource: billItem.itemSource,
      price: billItem.price,
    };
    return BillItemDTO;
  }
}
