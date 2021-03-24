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

  @Get('summary')
  async summary(): Promise<any> {
    const stats = {
      // tests qty
      testCount: 0,
      // duration overall (in minutes)
      totalDuration: 0,
      // average duration (in minutes)
      durationAvg: 0,
      // total tests started
      started: 0,
      // total tests finished
      finished: 0,
    };
    const tests = await this.testsService.findAll();
    stats.testCount = tests.length;

    // ideally, we'll have a different module where we do all this stats thing, but i'm short on time
    tests.forEach(test => {
      if (test.results.length > 0) {
        let finished = false;
        stats.started += 1;

        test.results.forEach(result => {
          if (result.endTime) {
            finished = true;
            stats.totalDuration += Math.floor((result.endTime - result.startTime) / 1000 / 60);
          }
        });

        if (finished) {
          stats.finished += 1;
        }
      }
    });

    stats.durationAvg = stats.totalDuration / stats.finished;

    return Promise.resolve(stats);
  }

  @Get(':id/view')
  async view(@Param('id') testId): Promise<Test> {
    const test = await this.testsService.findOne(testId);

    return test;
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
