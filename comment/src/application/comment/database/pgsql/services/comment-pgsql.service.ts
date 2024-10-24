import { ICommentDatabaseProvider } from '../../provider/comment.provider';
import { Injectable } from '@nestjs/common';
import { GetCommentQueryable } from './queryables/get-comment.queryable';
import { Ok, Result } from '@common/result';
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
  async getCommentProductIds(
    queryable: GetCommentQueryable,
  ): Promise<Result<[string[], number]>> {
    if (!queryable.orderBy) {
      queryable.orderBy = CommentOrderBy.SCORE;
    }
    if (!queryable.orderType) {
      queryable.orderType = 'DESC';
    }

    const query = this.commentRepository
      .createQueryBuilder('c')
      .select('c.targetId', 'targetId')
      .addSelect('ROUND(AVG(c.score) ,1)', 'averageScore')
      .groupBy('c.targetId');

    switch (queryable.orderBy) {
      case CommentOrderBy.SCORE: {
        query.orderBy('"averageScore"', queryable.orderType);
        break;
      }
    }

    const res = await query
      .skip(queryable.limitation.skip)
      .limit(queryable.limitation.limit)
      .getRawMany();

    const count = await query.getCount();

    return Ok([res.map((x) => x.targetId.toString()), count]);
  }
}
