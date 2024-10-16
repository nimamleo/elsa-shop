import { Injectable } from '@nestjs/common';
import { IUserProvider } from '../../providers/user.provider';
import { Err, Ok, Result } from '@common/result';
import { IUser, IUserEntity } from '../../../models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { GenericStatusCodes } from '@common/enums/status.enum';

@Injectable()
export class UserPgsqlService implements IUserProvider {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @HandleError
  async getUserByPhone(phone: string): Promise<Result<IUserEntity>> {
    const user = await this.userRepository
      .createQueryBuilder('u')
      .where('u.phone = :phone', { phone: phone })
      .getOne();

    if (!user) {
      return Err('user not found', GenericStatusCodes.NOT_FOUND);
    }

    return Ok(UserEntity.toIUserEntity(user));
  }

  @HandleError
  async createUser(iUser: IUser): Promise<Result<IUserEntity>> {
    const res = await this.userRepository.save(UserEntity.fromIUser(iUser));
    if (!res) {
      return Err('create user failed', GenericStatusCodes.INTERNAL);
    }

    return Ok(UserEntity.toIUserEntity(res));
  }
}
