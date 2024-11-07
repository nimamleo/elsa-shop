import { Module } from '@nestjs/common';
import { RedisCoreModule } from '@infrastructure/infrastructure/redis/redis-core.module';
import { CACHE_CODE_PROVIDER } from './provider/cache.provider';
import { CacheRedisService } from './service/cache-redis.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [RedisCoreModule, ConfigModule],
  providers: [
    {
      provide: CACHE_CODE_PROVIDER,
      useClass: CacheRedisService,
    },
  ],
  exports: [CACHE_CODE_PROVIDER],
})
export class CacheModule {}
