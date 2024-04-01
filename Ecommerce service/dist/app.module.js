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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const product_resource_1 = require("./product/rest/product.resource");
const product_usecase_1 = require("./product/rest/product.usecase");
const product_gateway_1 = require("./product/rest/product.gateway");
const product_adapter_1 = require("./infrastructure/dynamodb/adapter/product.adapter");
const product_repository_1 = require("./product/data/product.repository");
const s3service_1 = require("./product/service/s3service");
const customer_gateway_1 = require("./client/rest/customer.gateway");
const customer_adapter_1 = require("./infrastructure/dynamodb/adapter/customer.adapter");
const customer_repository_1 = require("./client/data/customer.repository");
const customer_resource_1 = require("./client/rest/customer.resource");
const customer_usecase_1 = require("./client/rest/customer.usecase");
const invoice_gateway_1 = require("./invoice/rest/invoice.gateway");
const invoice_repository_1 = require("./invoice/data/invoice.repository");
const invoice_adapter_1 = require("./infrastructure/dynamodb/adapter/invoice.adapter");
const invoice_usecase_1 = require("./invoice/rest/invoice.usecase");
const invoice_resource_1 = require("./invoice/rest/invoice.resource");
const shipping_resource_1 = require("./shipping/rest/shipping.resource");
const shipping_usecase_1 = require("./shipping/rest/shipping.usecase");
const shipping_gateway_1 = require("./shipping/rest/shipping.gateway");
const shipping_adapter_1 = require("./infrastructure/dynamodb/adapter/shipping.adapter");
const shipping_repository_1 = require("./shipping/data/shipping.repository");
const client_1 = require("./infrastructure/dynamodb/client");
const env_helper_1 = require("./env/env.helper");
const config_1 = require("@nestjs/config");
const payment_usecase_1 = require("./payment/rest/payment.usecase");
const payment_gateway_1 = require("./payment/rest/payment.gateway");
const payment_repository_1 = require("./payment/data/payment.repository");
const payment_adapter_1 = require("./infrastructure/dynamodb/adapter/payment.adapter");
const payment_controller_1 = require("./payment/rest/payment.controller");
const offering_1 = require("./product/service/offering");
const cart_controller_1 = require("./cart/rest/cart.controller");
const pricing_calculate_1 = require("./cart/service/pricing-calculate");
const epayco_service_1 = require("./invoice/util/epayco.service");
const cron_util_1 = require("./invoice/util/cron.util");
const update_invenory_1 = require("./invoice/util/update-invenory");
const tags_resource_1 = require("./tags/rest/tags.resource");
const tags_service_1 = require("./tags/service/tags.service");
const tags_repository_1 = require("./tags/data/tags.repository");
const generalFilter_1 = require("./product/service/generalFilter");
const filters_invoice_1 = require("./invoice/service/filters.invoice");
const customer_filter_1 = require("./client/service/customer.filter");
const tagsRules_1 = require("./tags/util/tagsRules");
const createCustomerFromInvoice_1 = require("./client/util/createCustomerFromInvoice");
const wompi_service_1 = require("./invoice/util/wompi.service");
const envFilePath = (0, env_helper_1.loadEnvPath)(`${__dirname}/env/envs`);
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({ envFilePath, isGlobal: true })],
        controllers: [
            product_resource_1.ProductResource,
            customer_resource_1.CustomerResource,
            invoice_resource_1.InvoiceResource,
            shipping_resource_1.ShippingResource,
            payment_controller_1.PaymentController,
            cart_controller_1.CartResource,
            tags_resource_1.TagsResource,
            app_controller_1.AppController,
        ],
        providers: [
            app_service_1.AppService,
            product_usecase_1.ProductUsecase,
            customer_usecase_1.CustomerUsecase,
            customer_filter_1.CustomerFilters,
            createCustomerFromInvoice_1.CreateCustomerFromInvoice,
            invoice_usecase_1.InvoiceUsecase,
            filters_invoice_1.InvoiceFilters,
            shipping_usecase_1.ShippingUsecase,
            payment_usecase_1.PaymentUsecase,
            client_1.ClientDynamodb,
            offering_1.OfferingRules,
            generalFilter_1.GeneralFilterClass,
            pricing_calculate_1.PricingCalculate,
            epayco_service_1.EpaycoService,
            wompi_service_1.WompiService,
            cron_util_1.CronJobService,
            update_invenory_1.UpdateProductInventory,
            tags_service_1.TagService,
            tags_repository_1.TagsRepository,
            tagsRules_1.TagRules,
            s3service_1.S3Service,
            { provide: product_gateway_1.ProductGateway, useClass: product_adapter_1.ProductAdapter },
            { provide: 'ProductRepository', useClass: product_repository_1.ProductRepositoryImpl },
            { provide: customer_gateway_1.CustomerGateway, useClass: customer_adapter_1.CustomerAdapter },
            { provide: 'CustomerRepository', useClass: customer_repository_1.CustomerRepositoryImpl },
            { provide: invoice_gateway_1.InvoiceGateway, useClass: invoice_adapter_1.InvoiceAdapter },
            { provide: 'InvoiceRepository', useClass: invoice_repository_1.InvoiceRepositoryImpl },
            { provide: shipping_gateway_1.ShippingGateway, useClass: shipping_adapter_1.ShippingAdapter },
            { provide: 'ShippingRepository', useClass: shipping_repository_1.ShippingRepositoryImpl },
            { provide: payment_gateway_1.PaymentGateway, useClass: payment_adapter_1.PaymentAdapter },
            { provide: 'PaymentRepository', useClass: payment_repository_1.PaymentRepositoryImpl },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map