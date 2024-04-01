import { AttributeMap } from 'aws-sdk/clients/dynamodb';
export declare class AppService {
    getHello(): string;
    getAllData: (params: any, resulTwo: any, allData: AttributeMap[]) => Promise<AttributeMap[]>;
}
