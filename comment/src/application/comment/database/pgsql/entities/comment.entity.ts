import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ILikeEntity } from '../../../models/like.model';
import { IComment, ICommentEntity } from '../../../models/comment.model';
import { LikeEntity } from './like.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  text: string;

  @Column({ type: 'bigint', unsigned: true })
  userId: number;

  @Column({ type: 'int' })
  score: number;

  @OneToMany(() => CommentEntity, (x) => x.replies)
  parent: CommentEntity;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  parentId: number;

  @ManyToOne(() => CommentEntity, (x) => x.parent)
  @JoinColumn({ name: 'parentId' })
  replies: CommentEntity[];

  @Column({ type: 'bigint', unsigned: true })
  targetId: number;

  @OneToMany(() => LikeEntity, (x) => x.comment)
  likes: LikeEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromIComment(iComment: IComment): CommentEntity {
    if (!iComment) {
      return null;
    }

    const comment = new CommentEntity();

    comment.text = iComment.text;
    comment.userId = Number(iComment.userId);
    comment.targetId = Number(iComment.targetId);
    comment.score = iComment.score;
    if (iComment.parent) {
      comment.parentId = Number(iComment.parent.id);
    }

    return comment;
  }

  static toICommentEntity(comment: CommentEntity): ICommentEntity {
    if (!comment) {
      return null;
    }

    return {
      id: comment.id.toString(),
      text: comment.text,
      userId: comment.userId.toString(),
      targetId: comment.targetId.toString(),
      score: comment.score,
      parent: comment.parent
        ? CommentEntity.toICommentEntity(comment.parent)
        : { id: comment.parentId.toString() },
      likes:
        comment.likes && comment.likes.length > 0
          ? comment.likes.map((x) => LikeEntity.toICommentEntity(x))
          : [],
      replies:
        comment.replies && comment.replies.length < 0
          ? comment.replies.map((x) => CommentEntity.toICommentEntity(x))
          : [],
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  }
}
