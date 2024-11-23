import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCountryRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class CreateCountryResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  createdAt: string;
}
