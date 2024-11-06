import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class AuthSendCodeRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phone: string;
}
export class AuthSendCodeResponse {
  @ApiProperty()
  phone: string;

  @ApiProperty()
  code: number;

  @ApiProperty()
  ttl: number;
}
