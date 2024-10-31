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
export class UploadFilesResponse {}
