import { ClientDynamodb } from '../client';
export declare abstract class UpdateAbstract {
    private fullClientDynamodb;
    private readonly id;
    protected constructor(id: string, fullClientDynamodb: ClientDynamodb);
    checkCurrentChange(): Promise<any>;
    checkCurrentChangeInvoice(): Promise<any>;
    checkCurrentChangeCustomer(): Promise<any>;
    protected getLog(): Promise<any>;
    protected getLogInvoice(): Promise<any>;
    protected getLogCustomer(): Promise<any>;
    protected setUpdateLogTable(): Promise<void>;
    private executeUpdateLogTable;
    private executeUpdateLogTableInvoice;
    private executeUpdateLogTableCustomer;
    abstract execute(): Promise<any>;
    abstract executeInvoice(): Promise<any>;
    abstract executeCustomer(): Promise<any>;
}
