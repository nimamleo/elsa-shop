import { Inject, Injectable } from '@nestjs/common';
import { ICacheProvider } from '../provider/cache.provider';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { Err, Ok, Result } from '@common/result';
import {
  IRedisProvider,
  REDIS_DB0_PROVIDER,
} from '@infrastructure/infrastructure/redis/provider/redis.provider';
import { GenericStatusCodes } from '@common/enums/status.enum';

@Injectable()
export class CacheRedisService implements ICacheProvider {
  private readonly CACHE_CODE_PREFIX = 'code';
  constructor(
    @Inject(REDIS_DB0_PROVIDER)
    private readonly redisProvide: IRedisProvider,
  ) {}
  @HandleError
  async setCode(
    userId: string,
    code: string,
    ttl?: number,
  ): Promise<Result<boolean>> {
    if (!ttl) {
      ttl = 2 * 60;
    }

    await this.redisProvide
      .getClient()
      .set(`${this.CACHE_CODE_PREFIX}-${userId}`, code, 'EX', ttl);

    return Ok(true);
  }

  @HandleError
  async getCode(userId: string): Promise<Result<string>> {
    const res = await this.redisProvide
      .getClient()
      .get(`${this.CACHE_CODE_PREFIX}-${userId}`);

    if (!res) {
      return Err('code not found', GenericStatusCodes.NOT_FOUND);
    }

    return Ok(res);
  }
}
