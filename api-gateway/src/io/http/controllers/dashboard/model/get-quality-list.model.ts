import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetQualityListRequest {}

export class GetQualityListItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  createdAt: string;
}
export class GetQualityListResponse {
  @ApiProperty()
  list: GetQualityListItem[];
}
