import { Inject, Injectable } from '@nestjs/common';
import {
  AUTH_DATABASE_PROVIDER,
  IAuthDatabaseProvider,
} from '../database/provider/auth.provider';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { Err, Ok, Result } from '@common/result';
import { GenerateTokensDto } from './dto/generate-tokens.dto';
import { JwtService } from '@nestjs/jwt';
import { IAuthEntity } from '../models/auth.model';
import { IAuthJwt } from '@common/interfaces/auth-jwt.interface';
import { RandomNumber } from '@common/utils/random-number';
import { REDIS_DB0_PROVIDER } from '@infrastructure/infrastructure/redis/provider/redis.provider';
import { RedisService } from '@infrastructure/infrastructure/redis/service/redis.service';
import { CacheRedisService } from '../cache/service/cache-redis.service';
import {
  CACHE_CODE_PROVIDER,
  ICacheProvider,
} from '../cache/provider/cache.provider';
import { GenerateCodeDto } from './dto/generate-code.dto';
import { ConfigService } from '@nestjs/config';
import { AUTH_CONFIG_TOKEN, IAuthConfig } from '../config/auth.config';

@Injectable()
export class AuthService {
  private readonly authConfig: IAuthConfig;
  constructor(
    @Inject(AUTH_DATABASE_PROVIDER)
    private readonly authDatabaseProvider: IAuthDatabaseProvider,
    private readonly jwtService: JwtService,
    @Inject(CACHE_CODE_PROVIDER)
    private readonly cacheService: ICacheProvider,
    configService: ConfigService,
  ) {
    this.authConfig = configService.get(AUTH_CONFIG_TOKEN);
  }

  @HandleError
  async verifyAuth(userId: string): Promise<Result<IAuthEntity>> {
    const tokens = await this.generateTokens(userId);
    if (tokens.isError()) {
      return Err(tokens.err);
    }

    const authExist = await this.authDatabaseProvider.getAuthByUserId(userId);
    if (authExist.isError()) {
      const createAuth = await this.authDatabaseProvider.createAuth(
        userId,
        tokens.value.refreshToken,
      );
      if (createAuth.isError()) {
        return Err(createAuth.err);
      }

      return Ok({
        ...createAuth.value,
        accessToken: tokens.value.accessToken,
      });
    }
    const updateAuth = await this.authDatabaseProvider.updateAuth(
      authExist.value.id,
      tokens.value.refreshToken,
    );
    if (updateAuth.isError()) {
      return Err(updateAuth.err);
    }

    return Ok({
      ...authExist.value,
      accessToken: tokens.value.accessToken,
    });
  }

  @HandleError
  async generateTokens(userId: string): Promise<Result<GenerateTokensDto>> {
    const accessToken = this.jwtService.sign(
      { id: userId },
      { expiresIn: '1d' },
    );

    const refreshToken = this.jwtService.sign(
      { id: userId },
      { expiresIn: '1m' },
    );

    return Ok({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }

  @HandleError
  async extractUserId(token: string): Promise<Result<string>> {
    const verifyRes = this.jwtService.verify<IAuthJwt>(token);
    if (!verifyRes) {
      return Err('some thing went wrong');
    }
    return Ok(verifyRes.id);
  }

  @HandleError
  async generateCode(phone: string): Promise<Result<GenerateCodeDto>> {
    let code: number = 12654;
    if (!this.authConfig.debug) {
      code = RandomNumber(5);
    }

    const getCode = await this.cacheService.getCode(phone);
    if (getCode.isError()) {
      const cacheCode = await this.cacheService.setCode(phone, code, 120);
      if (cacheCode.isError()) {
        return Err(cacheCode.err);
      }
      return Ok({ code: code, ttl: 120 });
    }
    const getCodeTtl = await this.cacheService.getTtl(phone);
    if (getCodeTtl.isError()) {
      return Err(getCodeTtl.err);
    }

    return Ok({
      code: getCode.value,
      ttl: getCodeTtl.value,
    });
  }
}
