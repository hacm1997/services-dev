import { RecurringBillingItemService } from "../service/recurringBillingItem.service";
import { RecurringBillingItemDTO } from "./recurringBillingItemDTO";
export declare class RecurringBillingItemResource {
    private rbiService;
    constructor(rbiService: RecurringBillingItemService);
    createBlog(RecurringBillingItemDTO: RecurringBillingItemDTO): Promise<any>;
    getLastRecurringBill(tenant: string): Promise<any>;
    deleteRecurring(id: string, tenant: string): Promise<any>;
}
