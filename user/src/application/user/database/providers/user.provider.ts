import { Result } from '@common/result';
import { IUser, IUserEntity } from '../../models/user.model';

export interface IUserReader {
  getUserByPhone(phone: string): Promise<Result<IUserEntity>>;

  getUserById(id: string): Promise<Result<IUserEntity>>;
}

export interface IUserWriter {
  createUser(iUser: IUser): Promise<Result<IUserEntity>>;
}

export interface IUserProvider extends IUserReader, IUserWriter {}

export const USER_DATABASE_PROVIDER = 'user--database-provider';
