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
const campaign_resource_1 = require("./campaign/rest/campaign.resource");
const campaign_service_1 = require("./campaign/service/campaign.service");
const campaign_repository_1 = require("./campaign/data/campaign.repository");
const profile_resource_1 = require("./profile/rest/profile.resource");
const profile_service_1 = require("./profile/service/profile.service");
const profile_repository_1 = require("./profile/data/profile.repository");
const healthcheck_controller_1 = require("./healthcheck/healthcheck.controller");
const config_1 = require("@nestjs/config");
const env_helper_1 = require("./env/env.helper");
const client_dynamodb_1 = require("./infrastructure/dynamodb/client.dynamodb");
const cron_job_service_1 = require("./common/general-services/cron/cron-job.service");
const epayco_service_1 = require("./common/general-services/epayco/epayco-service");
const buyCampaigns_resouce_1 = require("./buyCampaigns/rest/buyCampaigns.resouce");
const buyCampaigns_service_1 = require("./buyCampaigns/service/buyCampaigns.service");
const buyCampaigns_repository_1 = require("./buyCampaigns/data/buyCampaigns.repository");
const availableAmoutCampaigns_1 = require("./buyCampaigns/util/availableAmoutCampaigns");
const emailSend_service_1 = require("./buyCampaigns/util/emailSend.service");
const searchInvoice_service_1 = require("./buyCampaigns/service/searchInvoice.service");
const blog_service_1 = require("./blog/service/blog.service");
const blog_repository_1 = require("./blog/data/blog.repository");
const blog_resource_1 = require("./blog/rest/blog.resource");
const rules_1 = require("./blog/utils/rules");
const hubsport_resource_1 = require("./hubsport/rest/hubsport.resource");
const hubsport_service_1 = require("./hubsport/service/hubsport.service");
const hubsport_repository_1 = require("./hubsport/data/hubsport.repository");
const hubsportSend_service_1 = require("./hubsport/service/hubsportSend.service");
const trackingEmail_resource_1 = require("./trackingEmail/rest/trackingEmail.resource");
const trackingEmail_service_1 = require("./trackingEmail/service/trackingEmail.service");
const contact_resource_1 = require("./contacts/rest/contact.resource");
const contact_service_1 = require("./contacts/service/contact.service");
const contact_repository_1 = require("./contacts/data/contact.repository");
const trackingEmail_repository_1 = require("./trackingEmail/data/trackingEmail.repository");
const person_resource_1 = require("./person/rest/person.resource");
const company_resource_1 = require("./company/rest/company.resource");
const person_repository_1 = require("./person/data/person.repository");
const person_service_1 = require("./person/service/person.service");
const company_repository_1 = require("./company/data/company.repository");
const company_service_1 = require("./company/service/company.service");
const openSearch_1 = require("./infrastructure/opensearch/client/openSearch");
const person_ops_repository_1 = require("./person/data/person.ops.repository");
const company_ops_repository_1 = require("./company/data/company.ops.repository");
const openSearch_resource_1 = require("./infrastructure/opensearch/client/openSearch.resource");
const envFilePath = (0, env_helper_1.loadEnvPath)(`${__dirname}/env/envs`);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({ envFilePath, isGlobal: true })],
        controllers: [
            campaign_resource_1.CampaignResource,
            buyCampaigns_resouce_1.BuyCampaignResource,
            profile_resource_1.ProfileResource,
            blog_resource_1.BlogResource,
            healthcheck_controller_1.HealthcheckController,
            hubsport_resource_1.HubsportResource,
            trackingEmail_resource_1.TrackingController,
            contact_resource_1.ContactController,
            person_resource_1.PersonController,
            company_resource_1.CompanyController,
            openSearch_resource_1.OpenSearchController,
        ],
        providers: [
            client_dynamodb_1.ClientDynamodb,
            campaign_service_1.CampaignService,
            campaign_repository_1.CampaignRepository,
            buyCampaigns_service_1.BuyCampaignService,
            searchInvoice_service_1.SearchInvoiceService,
            buyCampaigns_repository_1.BuyCampaignRepository,
            profile_service_1.ProfileService,
            profile_repository_1.ProfileRepository,
            availableAmoutCampaigns_1.AvailableAmoutCampaigns,
            cron_job_service_1.CronJobService,
            epayco_service_1.EpaycoService,
            emailSend_service_1.EmailSendService,
            hubsportSend_service_1.SendClientHubsportService,
            blog_service_1.BlogService,
            blog_repository_1.BlogRepository,
            rules_1.BlogRules,
            hubsport_service_1.HubsportService,
            hubsport_repository_1.HubsportRepository,
            trackingEmail_service_1.TrackingEmailService,
            contact_service_1.ContactService,
            contact_repository_1.ContactRepository,
            trackingEmail_repository_1.TrackingRepository,
            person_repository_1.PersonRepository,
            person_service_1.PersonService,
            company_repository_1.CompanyRepository,
            company_service_1.CompanyService,
            openSearch_1.OpenSearch,
            person_ops_repository_1.PersonOpenSearchRespository,
            company_ops_repository_1.CompanyOpenSearchRespository,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map