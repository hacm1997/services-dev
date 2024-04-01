import { ClientDynamodb } from '../client.dynamodb';
export declare abstract class UpdateAbstract {
    private fullClientDynamodb;
    private readonly id;
    protected constructor(id: string, fullClientDynamodb: ClientDynamodb);
    checkCurrentChange(): Promise<any>;
    checkCurrentChangeCompras(): Promise<any>;
    checkCurrentChangeBlog(): Promise<any>;
    checkCurrentChangeHubsport(): Promise<any>;
    checkCurrentChangeTrackingEmail(): Promise<any>;
    checkCurrentChangeConatc(): Promise<any>;
    protected getLog(): Promise<any>;
    protected getLogCompras(): Promise<any>;
    protected getLogBlog(): Promise<any>;
    protected getLogHubsport(): Promise<any>;
    protected getLogTrackingEmail(): Promise<any>;
    protected getLogConatct(): Promise<any>;
    protected setUpdateLogTable(): Promise<void>;
    private executeUpdateLogTable;
    private executeUpdateLogTableCompras;
    private executeUpdateLogTableBlog;
    private executeUpdateLogTableHubsport;
    private executeUpdateLogTableTrackingEmail;
    private executeUpdateLogTableContact;
    abstract execute(): Promise<any>;
    abstract executeCompras(): Promise<any>;
    abstract executeBlog(): Promise<any>;
    abstract executeHusport(): Promise<any>;
    abstract executeTrackingEmail(): Promise<any>;
    abstract executeContact(): Promise<any>;
}
