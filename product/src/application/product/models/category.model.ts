import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';
import { IProductEntity } from './product.model';

export interface ICategory {
  title: string;
  products: Partial<IProductEntity>[];
}
export interface ICategoryEntity extends ICategory, IEntity, IDated {}
