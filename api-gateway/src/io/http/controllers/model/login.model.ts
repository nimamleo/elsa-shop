import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class LoginRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phone: string;
}
export class LoginResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  accessToken: string;
}
