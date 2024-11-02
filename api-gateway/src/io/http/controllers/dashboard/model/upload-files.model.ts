import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UploadFilesRequest {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumberString()
  productId: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Image files to upload',
  })
  files: Buffer[];
}
export class UploadFilesResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  targetId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  directoryPath: string;

  @ApiProperty()
  isPoster: boolean;
}

export class UploadFilesList {
  @ApiProperty({ type: UploadFilesResponse })
  list: UploadFilesResponse[];
}
