import { CommentOrderBy } from '@comment/application/comment/database/enum/comment-order-by.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@common/type/order';
import { OrderType } from '@common/enums/order-by.enum';

export class GetProductRequest {}
export class GetProductResponse {}

export class GetProductQuery {
  @ApiProperty({ enum: CommentOrderBy })
  orderBy: CommentOrderBy;

  @ApiProperty({ enum: OrderType })
  orderType: Order;
}
