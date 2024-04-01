import { Module } from '@nestjs/common';
import { CampaignResource } from './campaign/rest/campaign.resource';
import { CampaignService } from './campaign/service/campaign.service';
import { CampaignRepository } from './campaign/data/campaign.repository';
import { ProfileResource } from './profile/rest/profile.resource';
import { ProfileService } from './profile/service/profile.service';
import { ProfileRepository } from './profile/data/profile.repository';
import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { ConfigModule } from '@nestjs/config';
import { loadEnvPath } from './env/env.helper';
import { ClientDynamodb } from './infrastructure/dynamodb/client.dynamodb';
import { CronJobService } from './common/general-services/cron/cron-job.service';
import { EpaycoService } from './common/general-services/epayco/epayco-service';
import { BuyCampaignResource } from './buyCampaigns/rest/buyCampaigns.resouce';
import { BuyCampaignService } from './buyCampaigns/service/buyCampaigns.service';
import { BuyCampaignRepository } from './buyCampaigns/data/buyCampaigns.repository';
import { AvailableAmoutCampaigns } from './buyCampaigns/util/availableAmoutCampaigns';
import { EmailSendService } from './buyCampaigns/util/emailSend.service';
import { SearchInvoiceService } from './buyCampaigns/service/searchInvoice.service';
import { BlogService } from './blog/service/blog.service';
import { BlogRepository } from './blog/data/blog.repository';
import { BlogResource } from './blog/rest/blog.resource';
import { BlogRules } from './blog/utils/rules';
import { HubsportResource } from './hubsport/rest/hubsport.resource';
import { HubsportService } from './hubsport/service/hubsport.service';
import { HubsportRepository } from './hubsport/data/hubsport.repository';
import { SendClientHubsportService } from './hubsport/service/hubsportSend.service';
import { TrackingController } from './trackingEmail/rest/trackingEmail.resource';
import { TrackingEmailService } from './trackingEmail/service/trackingEmail.service';
import { ContactController } from './contacts/rest/contact.resource';
import { ContactService } from './contacts/service/contact.service';
import { ContactRepository } from './contacts/data/contact.repository';
import { TrackingRepository } from './trackingEmail/data/trackingEmail.repository';
import { PersonController } from './person/rest/person.resource';
import { CompanyController } from './company/rest/company.resource';
import { PersonRepository } from './person/data/person.repository';
import { PersonService } from './person/service/person.service';
import { CompanyRepository } from './company/data/company.repository';
import { CompanyService } from './company/service/company.service';
import { OpenSearch } from './infrastructure/opensearch/client/openSearch';
import { PersonOpenSearchRespository } from './person/data/person.ops.repository';
import { CompanyOpenSearchRespository } from './company/data/company.ops.repository';
import { OpenSearchController } from './infrastructure/opensearch/client/openSearch.resource';

const envFilePath: string = loadEnvPath(`${__dirname}/env/envs`);

@Module({
  imports: [ConfigModule.forRoot({ envFilePath, isGlobal: true })],
  controllers: [
    CampaignResource,
    BuyCampaignResource,
    ProfileResource,
    BlogResource,
    HealthcheckController,
    HubsportResource,
    TrackingController,
    ContactController,
    PersonController,
    CompanyController,
    OpenSearchController,
  ],
  providers: [
    ClientDynamodb,
    CampaignService,
    CampaignRepository,
    BuyCampaignService,
    SearchInvoiceService,
    BuyCampaignRepository,
    ProfileService,
    ProfileRepository,
    AvailableAmoutCampaigns,
    CronJobService,
    EpaycoService,
    EmailSendService,
    SendClientHubsportService,
    BlogService,
    BlogRepository,
    BlogRules,
    HubsportService,
    HubsportRepository,
    TrackingEmailService,
    ContactService,
    ContactRepository,
    TrackingRepository,
    PersonRepository,
    PersonService,
    CompanyRepository,
    CompanyService,
    OpenSearch,
    PersonOpenSearchRespository,
    CompanyOpenSearchRespository,
  ],
})
export class AppModule {}
