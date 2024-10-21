import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CommentService } from './service/comment.service';

@Module({
  imports: [DatabaseModule],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
