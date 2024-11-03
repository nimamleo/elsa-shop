import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';
import { Size } from '../enum/size.enum';
import { IProductEntity } from './product.model';
import { IBasketEntity } from './basket.model';

export interface IInfo {
  color: string;
  size: Size;
  count: number;
  product: Partial<IProductEntity>;
  basket?: Partial<IBasketEntity>[];
}
export interface IInfoEntity extends IInfo, IEntity, IDated {}
