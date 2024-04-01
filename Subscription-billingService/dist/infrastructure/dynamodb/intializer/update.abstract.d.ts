import { ClientDynamodb } from "../client.dynamodb";
export declare abstract class UpdateAbstract {
    private fullClientDynamodb;
    private readonly id;
    protected constructor(id: string, fullClientDynamodb: ClientDynamodb);
    checkCurrentChange(): Promise<any>;
    protected getLog(): Promise<any>;
    protected setUpdateLogTable(): Promise<void>;
    private executeUpdateLogTable;
    abstract execute(): Promise<any>;
}
