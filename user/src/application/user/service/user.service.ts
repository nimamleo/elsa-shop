import { Inject, Injectable } from '@nestjs/common';
import {
  IUserProvider,
  USER_DATABASE_PROVIDER,
} from '../database/providers/user.provider';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { Err, Ok, Result } from '@common/result';
import { IUserEntity } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_DATABASE_PROVIDER)
    private readonly userProvider: IUserProvider,
  ) {}

  @HandleError
  async loginUser(phone: string): Promise<Result<IUserEntity>> {
    const getUser = await this.userProvider.getUserByPhone(phone);
    if (getUser.isError()) {
      const createUser = await this.userProvider.createUser({ phone: phone });
      if (createUser.isError()) {
        return Err(createUser.err);
      }
      return Ok(createUser.value);
    }

    return Ok(getUser.value);
  }
}
