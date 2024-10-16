import { Module } from '@nestjs/common';
import { CoreDatabaseModule } from '@infrastructure/infrastructure/database/coreDatabase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './pgsql/entities/user.entity';
import { USER_DATABASE_PROVIDER } from './providers/user.provider';
import { UserPgsqlService } from './pgsql/services/user-pgsql.service';

@Module({
  imports: [
    CoreDatabaseModule.register(),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    {
      provide: USER_DATABASE_PROVIDER,
      useClass: UserPgsqlService,
    },
  ],
  exports: [USER_DATABASE_PROVIDER],
})
export class DatabaseModule {}
