import { IComment, ICommentEntity } from '../../models/comment.model';
import { Result } from '@common/result';
import { GetCommentQueryable } from '../pgsql/services/queryables/get-comment.queryable';

export interface ICommentReader {
  getComments(queryable: GetCommentQueryable): Promise<Result<string[]>>;
}

export interface ICommentWriter {}

export interface ICommentDatabaseProvider
  extends ICommentWriter,
    ICommentReader {}

export const COMMENT_DATABASE_PROVIDER = 'comment-database-provider';
