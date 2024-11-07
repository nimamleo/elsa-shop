import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthVerifyCodeRequest {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  code: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsPhoneNumber('IR')
  phone: string;
}
export class AuthVerifyCodeResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
