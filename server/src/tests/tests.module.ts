import { Module } from '@nestjs/common';
import { TestsService } from './services/tests.service';
import { TestsController } from './controllers/test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './models/test.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Test]),
  ],
  providers: [TestsService],
  controllers: [TestsController],
})
export class TestsModule {}
