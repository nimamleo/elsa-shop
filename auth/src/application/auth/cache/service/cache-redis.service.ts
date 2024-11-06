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
    private readonly redisProvider: IRedisProvider,
  ) {}
  @HandleError
  async setCode(
    phone: string,
    code: number,
    ttl?: number,
  ): Promise<Result<boolean>> {
    if (!ttl) {
      ttl = 2 * 60;
    }

    await this.redisProvider
      .getClient()
      .set(
        `${this.CACHE_CODE_PREFIX}-${phone}`,
        JSON.stringify(code),
        'EX',
        ttl,
      );

    return Ok(true);
  }

  @HandleError
  async getCode(phone: string): Promise<Result<number>> {
    const res = await this.redisProvider
      .getClient()
      .get(`${this.CACHE_CODE_PREFIX}-${phone}`);

    if (!res) {
      return Err('code not found', GenericStatusCodes.NOT_FOUND);
    }

    return Ok(JSON.parse(res));
  }

  @HandleError
  async getTtl(phone: string): Promise<Result<number>> {
    const ttl = await this.redisProvider
      .getClient()
      .ttl(`${this.CACHE_CODE_PREFIX}-${phone}`);
    return Ok(ttl > 0 ? ttl : 0);
  }
}
