import { Result } from '@common/result';

export interface IStorageProvider {
  uploadFile(): Promise<Result<boolean>>;
  serverFile(): Promise<Result<boolean>>;
  deleteFile(): Promise<Result<boolean>>;
}
export const STORAGE_PROVIDER_TOKEN = 'storage-provider-token';
