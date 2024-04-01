import { Injectable } from '@nestjs/common';
import { AttributeMap } from 'aws-sdk/clients/dynamodb';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAllData = async (
    params: any,
    resulTwo: any,
    allData: AttributeMap[],
  ): Promise<AttributeMap[]> => {
    if (resulTwo?.Items != null) {
      if (resulTwo.Items.length > 0) {
        allData = [...allData, ...resulTwo.Items];
      }
      if (resulTwo.LastEvaluatedKey != null) {
        params.ExclusiveStartKey = resulTwo.LastEvaluatedKey;
        return await this.getAllData(params, resulTwo, allData);
      }
    }
    return allData;
  };
}
