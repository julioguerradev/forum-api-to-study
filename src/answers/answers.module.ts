import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
