import { Quality } from '@product/application/product/enum/quality.enum';
import { Country } from '@product/application/product/enum/country.enum';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';
import { CategorySlug } from '@product/application/product/enum/category-slug.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsEnum(CategorySlug)
  @ApiProperty()
  slug: CategorySlug;
}
export class CreateCategoryResponse {}
