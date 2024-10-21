import { Module } from '@nestjs/common';
import { CoreDatabaseModule } from '@infrastructure/infrastructure/database/coreDatabase.module';

@Module({
  imports: [CoreDatabaseModule.register()],
})
export class DatabaseModule {}
