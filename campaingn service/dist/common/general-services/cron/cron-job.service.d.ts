import { EpaycoService } from '../epayco/epayco-service';
import { BuyCampaignModel } from 'src/buyCampaigns/data/buyCampaigns.model';
export declare class CronJobService {
    private readonly epaycoService;
    private job;
    private isRunning;
    private startTime;
    constructor(epaycoService: EpaycoService);
    startCronJob(buyDto: BuyCampaignModel): void;
    stopCronJob(): void;
    private elapsedTimeInMilliseconds;
    stopCronFromExternalFunction(): void;
}
