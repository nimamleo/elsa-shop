import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetColorListRequest {}

export class GetSizeListItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  createdAt: string;
}
export class GetSizeListResponse {
  @ApiProperty()
  list: GetSizeListItem[];
}
