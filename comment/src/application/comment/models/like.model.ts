import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';

export interface ILike {
  userId: string;
  commentId: string;
}
export interface ILikeEntity extends ILike, IEntity, IDated {}
