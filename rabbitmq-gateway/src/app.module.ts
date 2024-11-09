import { Module } from '@nestjs/common';
import { IoModule } from './io/io.module';

@Module({
  imports: [IoModule],
})
export class AppModule {}
