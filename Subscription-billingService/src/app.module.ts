import { Module } from "@nestjs/common";
import { EpaycoResource } from "./paymentMethods/epayco/rest/epayco.resource";
import { EpaycoService } from "./paymentMethods/epayco/service/epayco.service";
import { loadEnvPath } from "./env/env.helper";
import { ConfigModule } from "@nestjs/config";
import { HealthcheckController } from "./healthcheck/healthcheck.controller";
import { TenantService } from "./common/getCookies/tenantService";
import { RecurringBillingItemRepository } from "./recurringBillingItems/data/recurringBillingItem.repository";
import { RecurringBillingItemService } from "./recurringBillingItems/service/recurringBillingItem.service";
import { SubscriptionRepository } from "./subscription/data/subscription.repository";
import { SubscriptionService } from "./subscription/service/subscription.service";
import { BillItemRepository } from "./billItem/data/billItem.repository";
import { BillItemService } from "./billItem/service/billItem.service";
import { RecurringBillingItemResource } from "./recurringBillingItems/rest/recurringBillingItem.resource";
import { SubscriptionResource } from "./subscription/rest/subscription.resource";
import { BillItemResource } from "./billItem/rest/billItem.resource";
import { ClientDynamodb } from "./infrastructure/dynamodb/client.dynamodb";
import { InvoiceRepository } from "./invoice/data/invoice.repository";
import { InvoiceService } from "./invoice/service/invoice.service";
import { InvoiceResource } from "./invoice/rest/invoice.resource";
import { EpaycoRules } from "./subscription/utils/epayco.rules";
import { RecurringJobService } from "./common/utils/jobs/recurringJob";
import { ScheduleModule } from "@nestjs/schedule";
import { OpenBillsJob } from "./common/utils/jobs/openBillsJob";

const envFilePath: string = loadEnvPath(`${__dirname}/env/envs`);

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
  ],
  controllers: [
    EpaycoResource,
    HealthcheckController,
    RecurringBillingItemResource,
    SubscriptionResource,
    BillItemResource,
    InvoiceResource,
  ],
  providers: [
    ClientDynamodb,
    EpaycoService,
    TenantService,
    RecurringBillingItemRepository,
    RecurringBillingItemService,
    SubscriptionRepository,
    SubscriptionService,
    BillItemRepository,
    BillItemService,
    InvoiceRepository,
    InvoiceService,
    EpaycoRules,
    RecurringJobService,
    OpenBillsJob,
  ],
})
export class AppModule {}
