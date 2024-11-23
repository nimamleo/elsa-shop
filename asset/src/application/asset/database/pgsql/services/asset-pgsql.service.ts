import { Injectable } from '@nestjs/common';
import { IAssetDatabaseProvider } from '../../provider/asset.provider';
import { IAsset, IAssetEntity } from '../../../model/asset.model';
import { Err, Ok, Result } from '@common/result';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetEntity } from '../entities/asset.entity';
import { Repository } from 'typeorm';
import { ILimitation } from '@common/pagination/limitation.interface';
import { response } from 'express';

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

  @HandleError
  async getAssetListByTargetIds(
    targetIds: string[],
    limitation: ILimitation,
  ): Promise<Result<[IAssetEntity[], number]>> {
    if (targetIds && targetIds.length > 0) {
      const [res, count] = await this.assetRepository
        .createQueryBuilder('a')
        .where('a.targetId in (:...ids)', { ids: targetIds })
        .offset(limitation.skip)
        .limit(limitation.limit)
        .getManyAndCount();

      return Ok([res.map((x) => AssetEntity.toIAssetEntity(x)), count]);
    }

    return Ok([[], 0]);
  }
}
