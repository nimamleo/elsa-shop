import { Inject, Injectable } from '@nestjs/common';
import {
  IAssetProvider,
  PARSPACK_BUCKET_TOKEN,
} from '@infrastructure/infrastructure/asset/providers/asset.provider';
import { Err, Ok, Result } from '@common/result';
import { IAsset, IAssetEntity } from '../model/asset.model';
import { HandleError } from '@common/decorators/handle-error.decorator';
import * as path from 'node:path';
import {
  ASSET_DATABASE_PROVIDER,
  IAssetDatabaseProvider,
} from '../database/provider/asset.provider';
import {
  ASSET_STORAGE_PROVIDER,
  IAssetStorageProvider,
} from '../storage/provider/storage.provider';

@Injectable()
export class AssetService {
  constructor(
    @Inject(ASSET_STORAGE_PROVIDER)
    private readonly assetService: IAssetStorageProvider,
    @Inject(ASSET_DATABASE_PROVIDER)
    private readonly assetDatabaseProvider: IAssetDatabaseProvider,
  ) {}

  @HandleError
  async createFile(iAsset: IAsset): Promise<Result<IAssetEntity>> {
    iAsset.name = `${iAsset.name}-${new Date()}`;
    iAsset.directoryPath = `images/${iAsset.name}`;

    const saveToDb = await this.assetDatabaseProvider.createAsset(iAsset);
    if (saveToDb.isError()) {
      return Err(saveToDb.err);
    }

    const uploadRes = await this.assetService.uploadFile(iAsset);
    if (uploadRes.isError()) {
      await this.assetDatabaseProvider.deleteAsset(saveToDb.value.id);
      return Err(uploadRes.err);
    }

    return Ok(saveToDb.value);
  }
}
