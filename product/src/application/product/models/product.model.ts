import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';
import { Quality } from '../enum/quality.enum';
import { Country } from '../enum/country.enum';
import { ICategoryEntity } from './category.model';
import { IInfoEntity } from './info.model';

export interface IProduct {
  title: string;
  description: string;
  price: number;
  quality: Quality;
  country: Country;
  category: Partial<ICategoryEntity>;
  info: Partial<IInfoEntity>[];
}
export interface IProductEntity extends IProduct, IEntity, IDated {}
