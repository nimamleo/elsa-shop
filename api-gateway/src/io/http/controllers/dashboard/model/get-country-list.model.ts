import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetCountryListRequest {}

export class GetCountryListItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  createdAt: string;
}
export class GetCountryListResponse {
  @ApiProperty()
  list: GetCountryListItem[];
}
