import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetColorListRequest {}

export class GetColorItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  hex: string;

  @ApiProperty()
  createdAt: string;
}

export class GetColorListResponse {
  @ApiProperty()
  list: GetColorItem[];
}
