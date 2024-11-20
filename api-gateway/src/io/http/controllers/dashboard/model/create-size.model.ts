import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSizeRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class CreateSizeResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  createdAt: string;
}
