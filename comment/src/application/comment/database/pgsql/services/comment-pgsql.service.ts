import { ICommentDatabaseProvider } from '../../provider/comment.provider';
import { Injectable } from '@nestjs/common';
import { GetCommentQueryable } from './queryables/get-comment.queryable';
import { Result } from '@common/result';
import { ICommentEntity } from '../../../models/comment.model';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CommentOrderBy } from '../../enum/comment-order-by.enum';
import { LikeEntity } from '../entities/like.entity';

@Injectable()
export class CommentPgsqlService implements ICommentDatabaseProvider {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  @HandleError
  async getComments(
    queryable: GetCommentQueryable,
  ): Promise<Result<ICommentEntity[]>> {
    const query = this.commentRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.likes', 'l')
      .select('c.targetId', 'targetId')
      .addSelect('ROUND(AVG(c.score) ,1)', 'averageScore')
      .addSelect('COUNT(l.id)', 'likeCount')
      .groupBy('c.targetId');

    console.log(await query.getRawMany());
    if (queryable.orderBy) {
      switch (queryable.orderBy) {
        case CommentOrderBy.LIKE: {
          query.orderBy('"likeCount"', queryable.orderType);
          break;
        }
        case CommentOrderBy.SCORE: {
          query.orderBy('"averageScore"', queryable.orderType);
          break;
        }
      }
    }
    console.log(await query.getRawMany());
    return;
  }
}
