import { ClientDynamodb } from '../../client';
import { UpdateAbstract } from '../update.abstract';
import { CreateTable } from './createTable';
import { ConfigService } from '@nestjs/config';

export class UpdateHandler {
  private static clientDynamodb: ClientDynamodb = new ClientDynamodb(
    new ConfigService(),
  );
  private static executor: UpdateAbstract[] = [
    new CreateTable(
      'table_creation_2023_08_03_heinerdev',
      UpdateHandler.clientDynamodb,
    ),
  ];
  public static esxecuteDynamoUpdates() {
    this.executor.forEach((value) => value.execute());
    this.executor.forEach((value) => value.executeInvoice());
    this.executor.forEach((value) => value.executeCustomer());
  }
}
