import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams, Type } from 'class-transformer';

export class CreateProductInfo {
  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  colorId: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  sizeId: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  count: number;
}

export class CreateProductRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }: TransformFnParams) => Number(value))
  price: number;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  qualityId: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  countryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  categoryId: string;

  @ApiProperty({
    type: [CreateProductInfo],
  })
  @IsArray()
  @Type(() => CreateProductInfo)
  info: CreateProductInfo[];
}

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

export class CreateProductResponse {
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

  @ApiProperty({ type: [CreateProductInfoResponse] })
  info: CreateProductInfoResponse[];
}
