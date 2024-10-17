import { Module } from '@nestjs/common';
import { CoreDatabaseModule } from '@infrastructure/infrastructure/database/coreDatabase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './pgsql/entities/auth.entity';
import { AUTH_DATABASE_PROVIDER } from './provider/auth.provider';
import { AuthPgsqlService } from './pgsql/services/auth-pgsql.service';

@Module({
  imports: [
    CoreDatabaseModule.register(),
    TypeOrmModule.forFeature([AuthEntity]),
  ],
  providers: [
    {
      provide: AUTH_DATABASE_PROVIDER,
      useClass: AuthPgsqlService,
    },
  ],
  exports: [AUTH_DATABASE_PROVIDER],
})
export class DatabaseModule {}
