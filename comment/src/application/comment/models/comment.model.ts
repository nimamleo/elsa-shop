import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';
import { ILikeEntity } from './like.model';

export interface IComment {
  text: string;
  userId: string;
  replies?: Partial<ICommentEntity>[];
  parent?: Partial<ICommentEntity>;
  targetId: string;
  score: number;
  likes: Partial<ILikeEntity>[];
}
export interface ICommentEntity extends IComment, IEntity, IDated {}
