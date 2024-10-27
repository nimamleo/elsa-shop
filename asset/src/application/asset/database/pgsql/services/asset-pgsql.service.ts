import { Injectable } from '@nestjs/common';
import { IAssetDatabaseProvider } from '../../provider/asset.provider';
import { IAsset, IAssetEntity } from '../../../model/asset.model';
import { Err, Ok, Result } from '@common/result';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetEntity } from '../entities/asset.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetPgsqlService implements IAssetDatabaseProvider {
  constructor(
    @InjectRepository(AssetEntity)
    private readonly assetRepository: Repository<AssetEntity>,
  ) {}

  @HandleError
  async createAsset(iAsset: IAsset): Promise<Result<IAssetEntity>> {
    const res = await this.assetRepository.save(AssetEntity.fromIAsset(iAsset));
    if (!res) {
      return Err('something went wrong');
    }

    return Ok(AssetEntity.toIAssetEntity(res));
  }

  @HandleError
  async getAssetById(id: string): Promise<Result<IAssetEntity>> {
    const res = await this.assetRepository
      .createQueryBuilder('a')
      .where('a.id = :id', { id: id })
      .getOne();

    if (!res) {
      return Err('file not found');
    }

    return Ok(AssetEntity.toIAssetEntity(res));
  }

  @HandleError
  async deleteAsset(id: string): Promise<Result<boolean>> {
    const res = await this.assetRepository.delete(id);

    if (res.affected === 0) {
      return Err('delete file failed');
    }

    return Ok(true);
  }
}
