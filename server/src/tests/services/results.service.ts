import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from '../models/result.entity';
import { Test } from '../models/test.entity';
import { Choice } from '../models/choice.entity';
import CreateResultDto from '../dto/create-result.dto';

@Injectable()
export class ResultsService {

    constructor(
        @InjectRepository(Result)
        private resultRepository: Repository<Result>,
        @InjectRepository(Test)
        private testRepository: Repository<Test>,
        @InjectRepository(Choice)
        private choiceRepository: Repository<Choice>,
    ) {
    }

    async findAll(): Promise<Result[]> {
        return await this.resultRepository.find();
    }

    async create(resultDto: CreateResultDto): Promise<Result> {
        const { questionChoices = {}, test: testId } = resultDto;
        const result = await this.resultRepository.create();
        result.test = await this.testRepository.findOne(testId);

        // begin tracking time
        result.startTime = Date.now();

        return await this.resultRepository.save(result);
    }
}
