import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  HTTP_CONFIG_TOKEN,
  httpConfig,
  IHttpConfig,
} from './io/http/config/http.config';

async function loadConfig(): Promise<ConfigService> {
  const app = await NestFactory.createApplicationContext(
    ConfigModule.forRoot({
      cache: true,
      load: [httpConfig],
      envFilePath: ['.env'],
    }),
  );

  return app.get<ConfigService>(ConfigService);
}

async function main() {
  const app = await NestFactory.create(AppModule);
  const configService = await loadConfig();
  const appConfig: IHttpConfig = configService.get(HTTP_CONFIG_TOKEN);
  const logger = new Logger('AppModule');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SHOP API Gateway')
    .setDescription('SHOP API Gateway')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('swagger', app, swaggerDocument, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.init();
  await app.listen(appConfig.port);
  logger.verbose(`app is running on port ${appConfig.port}`);
}

main();
