import { Module } from '@nestjs/common';
import { IoModule } from './io/io.module';
import { ConfigModule } from '@nestjs/config';
import { httpConfig } from './io/http/config/http.config';
import { pgsqlConfig } from '@infrastructure/infrastructure/database/pgsql/config/pgsql.config';
import { jwtConfig } from '@auth/application/auth/config/jwtConfig';
import { parspackConfig } from '@infrastructure/infrastructure/asset/config/parspack.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [httpConfig, pgsqlConfig, jwtConfig, parspackConfig],
    }),
    IoModule,
  ],
})
export class AppModule {}
