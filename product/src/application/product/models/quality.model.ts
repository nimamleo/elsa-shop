import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';
import { IInfoEntity } from './info.model';

export interface IQuality {
  title: string;
  info: Partial<IInfoEntity>[];
}
export interface IQualityEntity extends IQuality, IEntity, IDated {}
