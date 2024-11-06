import { Result } from '@common/result';

export interface ICacheProvider {
  setCode(phone: string, code: number, ttl?: number): Promise<Result<boolean>>;
  getCode(phone: string): Promise<Result<number>>;
  getTtl(phone: string): Promise<Result<number>>;
}

export const CACHE_CODE_PROVIDER = 'cache-code-provider';
