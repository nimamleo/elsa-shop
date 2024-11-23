import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';
import { IProductEntity } from './product.model';
import { IBasketEntity } from './basket.model';
import { ISizeEntity } from './size.model';
import { IColorEntity } from './color.model';
import { IQualityEntity } from './quality.model';

export interface IInfo {
  color: Partial<IColorEntity>;
  size: Partial<ISizeEntity>;
  quality: Partial<IQualityEntity>;
  country: Partial<IQualityEntity>;
  count: number;
  product: Partial<IProductEntity>;
  basket?: Partial<IBasketEntity>[];
}
export interface IInfoEntity extends IInfo, IEntity, IDated {}
