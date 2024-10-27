import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAssetStorageProvider } from '../provider/storage.provider';
import { Err, Ok, Result } from '@common/result';
import {
  IAssetProvider,
  PARSPACK_BUCKET_TOKEN,
} from '@infrastructure/infrastructure/asset/providers/asset.provider';
import { HandleError } from '@common/decorators/handle-error.decorator';
import {
  CreateMultipartUploadCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { IAsset } from '../../model/asset.model';
import { IAssetConfig } from '@infrastructure/infrastructure/asset/config/asset.config';
import { ConfigService } from '@nestjs/config';
import { IParspackConfig } from '@infrastructure/infrastructure/asset/config/parspack.config';

@Injectable()
export class StorageS3Service implements IAssetStorageProvider {
  private readonly assetConfig: IParspackConfig;
  private readonly logger = new Logger(StorageS3Service.name);
  constructor(
    @Inject(PARSPACK_BUCKET_TOKEN)
    private readonly storageProvider: IAssetProvider,
    configService: ConfigService,
  ) {
    this.assetConfig = configService.get(PARSPACK_BUCKET_TOKEN);
  }

  @HandleError
  async uploadFile(file: IAsset): Promise<Result<boolean>> {
    const command = new PutObjectCommand({
      Key: file.directoryPath,
      Bucket: this.assetConfig.name,
      Body: file.buffer,
      ContentLength: file.buffer.length,
    });
    const result = await this.storageProvider.getS3CLinet().send(command);
    if (!result) {
      return Err('Unknown error');
    }

    this.logger.verbose('Object sent successfully.');

    return Ok(true);
  }

  @HandleError
  async serverFile(directoryPath: string): Promise<Result<boolean>> {
    const command = new GetObjectCommand({
      Key: directoryPath,
      Bucket: this.assetConfig.name,
    });

    const res = await this.storageProvider.getS3CLinet().send(command);

    if (!res) {
      return Err('Unknown error');
    }

    return Ok(true);
  }

  @HandleError
  async deleteFile(directoryPath: string): Promise<Result<boolean>> {
    const command = new DeleteObjectCommand({
      Key: directoryPath,
      Bucket: this.assetConfig.name,
    });
    const res = await this.storageProvider.getS3CLinet().send(command);

    if (!res) {
      return Err('Unknown error');
    }

    return Ok(true);
  }
}
