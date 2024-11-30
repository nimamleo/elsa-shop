import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';
import { IInfoEntity } from './info.model';
import { IProductEntity } from './product.model';

export interface IQuality {
  title: string;
  product?: Partial<IProductEntity>[];
}
export interface IQualityEntity extends IQuality, IEntity, IDated {}
