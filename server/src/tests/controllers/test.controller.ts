import { Controller, Get, Post, Put, Delete, Body, Param } from  '@nestjs/common'
import { TestsService } from '../services/tests.service';
import { Test } from '../models/test.entity';


@Controller('tests')
export class TestsController {
   
  /**
   *
   */
  constructor(private testsService: TestsService) {
  }
  
  @Get()
  index(): Promise<Test[]> {
    return this.testsService.findAll();
  }   

  @Post('create')
  async create(@Body() testData: Test): Promise<any> {
    return this.testsService.create(testData);
  }  

  @Put(':id/update')
  async update(@Param('id') id, @Body() testData: Test): Promise<any> {
      testData.id = Number(id);
      console.log('Update #' + testData.id)
      return this.testsService.update(testData);
  }  
  
  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.testsService.delete(id);
  }

}