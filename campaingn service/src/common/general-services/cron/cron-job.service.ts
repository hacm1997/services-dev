// cron-job.service.ts
import { Injectable } from '@nestjs/common';
import * as cron from 'cron';
import { EpaycoService } from '../epayco/epayco-service';
import { BuyCampaignModel } from 'src/buyCampaigns/data/buyCampaigns.model';

@Injectable()
export class CronJobService {
  private job: cron.CronJob;
  private isRunning: boolean = false;
  private startTime: number;
  constructor(private readonly epaycoService: EpaycoService) {}

  startCronJob(buyDto: BuyCampaignModel) {
    if (!this.isRunning) {
      this.startTime = Date.now();
      this.job = new cron.CronJob('*/1 * * * *', async () => {
        console.log('Retry Job');
        if (buyDto.payment_gateway === 'epayco') {
          await this.epaycoService.epaycoResponse(buyDto).then((res) => {
            if (res === 'success') {
              this.stopCronJob();
            }
          });
        }

        if (!this.isRunning) {
          // Si la función no detiene el trabajo, verificar si han pasado dos días
          if (this.elapsedTimeInMilliseconds() >= 180000) {
            //2 * 24 * 60 * 60 * 1000
            // await updateBuy('canceled')
            this.stopCronJob();
          }
        }
      });

      this.job.start();
      this.isRunning = true;
      console.log('Trabajo iniciado');
    } else {
      console.log('El trabajo ya está en ejecución');
    }
  }

  stopCronJob() {
    if (this.isRunning) {
      this.job.stop();
      this.isRunning = false;
      console.log('Trabajo detenido');
    } else {
      console.log('El trabajo no está en ejecución');
    }
  }

  private elapsedTimeInMilliseconds(): number {
    return Date.now() - this.startTime;
  }

  // Esta función permite a tu función externa indicar que el trabajo cron debe detenerse
  stopCronFromExternalFunction() {
    this.isRunning = false;
    console.log('Trabajo detenido desde otra función');
  }
}
