import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REDIS_DB0_PROVIDER } from './provider/redis.provider';
import { RedisService } from './service/redis.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_DB0_PROVIDER,
      useFactory: async (configService: ConfigService) => {
        const client = new RedisService(0, configService);
        await client.connect();
        return client;
      },
    },
  ],
  exports: [REDIS_DB0_PROVIDER],
})
export class RedisCoreModule {}
