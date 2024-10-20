import { Quality } from '@product/application/product/enum/quality.enum';
import { Country } from '@product/application/product/enum/country.enum';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateProductRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsEnum(Quality)
  quality: Quality;

  @IsNotEmpty()
  @IsEnum(Country)
  country: Country;

  @IsNotEmpty()
  @IsNumberString()
  categoryId: string;
}
export class CreateProductResponse {}
