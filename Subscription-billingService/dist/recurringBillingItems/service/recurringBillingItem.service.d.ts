import { RecurringBillingItemDTO } from "../rest/recurringBillingItemDTO";
import { TenantService } from "src/common/getCookies/tenantService";
import { RecurringBillingItemRepository } from "../data/recurringBillingItem.repository";
export declare class RecurringBillingItemService {
    private readonly tenantService;
    private recurrinngBillingItemRepository;
    constructor(tenantService: TenantService, recurrinngBillingItemRepository: RecurringBillingItemRepository);
    RecurringBillingItemCreate(RecurringBillingItemDTO: RecurringBillingItemDTO, newTenant?: string, nextPay?: string): Promise<RecurringBillingItemDTO>;
    getRecurringsBill(date: string): Promise<any>;
    getAllRecurringsBills(): Promise<any>;
    getLastRecurringBill(newTenant?: string): Promise<any>;
    deleteRecurring(recurringCode: string, reqTenant: string): Promise<any>;
    private mapDTOToDomain;
    private mapDomainToDTO;
}
