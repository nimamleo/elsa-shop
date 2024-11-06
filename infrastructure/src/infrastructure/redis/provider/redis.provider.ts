import Redis from 'ioredis';

export interface IRedisProvider {
  connect(): Promise<void>;
  getClient(): Redis;
  disconnect(): void;
}

export const REDIS_DB0_PROVIDER = 'redis-db0-provider';
