import { Module } from '@nestjs/common';
import { CoreDatabaseModule } from '@infrastructure/infrastructure/database/coreDatabase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './pgsql/entities/comment.entity';
import { LikeEntity } from './pgsql/entities/like.entity';
import { COMMENT_DATABASE_PROVIDER } from './provider/comment.provider';
import { CommentPgsqlService } from './pgsql/services/comment-pgsql.service';

@Module({
  imports: [
    CoreDatabaseModule.register(),
    TypeOrmModule.forFeature([CommentEntity, LikeEntity]),
  ],
  providers: [
    {
      provide: COMMENT_DATABASE_PROVIDER,
      useClass: CommentPgsqlService,
    },
  ],
  exports: [COMMENT_DATABASE_PROVIDER],
})
export class DatabaseModule {}
