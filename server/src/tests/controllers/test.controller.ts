import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TestsService } from '../services/tests.service';
import { Test } from '../models/test.entity';
import CreateTestDto from '../dto/create-test.dto';
import { ResultsService } from '../services/results.service';
import { Result } from '../models/result.entity';
import CreateResultDto from '../dto/create-result.dto';
import { QuestionsService } from '../services/questions.service';

@Controller('tests')
export class TestsController {

  constructor(
    private testsService: TestsService,
    private resultsService: ResultsService,
    private questionsService: QuestionsService,
  ) {
  }

  @Get()
  index(): Promise<Test[]> {
    return this.testsService.findAll();
  }

  @Get(':id/begin')
  async begin(@Param('id') testId): Promise<Result> {
    const test = await this.testsService.findOne(testId);
    const result = await this.resultsService.create({
      test: test.id,
    });

    return result;
  }

  @Post(':resultId/finish')
  async finish(@Param('resultId') resultId, @Body() resultData: CreateResultDto): Promise<Result> {
    const { questionChoices } = resultData;
    const result: Result = await this.resultsService.findOne(resultId);
    result.endTime = Date.now();

    // save selected choices
    const choices = await this.questionsService.getChoices(questionChoices);
    result.choices = choices;

    return result.save();
  }

  @Post('create')
  async create(@Body() testData: CreateTestDto): Promise<any> {
    return this.testsService.create(testData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() testData: Test): Promise<any> {
    testData.id = Number(id);

    return this.testsService.update(testData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.testsService.delete(id);
  }
}
