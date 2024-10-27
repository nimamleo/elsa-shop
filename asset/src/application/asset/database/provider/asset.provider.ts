import { IAsset, IAssetEntity } from '../../model/asset.model';
import { Result } from '@common/result';

export interface IAssetReader {
  getAssetById(id: string): Promise<Result<IAssetEntity>>;
}
export interface IAssetWriter {
  createAsset(iAsset: IAsset): Promise<Result<IAssetEntity>>;

  deleteAsset(id: string): Promise<Result<boolean>>;
}
export interface IAssetDatabaseProvider extends IAssetReader, IAssetWriter {}

export const ASSET_DATABASE_PROVIDER = 'asset-database-provider';
