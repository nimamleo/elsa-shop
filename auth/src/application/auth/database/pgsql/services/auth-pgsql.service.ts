import { Injectable } from '@nestjs/common';
import { IAuthDatabaseProvider } from '../../provider/auth.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from '../entities/auth.entity';
import { Repository } from 'typeorm';
import { Err, Ok, Result } from '@common/result';
import { IAuthEntity } from '../../../models/auth.model';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { GenericStatusCodes } from '@common/enums/status.enum';

@Injectable()
export class AuthPgsqlService implements IAuthDatabaseProvider {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
  ) {}

  @HandleError
  async createAuth(
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

  @HandleError
  async updateAuth(id: string, refreshToken: string): Promise<Result<boolean>> {
    const res = await this.authRepository.update(id, {
      refreshToken: refreshToken,
    });
    if (res.affected === 0) {
      return Err('update auth failed', GenericStatusCodes.INTERNAL);
    }

    return Ok(true);
  }

  @HandleError
  async getAuthByUserId(userId: string): Promise<Result<IAuthEntity>> {
    const res = await this.authRepository
      .createQueryBuilder('a')
      .where('a.userId = :userId', { userId: userId })
      .getOne();

    if (!res) {
      return Err('refresh token not found', GenericStatusCodes.NOT_FOUND);
    }

    return Ok(AuthEntity.toIAuthEntity(res));
  }
}
