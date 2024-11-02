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
import { ILimitation } from '@common/pagination/limitation.interface';
import { IPaginatedResult } from '@common/pagination/paginated-result.interface';
import { PaginationResult } from '@common/pagination/paginatio-result';

@Injectable()
export class AssetService {
  constructor(
    @Inject(ASSET_STORAGE_PROVIDER)
    private readonly assetStorageService: IAssetStorageProvider,
    @Inject(ASSET_DATABASE_PROVIDER)
    private readonly assetDatabaseProvider: IAssetDatabaseProvider,
  ) {}

  @HandleError
  async createFile(iAsset: IAsset): Promise<Result<IAssetEntity>> {
    iAsset.name = `${Date.now()}-${iAsset.name}`;
    iAsset.directoryPath = `images/${iAsset.name}`;
    const saveToDb = await this.assetDatabaseProvider.createAsset(iAsset);
    if (saveToDb.isError()) {
      return Err(saveToDb.err);
    }

    const uploadRes = await this.assetStorageService.uploadFile(iAsset);
    if (uploadRes.isError()) {
      await this.assetDatabaseProvider.deleteAsset(saveToDb.value.id);
      return Err(uploadRes.err);
    }

    return Ok(saveToDb.value);
  }

  @HandleError
  async getAssetList(
    productIds: string[],
    limitation: ILimitation,
  ): Promise<Result<IPaginatedResult<IAssetEntity>>> {
    const assetDatabaseList =
      await this.assetDatabaseProvider.getAssetListByTargetIds(
        productIds,
        limitation,
      );
    if (assetDatabaseList.isError()) {
      return Err(assetDatabaseList.err);
    }

    return Ok(
      new PaginationResult(
        assetDatabaseList.value[0],
        assetDatabaseList.value[1],
        limitation,
      ),
    );
  }
}
