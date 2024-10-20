import { Quality } from '@product/application/product/enum/quality.enum';
import { Country } from '@product/application/product/enum/country.enum';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';
import { ICategoryEntity } from '@product/application/product/models/category.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsEnum(Quality)
  @ApiProperty()
  quality: Quality;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Country)
  country: Country;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  categoryId: string;
}

export class CategoryResponse {
  @ApiProperty()
  id: string;
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
}
