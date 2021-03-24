import { Module } from '@nestjs/common';
import { TestsService } from './services/tests.service';
import { TestsController } from './controllers/test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './models/test.entity';
import { Question } from './models/question.entity';
import { Result } from './models/result.entity';
import { Choice } from './models/choice.entity';
import { QuestionsService } from './services/questions.service';
import { QuestionsController } from './controllers/question.controller';
import { ResultsService } from './services/results.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Test, Question, Choice, Result]),
  ],
  providers: [TestsService, QuestionsService, ResultsService],
  controllers: [TestsController, QuestionsController],
})
export class TestsModule { }
