import { Result } from '@common/result';
import { IAuthEntity } from '../../models/auth.model';

export interface IAuthWriter {
  createAuth(
    userId: string,
    refreshToken: string,
  ): Promise<Result<IAuthEntity>>;

  updateAuth(id: string, refreshToken: string): Promise<Result<boolean>>;
}

export interface IAuthReader {
  getAuthByUserId(userId: string): Promise<Result<IAuthEntity>>;
}

export interface IAuthDatabaseProvider extends IAuthReader, IAuthWriter {}

export const AUTH_DATABASE_PROVIDER = 'auth-database-provider';
