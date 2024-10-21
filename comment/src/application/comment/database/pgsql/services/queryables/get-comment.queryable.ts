import { CommentOrderBy } from '../../../enum/comment-order-by.enum';
import { Order } from '@common/type/order';

export class GetCommentQueryable {
  orderBy: CommentOrderBy;
  orderType: Order;
}
