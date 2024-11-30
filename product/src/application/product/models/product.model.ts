import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';
import { ICategoryEntity } from './category.model';
import { IInfoEntity } from './info.model';
import { IQualityEntity } from './quality.model';
import { ICountryEntity } from './country.model';

export interface IProduct {
  title: string;
  description: string;
  price: number;
  quality: Partial<IQualityEntity>;
  country: Partial<ICountryEntity>;
  category: Partial<ICategoryEntity>;
  info: Partial<IInfoEntity>[];
}
export interface IProductEntity extends IProduct, IEntity, IDated {}
