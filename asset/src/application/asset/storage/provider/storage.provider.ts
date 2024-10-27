import { Result } from '@common/result';
import { IAsset } from '../../model/asset.model';

export interface IAssetStorageProvider {
  uploadFile(file: IAsset): Promise<Result<boolean>>;
  serverFile(directoryPath: string): Promise<Result<boolean>>;
  deleteFile(directoryPath: string): Promise<Result<boolean>>;
}
export const ASSET_STORAGE_PROVIDER = 'asset-storage-provider';
