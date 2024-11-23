import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@common/type/order';
import { OrderType } from '@common/enums/order-type.enum';
import {
  IsEnum,
  IsOptional,
  IsNumberString,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { GetProductBy } from '../enum/get-product-list.enum';

export class CategoryResponse {
  @ApiProperty()
  id: string;
}

export class GetProductRequest {
  @ApiProperty({ enum: GetProductBy, required: false })
  @IsOptional()
  @IsEnum(GetProductBy)
  orderBy: GetProductBy;

  @ApiProperty({ enum: OrderType, required: false })
  @IsOptional()
  @IsEnum(OrderType)
  orderType: Order;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumberString(undefined, { each: true })
  colorIds: string[];

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumberString(undefined, { each: true })
  sizeIds: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  minPrice: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maxPrice: number;
}

export class SizeModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;
}

export class ColorModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  hex: string;
}

export class CreateProductInfoResponse {
  @ApiProperty()
  size: SizeModel;

  @ApiProperty()
  color: ColorModel;

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
  images: string[];

  @ApiProperty()
  category: CategoryResponse;

  @ApiProperty()
  createdAt: string;
}
