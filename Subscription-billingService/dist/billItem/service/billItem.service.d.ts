import { TenantService } from "src/common/getCookies/tenantService";
import { BillItemRepository } from "../data/billItem.repository";
import { BillItemDTO } from "../rest/billItemDTO";
export declare class BillItemService {
    private readonly tenantService;
    private billItemRepository;
    constructor(tenantService: TenantService, billItemRepository: BillItemRepository);
    BillItemCreate(BillItemDTO: BillItemDTO, newTenant?: string): Promise<BillItemDTO>;
    getAllBills(tenant?: string): Promise<any>;
    updateBillItem(billItemDTO: any, id: string, tenant?: string): Promise<any>;
    deleteBillItem(billId: string, reqTenant?: string): Promise<any>;
    private mapDTOToDomain;
    private mapDomainToDTO;
}
