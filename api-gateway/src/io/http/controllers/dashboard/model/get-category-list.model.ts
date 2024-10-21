import { ApiProperty } from '@nestjs/swagger';

export class GetCategoryListRequest {}
export class GetCategoryList {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  createdAt: string;
}
export class GetCategoryListResponse {
  @ApiProperty({ type: [GetCategoryList] })
  list: GetCategoryList[];
}
