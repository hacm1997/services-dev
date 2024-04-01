"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const update_handler_1 = require("./infrastructure/dynamodb/intializer/updates/update.handler");
const dotenv = require("dotenv");
const microlib_1 = require("@beamar/microlib");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    if (new config_1.ConfigService().get('ENV_EXEC_CONF') === 'development_local') {
        dotenv.config({ path: './src/env/envs/development.local.env' });
    }
    else {
        dotenv.config({ path: './src/env/envs/development.env' });
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Ecommerce Micro Service')
        .setDescription('Micro Service for ecommerce')
        .setVersion('1.0.0')
        .addTag('ecommerce')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors({
        origin: process.env.APP_DOMAIN.split(','),
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Authorization, Accept, xsrfCookie, responseType',
        credentials: true,
    });
    await app.listen(process.env.APP_PORT);
    console.log('BOOTSTRAP');
    microlib_1.JWTHelper.initialize();
    update_handler_1.UpdateHandler.esxecuteDynamoUpdates();
}
bootstrap();
//# sourceMappingURL=main.js.map