import { BillItemService } from "../service/billItem.service";
import { BillItemDTO } from "./billItemDTO";
export declare class BillItemResource {
    private billItemService;
    constructor(billItemService: BillItemService);
    createBlog(BillItemDTO: BillItemDTO, newTenant: string): Promise<any>;
    deleteBillItem(id: string, tenant: string): Promise<any>;
}
