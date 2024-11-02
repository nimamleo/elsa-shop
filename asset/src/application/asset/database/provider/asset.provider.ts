import { IAsset, IAssetEntity } from '../../model/asset.model';
import { Result } from '@common/result';
import { ILimitation } from '@common/pagination/limitation.interface';

export interface IAssetReader {
  getAssetById(id: string): Promise<Result<IAssetEntity>>;

  getAssetListByTargetIds(
    targetIds: string[],
    limitation: ILimitation,
  ): Promise<Result<[IAssetEntity[], number]>>;
}
export interface IAssetWriter {
  createAsset(iAsset: IAsset): Promise<Result<IAssetEntity>>;

  deleteAsset(id: string): Promise<Result<boolean>>;
}
export interface IAssetDatabaseProvider extends IAssetReader, IAssetWriter {}

export const ASSET_DATABASE_PROVIDER = 'asset-database-provider';
