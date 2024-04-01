"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const epayco_resource_1 = require("./paymentMethods/epayco/rest/epayco.resource");
const epayco_service_1 = require("./paymentMethods/epayco/service/epayco.service");
const env_helper_1 = require("./env/env.helper");
const config_1 = require("@nestjs/config");
const healthcheck_controller_1 = require("./healthcheck/healthcheck.controller");
const tenantService_1 = require("./common/getCookies/tenantService");
const recurringBillingItem_repository_1 = require("./recurringBillingItems/data/recurringBillingItem.repository");
const recurringBillingItem_service_1 = require("./recurringBillingItems/service/recurringBillingItem.service");
const subscription_repository_1 = require("./subscription/data/subscription.repository");
const subscription_service_1 = require("./subscription/service/subscription.service");
const billItem_repository_1 = require("./billItem/data/billItem.repository");
const billItem_service_1 = require("./billItem/service/billItem.service");
const recurringBillingItem_resource_1 = require("./recurringBillingItems/rest/recurringBillingItem.resource");
const subscription_resource_1 = require("./subscription/rest/subscription.resource");
const billItem_resource_1 = require("./billItem/rest/billItem.resource");
const client_dynamodb_1 = require("./infrastructure/dynamodb/client.dynamodb");
const invoice_repository_1 = require("./invoice/data/invoice.repository");
const invoice_service_1 = require("./invoice/service/invoice.service");
const invoice_resource_1 = require("./invoice/rest/invoice.resource");
const epayco_rules_1 = require("./subscription/utils/epayco.rules");
const recurringJob_1 = require("./common/utils/jobs/recurringJob");
const schedule_1 = require("@nestjs/schedule");
const openBillsJob_1 = require("./common/utils/jobs/openBillsJob");
const envFilePath = (0, env_helper_1.loadEnvPath)(`${__dirname}/env/envs`);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({ envFilePath, isGlobal: true }),
        ],
        controllers: [
            epayco_resource_1.EpaycoResource,
            healthcheck_controller_1.HealthcheckController,
            recurringBillingItem_resource_1.RecurringBillingItemResource,
            subscription_resource_1.SubscriptionResource,
            billItem_resource_1.BillItemResource,
            invoice_resource_1.InvoiceResource,
        ],
        providers: [
            client_dynamodb_1.ClientDynamodb,
            epayco_service_1.EpaycoService,
            tenantService_1.TenantService,
            recurringBillingItem_repository_1.RecurringBillingItemRepository,
            recurringBillingItem_service_1.RecurringBillingItemService,
            subscription_repository_1.SubscriptionRepository,
            subscription_service_1.SubscriptionService,
            billItem_repository_1.BillItemRepository,
            billItem_service_1.BillItemService,
            invoice_repository_1.InvoiceRepository,
            invoice_service_1.InvoiceService,
            epayco_rules_1.EpaycoRules,
            recurringJob_1.RecurringJobService,
            openBillsJob_1.OpenBillsJob,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map