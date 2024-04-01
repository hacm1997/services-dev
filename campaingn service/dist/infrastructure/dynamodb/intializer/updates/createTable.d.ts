import { UpdateAbstract } from '../update.abstract';
import { CreateTableInput } from '@aws-sdk/client-dynamodb';
import { ClientDynamodb } from '../../client.dynamodb';
export declare class CreateTable extends UpdateAbstract {
    private clientDynamodb;
    constructor(id: string, clientDynamodb: ClientDynamodb);
    private describeTable;
    private tableCampaignsCreation;
    private tableComprasCampaignsCreation;
    private tableBlogsCreation;
    private tableHubsportCreation;
    private tableTrackingEmailCreation;
    private tableContact;
    execute(): Promise<void>;
    executeCompras(): Promise<void>;
    executeBlog(): Promise<void>;
    executeHusport(): Promise<void>;
    executeTrackingEmail(): Promise<void>;
    executeContact(): Promise<void>;
    updateTableWithIndex(tableName: string, newIndexName: string, newIndexSchema: any): Promise<void>;
    removeIndexFromTable(tableName: string, indexNameToRemove: string): Promise<void>;
    createTable(tableCreations: CreateTableInput): void;
}
