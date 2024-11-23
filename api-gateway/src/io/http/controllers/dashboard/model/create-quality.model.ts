import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQualityRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class CreateQualityResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  createdAt: string;
}
