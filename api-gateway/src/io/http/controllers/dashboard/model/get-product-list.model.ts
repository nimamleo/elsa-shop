import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@common/type/order';
import { OrderType } from '@common/enums/order-type.enum';
import { IsEnum, IsOptional } from 'class-validator';
import { CommentOrderBy } from '@comment/application/comment/database/enum/comment-order-by.enum';
import { PaymentOrderBy } from '@payment/application/payment/enum/payment-order-by.enum';
import { GetProductBy } from '../enum/get-product-list.enum';

export class GetProductRequest {}
export class CategoryResponse {
  @ApiProperty()
  id: string;
}

export class CreateProductInfoResponse {
  @ApiProperty()
  size: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  count: number;
}

export class GetProductResponse {
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

  @ApiProperty({ type: [CreateProductInfoResponse] })
  info: CreateProductInfoResponse[];

  @ApiProperty()
  category: CategoryResponse;

  @ApiProperty()
  createdAt: string;
}

export class GetProductQuery {
  @ApiProperty({ enum: GetProductBy, required: false })
  @IsOptional()
  @IsEnum(GetProductBy)
  orderBy: GetProductBy;

  @ApiProperty({ enum: OrderType, required: false })
  @IsOptional()
  @IsEnum(OrderType)
  orderType: Order;
}
