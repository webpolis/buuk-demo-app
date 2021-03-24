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

@Controller('tests')
export class TestsController {

  constructor(
    private testsService: TestsService,
    private resultsService: ResultsService,
  ) {
  }

  @Get()
  index(): Promise<Test[]> {
    return this.testsService.findAll();
  }

  @Get(':id/take')
  async take(@Param('id') id): Promise<Test> {
    const test = await this.testsService.findOne(id);
    const result = await this.resultsService.create({
      test: test.id,
    });

    return test;
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
