import { Quality } from '@product/application/product/enum/quality.enum';
import { Country } from '@product/application/product/enum/country.enum';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Size } from '@product/application/product/enum/size.enum';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateProductInfo {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({ type: 'enum', enum: Size })
  @IsNotEmpty()
  @IsEnum(Size)
  size: Size;

  @ApiProperty()
  @IsNotEmpty()
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
  @IsEnum(Quality)
  @ApiProperty({ type: 'enum', enum: Quality })
  quality: Quality;

  @ApiProperty({ type: 'enum', enum: Country })
  @IsNotEmpty()
  @IsEnum(Country)
  country: Country;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  categoryId: string;

  @ApiProperty({ type: [CreateProductInfo] })
  info: CreateProductInfo[];

  @ApiProperty({ type: 'string', format: 'binary', isArray: true })
  files: string[];
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
