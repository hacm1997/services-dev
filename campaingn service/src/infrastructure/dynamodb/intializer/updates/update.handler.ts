import { UpdateAbstract } from '../update.abstract';
import { CreateTable } from './createTable';
import { ClientDynamodb } from '../../client.dynamodb';
import { ConfigService } from '@nestjs/config';

export class UpdateHandler {
  private static clientDynamodb: ClientDynamodb = new ClientDynamodb(
    new ConfigService(),
  );
  private static executor: UpdateAbstract[] = [
    new CreateTable(
      'table_creation_2023_09_19_juandev',
      UpdateHandler.clientDynamodb,
    ),
  ];
  public static esxecuteDynamoUpdates() {
    this.executor.forEach((value) => value.execute());
    this.executor.forEach((value) => value.executeCompras());
    this.executor.forEach((value) => value.executeBlog());
    this.executor.forEach((value) => value.executeHusport());
    this.executor.forEach((value) => value.executeTrackingEmail());
    this.executor.forEach((value) => value.executeContact());
  }
}
