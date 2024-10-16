import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IPgsqlConfig, PGSQL_CONFIG_TOKEN } from './pgsql/config/pgsql.config';

@Module({})
export class CoreDatabaseModule {
  static register(): DynamicModule {
    const imports: any[] = [];

    const pgsqlImport = TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService, logger: any) => {
        const pgConfig = configService.get<IPgsqlConfig>(PGSQL_CONFIG_TOKEN);
        return {
          type: 'postgres',
          host: pgConfig.host,
          port: pgConfig.port,
          username: pgConfig.user,
          password: pgConfig.password,
          database: pgConfig.database,
          logger: logger,
          logging: true,
          synchronize: false,
          entities: ['**/dist/**/pgsql/**/*.entity{.ts,.js}'],
          migrations: ['**/dist/**/pgsql/**/**.migration{.ts,.js}'],
          migrationsRun: true,
        };
      },
    });

    imports.push(pgsqlImport);

    return {
      module: CoreDatabaseModule,
      imports: imports,
    };
  }
}
