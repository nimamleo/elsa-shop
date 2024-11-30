import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';
import { IInfoEntity } from './info.model';
import { IProductEntity } from './product.model';

export interface ICountry {
  title: string;
  product?: Partial<IProductEntity>[];
}
export interface ICountryEntity extends ICountry, IEntity, IDated {}
