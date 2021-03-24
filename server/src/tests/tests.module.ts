import { Module } from '@nestjs/common';
import { TestsService } from './services/tests.service';
import { TestsController } from './controllers/test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './models/test.entity';
import { Question } from './models/question.entity';
import { Result } from './models/result.entity';
import { Choice } from './models/choice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Test, Question, Result, Choice]),
  ],
  providers: [TestsService],
  controllers: [TestsController],
})
export class TestsModule { }
