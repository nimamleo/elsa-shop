import { Module } from '@nestjs/common';
import { IoModule } from './io/io.module';
import { ConfigModule } from '@nestjs/config';
import { kavenegarConfig } from '@sms/application/sms/kavenegar/config/kavenegar.config';

@Module({
  imports: [
    IoModule,
    ConfigModule.forRoot({
      load: [kavenegarConfig],
      cache: true,
      envFilePath: ['.env'],
    }),
  ],
})
export class AppModule {}
