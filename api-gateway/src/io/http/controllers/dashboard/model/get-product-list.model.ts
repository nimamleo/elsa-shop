import { CommentOrderBy } from '@comment/application/comment/database/enum/comment-order-by.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@common/type/order';
import { OrderType } from '@common/enums/order-by.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class GetProductRequest {}
export class CategoryResponse {
  @ApiProperty()
  id: string;
}

export class GetProduct {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quality: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  category: CategoryResponse;

  @ApiProperty()
  createdAt: string;
}
export class GetProductResponse {
  list: GetProduct[];
}

export class GetProductQuery {
  @ApiProperty({ enum: CommentOrderBy, required: false })
  @IsOptional()
  @IsEnum(CommentOrderBy)
  orderBy: CommentOrderBy;

  @ApiProperty({ enum: OrderType, required: false })
  @IsOptional()
  @IsEnum(OrderType)
  orderType: Order;
}
