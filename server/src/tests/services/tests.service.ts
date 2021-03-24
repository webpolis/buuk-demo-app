import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from '../models/test.entity';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class TestsService {

    /**
     *
     */
    constructor(@InjectRepository(Test)
    private testRepository: Repository<Test>) {
    }
    /**
     *
     */

    async  findAll(): Promise<Test[]> {
        return await this.testRepository.find();
    }

    async  create(test: Test): Promise<Test> {
        return await this.testRepository.save(test);
    }

    async update(test: Test): Promise<UpdateResult> {
        return await this.testRepository.update(test.id, test);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.testRepository.delete(id);
    }
}
