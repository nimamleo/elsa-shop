import { Inject, Injectable } from '@nestjs/common';
import {
  AUTH_DATABASE_PROVIDER,
  IAuthDatabaseProvider,
} from '../database/provider/auth.provider';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { Err, Ok, Result } from '@common/result';
import { GenerateTokensDto } from './dto/generate-tokens.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_DATABASE_PROVIDER)
    private readonly authDatabaseProvider: IAuthDatabaseProvider,
    private readonly jwtService: JwtService,
  ) {}

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

    const saveRefreshToken = await this.authDatabaseProvider.assignRefreshToken(
      userId,
      refreshToken,
    );
    if (saveRefreshToken.isError()) {
      return Err(saveRefreshToken.err);
    }

    return Ok({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }
}
