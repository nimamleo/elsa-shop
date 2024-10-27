import { AssetMimeType } from '../enum/asset-mimetype.enum';
import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';

export interface IAsset {
  targetId: string;
  name: string;
  mimetype: string;
  size: number;
  directoryPath: string;
  isPoster: boolean;
  buffer?: Buffer;
}

export interface IAssetEntity extends IAsset, IEntity, IDated {}
