import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';
import { IInfoEntity } from './info.model';

export interface IColor {
  title: string;
  hex: string;
  info: Partial<IInfoEntity>[];
}
export interface IColorEntity extends IColor, IEntity, IDated {}
