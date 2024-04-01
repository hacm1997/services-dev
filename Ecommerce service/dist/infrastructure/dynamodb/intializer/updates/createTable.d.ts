import { UpdateAbstract } from '../update.abstract';
import { CreateTableInput } from '@aws-sdk/client-dynamodb';
import { ClientDynamodb } from '../../client';
export declare class CreateTable extends UpdateAbstract {
    private clientDynamodb;
    constructor(id: string, clientDynamodb: ClientDynamodb);
    private tableCreation;
    private tableCreationInvoice;
    private tableCreationCustomer;
    execute(): Promise<void>;
    executeInvoice(): Promise<void>;
    executeCustomer(): Promise<void>;
    createTable(tableCreations: CreateTableInput): void;
}
