import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';
import { IInfoEntity } from './info.model';

export interface ICountry {
  title: string;
  info: Partial<IInfoEntity>[];
}
export interface ICountryEntity extends ICountry, IEntity, IDated {}
