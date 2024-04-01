import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { UpdateHandler } from "./infrastructure/dynamodb/intializer/updates/update.handler";
import { JWTHelper } from "@beamar/microlib";
import * as dotenv from "dotenv";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  if (new ConfigService().get("ENV_EXEC_CONF") === "development_local") {
    dotenv.config({ path: "./src/env/envs/development.local.env" });
  } else {
    dotenv.config({ path: "./src/env/envs/development.env" });
  }
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Creztu Billing Service")
    .setDescription("Billing Service for creztu")
    .setVersion("1.0.0")
    .addTag("Creztu Billing")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
  app.enableCors({
    origin: process.env.APP_DOMAIN.split(","),
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Authorization, Accept, xsrfCookie",
    credentials: true,
  });
  await app.listen(8080);
  console.log("BOOTSTRAP");

  JWTHelper.initialize();
  UpdateHandler.esxecuteDynamoUpdates();
}
bootstrap();
