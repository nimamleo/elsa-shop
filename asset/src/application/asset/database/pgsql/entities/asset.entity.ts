import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AssetMimeType } from '../../../enum/asset-mimetype.enum';
import { IAsset, IAssetEntity } from '../../../model/asset.model';

@Entity('asset')
export class AssetEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  targetId: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  mimetype: string;

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'boolean' })
  isPoster: boolean;

  @Column({ type: 'varchar', length: 255 })
  directoryPath: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromIAsset(iAsset: IAsset): AssetEntity {
    if (!iAsset) {
      return null;
    }

    const asset = new AssetEntity();

    asset.name = iAsset.name;
    asset.mimetype = iAsset.mimetype;
    asset.directoryPath = iAsset.directoryPath;
    asset.targetId = Number(iAsset.targetId);
    asset.size = iAsset.size;
    asset.isPoster = iAsset.isPoster;

    return asset;
  }

  static toIAssetEntity(asset: AssetEntity): IAssetEntity {
    if (!asset) {
      return null;
    }

    return {
      id: asset.id.toString(),
      targetId: asset.targetId.toString(),
      directoryPath: asset.directoryPath,
      name: asset.name,
      mimetype: asset.mimetype,
      size: asset.size,
      isPoster: asset.isPoster,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt,
    };
  }
}
