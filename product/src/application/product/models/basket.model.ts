import { IProductEntity } from './product.model';
import { IDated } from '@common/interfaces/dated.interface';
import { IEntity } from '@common/interfaces/entity.interface';
import { IInfoEntity } from './info.model';

export interface IBasket {
  userId: string;
  product: Partial<IProductEntity>;
  info: Partial<IInfoEntity>;
  count: number;
}

export interface IBasketEntity extends IBasket, IDated, IEntity {}
