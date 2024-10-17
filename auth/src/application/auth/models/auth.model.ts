import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';

export interface IAuth {
  userId: string;
  refreshToken: string;
}

export interface IAuthEntity extends IAuth, IEntity, IDated {}
