import { ClientDynamodb } from "src/infrastructure/dynamodb/client.dynamodb";
import { RecurringBillingItemModel } from "./recurringBillingItem.model";
export declare class RecurringBillingItemRepository {
    private fullClientDynamodb;
    static GROUP: string;
    constructor(fullClientDynamodb: ClientDynamodb);
    recurringBillingItemCreate(RecurringBillingItem: RecurringBillingItemModel, tenant: string, nextPay?: string): Promise<RecurringBillingItemModel>;
    getRecurrings(date: string): Promise<any>;
    getLastRecurringBill(tenant: string): Promise<any>;
    getRecurringByAttri(): Promise<any>;
    deleteRecurring(recurringCode: string, tenant: string): Promise<{
        message: string;
    }>;
    private createNewItemFromDomainModel;
    private mapToDomain;
}
