import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToBasketRequest {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  productId: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  infoId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  count: number;
}

export class AddToBasketResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  infoId: string;

  @ApiProperty()
  count: number;
}
