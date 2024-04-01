import { ClientDynamodb } from "src/infrastructure/dynamodb/client.dynamodb";
import { BillItemModel } from "./billItem.model";
export declare class BillItemRepository {
    private fullClientDynamodb;
    static GROUP: string;
    constructor(fullClientDynamodb: ClientDynamodb);
    billItemCreate(billItem: BillItemModel, tenant: string): Promise<BillItemModel>;
    getBillItems(tenant?: string): Promise<any>;
    updateBillItem(tenant: string, bill: any, pid: string): Promise<any>;
    deleteBillItem(billId: string, tenant: string): Promise<any>;
    private createNewItemFromDomainModel;
    private mapToDomain;
}
