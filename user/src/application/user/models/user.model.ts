import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';

export interface IUser {
  firstName?: string;
  lastName?: string;
  phone: string;
  address?: string;
}
export interface IUserEntity extends IUser, IEntity, IDated {}
