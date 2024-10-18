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

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_DATABASE_PROVIDER)
    private readonly authDatabaseProvider: IAuthDatabaseProvider,
    private readonly jwtService: JwtService,
  ) {}

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
      { expiresIn: '2m' },
    );

    const refreshToken = this.jwtService.sign(
      { id: userId },
      { expiresIn: '1d' },
    );

    return Ok({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }
}
