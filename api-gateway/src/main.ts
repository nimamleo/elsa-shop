import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_CONFIG, appConfig, IAppConfig } from './app.config';
import { Logger } from '@nestjs/common';

async function loadConfig(): Promise<ConfigService> {
  const app = await NestFactory.createApplicationContext(
    ConfigModule.forRoot({
      cache: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
  );

  return app.get<ConfigService>(ConfigService);
}

async function main() {
  const app = await NestFactory.create(AppModule);
  const configService = await loadConfig();
  const logger = new Logger('AppModule');

  const appConfig: IAppConfig = configService.get(APP_CONFIG);

  await app.init();
  await app.listen(appConfig.port);
  logger.verbose(`app is running on port ${appConfig.port}`);
}

main();
