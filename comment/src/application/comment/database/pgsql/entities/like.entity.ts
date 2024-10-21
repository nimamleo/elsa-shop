import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ILike, ILikeEntity } from '../../../models/like.model';
import { IComment, ICommentEntity } from '../../../models/comment.model';
import { CommentEntity } from './comment.entity';

@Entity('like')
@Unique(['commentId', 'userId'])
export class LikeEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  userId: number;

  @Column({ type: 'bigint', unsigned: true })
  commentId: number;

  @ManyToOne(() => CommentEntity, (x) => x.likes)
  @JoinColumn({ name: 'commentId' })
  comment: CommentEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromILike(iLike: ILike): LikeEntity {
    if (!iLike) {
      return null;
    }

    const like = new LikeEntity();

    like.userId = Number(iLike.userId);
    like.commentId = Number(iLike.commentId);

    return like;
  }

  static toICommentEntity(like: LikeEntity): ILikeEntity {
    if (!like) {
      return null;
    }

    return {
      id: like.id.toString(),
      userId: like.userId.toString(),
      commentId: like.commentId.toString(),
      createdAt: like.createdAt,
      updatedAt: like.updatedAt,
    };
  }
}
