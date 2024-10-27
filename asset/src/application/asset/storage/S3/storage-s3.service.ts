import { Inject, Injectable } from '@nestjs/common';
import { IStorageProvider } from '../provider/storage.provider';
import { Result } from '@common/result';
import {
  IAssetProvider,
  PARSPACK_BUCKET_TOKEN,
} from '@infrastructure/infrastructure/asset/providers/asset.provider';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { CreateMultipartUploadCommand } from '@aws-sdk/client-s3';

@Injectable()
export class StorageS3Service implements IStorageProvider {
  constructor(
    @Inject(PARSPACK_BUCKET_TOKEN)
    private readonly storageProvider: IAssetProvider,
  ) {}

  @HandleError
  async uploadFile(): Promise<Result<boolean>> {
    const createCommand = new CreateMultipartUploadCommand({});
    // const result = await this.storageProvider.getS3CLinet().;
  }
  serverFile(): Promise<Result<boolean>> {}
  deleteFile(): Promise<Result<boolean>> {}
}
