import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';
import { CategorySlug } from '../enum/category-slug.enum';
import { IProductEntity } from './product.model';

export interface ICategory {
  title: string;
  slug: CategorySlug;
  products: Partial<IProductEntity>[];
}
export interface ICategoryEntity extends ICategory, IEntity, IDated {}
