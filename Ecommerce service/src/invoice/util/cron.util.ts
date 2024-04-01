// cron-job.service.ts
import { Inject, Injectable } from '@nestjs/common';
import * as cron from 'cron';
import { EpaycoService } from './epayco.service';
import { InvoiceModel } from '../data/invoice.model';
import { UpdateProductInventory } from './update-invenory';
import { InvoiceRepository } from '../data/invoice.repository';
import { WompiService } from './wompi.service';

@Injectable()
export class CronJobService {
  private jobs: Map<string, { job: cron.CronJob; startTime: number }>;
  private isRunning: boolean;

  constructor(
    private readonly epaycoService: EpaycoService,
    private readonly wompiService: WompiService,
    private updateProductInventory: UpdateProductInventory,
    @Inject('InvoiceRepository') private invoiceRepository: InvoiceRepository,
  ) {
    this.jobs = new Map();
    this.isRunning = false;
  }

  async startCronJob(
    invoiceDto: InvoiceModel,
    tenantID: string,
    request: Request,
  ) {
    await this.updateProductInventory.updateProductsInventory(
      tenantID,
      invoiceDto.products,
      'false',
    );

    const jobKey = `${tenantID}_${invoiceDto.invoice_code}`;

    if (!this.jobs.has(jobKey)) {
      const startTime = Date.now();
      const job = new cron.CronJob('*/30 * * * * *', async () => {
        console.log('Retry Job for invoice:', invoiceDto.invoice_code);
        try {
          const checkDataInvoice =
            await this.invoiceRepository.getAllInvoiceById(
              invoiceDto.invoice_code,
              tenantID,
            );
          const reference_invoice = checkDataInvoice[0].reference as string;
          if (reference_invoice && invoiceDto.extraInfo?.gateway === 'epayco') {
            await this.epaycoService
              .epaycoResponse(invoiceDto, tenantID, reference_invoice, request)
              .then((res) => {
                if (res === 'success') {
                  this.stopCronJob(jobKey);
                }
              });
          }
          if (reference_invoice && invoiceDto.extraInfo?.gateway === 'wompi') {
            await this.wompiService
              .wompiResponse(invoiceDto, tenantID, reference_invoice, request)
              .then((res) => {
                if (res === 'success') {
                  this.stopCronJob(jobKey);
                }
              });
          }
        } catch (error) {
          console.log();
        }

        const elapsedTime = Date.now() - startTime;
        if (elapsedTime >= 3710000) {
          await this.updateProductInventory.updateProductsInventory(
            tenantID,
            invoiceDto.products,
            'true',
          );
          console.log('Cron job stopped for invoice:', invoiceDto.invoice_code);
          this.stopCronJob(jobKey);
        }
      });

      this.jobs.set(jobKey, { job, startTime });
      job.start();
      console.log('Job started for invoice:', invoiceDto.invoice_code);
    } else {
      console.log('Job already running for invoice:', invoiceDto.invoice_code);
    }
  }

  stopCronJob(jobKey: string) {
    const job = this.jobs.get(jobKey);
    if (job) {
      job.job.stop();
      this.jobs.delete(jobKey);
      console.log('Job stopped for invoice:', jobKey.split('_')[1]);
    }
  }
}
