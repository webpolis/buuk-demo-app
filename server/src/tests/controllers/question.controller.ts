import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
  } from '@nestjs/common';
import { QuestionsService } from '../services/questions.service';
import { Question } from '../models/question.entity';
import CreateQuestionDto from '../dto/create-question.dto';

@Controller('questions')
  export class QuestionsController {

    constructor(private questionsService: QuestionsService) {
    }

    @Get()
    index(): Promise<Question[]> {
      return this.questionsService.findAll();
    }

    @Post('create')
    async create(@Body() questionData: CreateQuestionDto): Promise<any> {
      return this.questionsService.create(questionData);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() questionData: Question): Promise<any> {
      questionData.id = Number(id);

      return this.questionsService.update(questionData);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.questionsService.delete(id);
    }
  }
