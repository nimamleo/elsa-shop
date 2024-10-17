import { Injectable } from '@nestjs/common';
import { IAuthDatabaseProvider } from '../../provider/auth.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from '../entities/auth.entity';
import { Repository } from 'typeorm';
import { Err, Ok, Result } from '@common/result';
import { IAuthEntity } from '../../../models/auth.model';
import { HandleError } from '@common/decorators/handle-error.decorator';

@Injectable()
export class AuthPgsqlService implements IAuthDatabaseProvider {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
  ) {}

  @HandleError
  async assignRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<Result<IAuthEntity>> {
    const res = await this.authRepository.save(
      AuthEntity.fromIAuth({ refreshToken: refreshToken, userId: userId }),
    );
    if (!res) {
      return Err('create auth failed!');
    }
    return Ok(AuthEntity.toIAuthEntity(res));
  }
}
