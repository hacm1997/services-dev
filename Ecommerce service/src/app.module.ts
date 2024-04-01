import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductResource } from './product/rest/product.resource';
import { ProductUsecase } from './product/rest/product.usecase';
import { ProductGateway } from './product/rest/product.gateway';
import { ProductAdapter } from './infrastructure/dynamodb/adapter/product.adapter';
import { ProductRepositoryImpl } from './product/data/product.repository';
import { S3Service } from './product/service/s3service';
import { CustomerGateway } from './client/rest/customer.gateway';
import { CustomerAdapter } from './infrastructure/dynamodb/adapter/customer.adapter';
import { CustomerRepositoryImpl } from './client/data/customer.repository';
import { CustomerResource } from './client/rest/customer.resource';
import { CustomerUsecase } from './client/rest/customer.usecase';
import { InvoiceGateway } from './invoice/rest/invoice.gateway';
import { InvoiceRepositoryImpl } from './invoice/data/invoice.repository';
import { InvoiceAdapter } from './infrastructure/dynamodb/adapter/invoice.adapter';
import { InvoiceUsecase } from './invoice/rest/invoice.usecase';
import { InvoiceResource } from './invoice/rest/invoice.resource';
import { ShippingResource } from './shipping/rest/shipping.resource';
import { ShippingUsecase } from './shipping/rest/shipping.usecase';
import { ShippingGateway } from './shipping/rest/shipping.gateway';
import { ShippingAdapter } from './infrastructure/dynamodb/adapter/shipping.adapter';
import { ShippingRepositoryImpl } from './shipping/data/shipping.repository';
import { ClientDynamodb } from './infrastructure/dynamodb/client';
import { loadEnvPath } from './env/env.helper';
import { ConfigModule } from '@nestjs/config';
import { PaymentUsecase } from './payment/rest/payment.usecase';
import { PaymentGateway } from './payment/rest/payment.gateway';
import { PaymentRepositoryImpl } from './payment/data/payment.repository';
import { PaymentAdapter } from './infrastructure/dynamodb/adapter/payment.adapter';
import { PaymentController } from './payment/rest/payment.controller';
import { OfferingRules } from './product/service/offering';
import { CartResource } from './cart/rest/cart.controller';
import { PricingCalculate } from './cart/service/pricing-calculate';
import { EpaycoService } from './invoice/util/epayco.service';
import { CronJobService } from './invoice/util/cron.util';
import { UpdateProductInventory } from './invoice/util/update-invenory';
import { TagsResource } from './tags/rest/tags.resource';
import { TagService } from './tags/service/tags.service';
import { TagsRepository } from './tags/data/tags.repository';
import { GeneralFilterClass } from './product/service/generalFilter';
import { InvoiceFilters } from './invoice/service/filters.invoice';
import { CustomerFilters } from './client/service/customer.filter';
import { TagRules } from './tags/util/tagsRules';
import { CreateCustomerFromInvoice } from './client/util/createCustomerFromInvoice';
import { WompiService } from './invoice/util/wompi.service';

const envFilePath: string = loadEnvPath(`${__dirname}/env/envs`);

@Module({
  imports: [ConfigModule.forRoot({ envFilePath, isGlobal: true })],
  controllers: [
    ProductResource,
    CustomerResource,
    InvoiceResource,
    ShippingResource,
    PaymentController,
    CartResource,
    TagsResource,
    AppController,
  ],
  providers: [
    AppService,
    ProductUsecase,
    CustomerUsecase,
    CustomerFilters,
    CreateCustomerFromInvoice,
    InvoiceUsecase,
    InvoiceFilters,
    ShippingUsecase,
    PaymentUsecase,
    ClientDynamodb,
    OfferingRules,
    GeneralFilterClass,
    PricingCalculate,
    EpaycoService,
    WompiService,
    CronJobService,
    UpdateProductInventory,
    TagService,
    TagsRepository,
    TagRules,
    S3Service,
    { provide: ProductGateway, useClass: ProductAdapter },
    { provide: 'ProductRepository', useClass: ProductRepositoryImpl },
    { provide: CustomerGateway, useClass: CustomerAdapter },
    { provide: 'CustomerRepository', useClass: CustomerRepositoryImpl },
    { provide: InvoiceGateway, useClass: InvoiceAdapter },
    { provide: 'InvoiceRepository', useClass: InvoiceRepositoryImpl },
    { provide: ShippingGateway, useClass: ShippingAdapter },
    { provide: 'ShippingRepository', useClass: ShippingRepositoryImpl },
    { provide: PaymentGateway, useClass: PaymentAdapter },
    { provide: 'PaymentRepository', useClass: PaymentRepositoryImpl },
  ],
})
export class AppModule {}
