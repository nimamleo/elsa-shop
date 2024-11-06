import { Result } from '@common/result';

export interface ICacheProvider {
  setCode(userId: string, code: string, ttl?: number): Promise<Result<boolean>>;
  getCode(userId: string): Promise<Result<string>>;
}
