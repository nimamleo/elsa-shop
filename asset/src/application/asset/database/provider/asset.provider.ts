export interface IAssetReader {}
export interface IAssetWriter {}
export interface IAssetDatabaseProvider extends IAssetReader, IAssetWriter {}

export const ASSET_DATABASE_PROVIDER = 'asset-database-provider';
