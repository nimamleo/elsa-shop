import { Injectable } from '@nestjs/common';
import { IStorageProvider } from '../provider/storage.provider';
import { Result } from '@common/result';

@Injectable()
export class StorageS3Service implements IStorageProvider {
  uploadFile(): Promise<Result<boolean>> {}
  serverFile(): Promise<Result<boolean>> {}
  deleteFile(): Promise<Result<boolean>> {}
}
