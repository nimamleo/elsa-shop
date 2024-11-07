import { Injectable } from '@nestjs/common';
import { IRedisProvider } from '../provider/redis.provider';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { IRedisConfig, REDIS_CONFIG_TOKEN } from '../config/redis.config';

@Injectable()
export class RedisService implements IRedisProvider {
  private readonly redisClient: Redis;
  private readonly redisConfig: IRedisConfig;

  constructor(index: number, configService: ConfigService) {
    this.redisConfig = configService.get(REDIS_CONFIG_TOKEN);
    this.redisClient = new Redis({
      db: index,
      port: this.redisConfig.port,
      username: this.redisConfig.username,
      host: this.redisConfig.host,
      password: this.redisConfig.password,
    });
  }
  async connect(): Promise<void> {
    await this.redisClient.connect();
  }
  disconnect(): void {
    this.redisClient.disconnect();
  }
  getClient(): Redis {
    return this.redisClient;
  }
}
