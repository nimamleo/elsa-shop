import { Module } from '@nestjs/common';
import { RedisCoreModule } from '@infrastructure/infrastructure/redis/redis-core.module';

@Module({
  imports: [RedisCoreModule],
})
export class CacheModule {}
