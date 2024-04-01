import { Injectable, NotFoundException } from "@nestjs/common";
import { InvoiceRepository } from "../data/invoice.repository";
import { InvoiceDTO } from "../rest/invoiceDTO";
import { TenantService } from "src/common/getCookies/tenantService";
import { InvoiceModel } from "../data/invoice.model";

@Injectable()
export class InvoiceService {
  constructor(
    private readonly tenantService: TenantService,
    private invoiceRepository: InvoiceRepository
  ) {}

  public async createInvoice(
    invoice: InvoiceDTO,
    newTenant?: string
  ): Promise<InvoiceDTO> {
    const tenant = this.tenantService.getTenantID();
    console.log("invoice DTO => ", invoice);
    console.log("tenant in invoiuce service => ", newTenant);
    const createInvoiceRequest: InvoiceModel =
      await this.invoiceRepository.createInvoice(
        this.mapDTOToDomain(invoice),
        newTenant ? newTenant : tenant
      );

    if (!createInvoiceRequest) {
      throw new Error("Error to create Invoice");
    }
    return this.mapDomainToDTO(createInvoiceRequest);
  }

  public async deleteInvoice(invoiceId: string, reqTenant?: string) {
    const tenant = this.tenantService.getTenantID();
    try {
      return await this.invoiceRepository.deleteInvoice(
        invoiceId,
        reqTenant ? reqTenant : tenant
      );
    } catch (error) {
      throw new NotFoundException("Invoice not deleted, not found");
    }
  }

  public async updateInvoice(
    invoiceCode: string,
    invoiceId: string,
    newTenant: string,
    invoiceData: any
  ): Promise<any> {
    const tenant = this.tenantService.getTenantID();
    const putInvoice = await this.invoiceRepository.updateInvoice(
      invoiceCode,
      invoiceId,
      newTenant ? newTenant : tenant,
      invoiceData
    );
    return putInvoice;
  }

  private mapDTOToDomain(invoiceDTO: InvoiceModel): InvoiceModel {
    const invoiceModel: InvoiceModel = {
      invoiceId: invoiceDTO.invoiceId,
      amount: invoiceDTO.amount.toString(),
      invoicePaidAt: invoiceDTO.invoicePaidAt,
      invoiceNumber: invoiceDTO.invoiceNumber,
      attri2: invoiceDTO.attri2,
    };
    return invoiceModel;
  }

  private mapDomainToDTO(invoice: InvoiceModel): InvoiceDTO {
    const invoiceItem: InvoiceModel = {
      invoiceId: invoice.invoiceId,
      amount: invoice.amount,
      invoicePaidAt: invoice.invoicePaidAt,
      creationDate: invoice.creationDate,
      invoiceNumber: invoice.invoiceNumber,
      attri2: invoice.attri2,
    };
    return invoiceItem;
  }
}
