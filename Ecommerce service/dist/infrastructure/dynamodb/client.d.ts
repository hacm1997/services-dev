import { ConfigService } from '@nestjs/config';
export declare class ClientDynamodb {
    config: ConfigService;
    private _dynamoClient;
    private _fullClient;
    private _conf;
    private _docClient;
    constructor(config: ConfigService);
    get docClient(): any;
    get fullClient(): any;
}
