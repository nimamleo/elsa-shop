import { Inject, Injectable } from '@nestjs/common';
import {
  COMMENT_DATABASE_PROVIDER,
  ICommentDatabaseProvider,
} from '../database/provider/comment.provider';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { GetCommentQueryable } from '../database/pgsql/services/queryables/get-comment.queryable';
import { Result } from '@common/result';
import { ICommentEntity } from '../models/comment.model';

@Injectable()
export class CommentService {
  constructor(
    @Inject(COMMENT_DATABASE_PROVIDER)
    private readonly commentDatabaseProvider: ICommentDatabaseProvider,
  ) {}

  @HandleError
  async getComments(
    queryable: GetCommentQueryable,
  ): Promise<Result<ICommentEntity[]>> {
    const res = await this.commentDatabaseProvider.getComments(queryable);
    return;
  }
}
