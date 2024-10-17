import { Result } from '@common/result';
import { IAuthEntity } from '../../models/auth.model';

export interface IAuthWriter {
  assignRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<Result<IAuthEntity>>;
}

export interface IAuthReader {}

export interface IAuthDatabaseProvider extends IAuthReader, IAuthWriter {}

export const AUTH_DATABASE_PROVIDER = 'auth-database-provider';
