import { CommentOrderBy } from '../../../enum/comment-order-by.enum';
import { OrderType } from '@common/type/order.type';

export class GetCommentQueryable {
  orderBy: CommentOrderBy;
  orderType: OrderType;
}
