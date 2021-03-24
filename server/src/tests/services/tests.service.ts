import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from '../models/test.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import CreateTestDto from '../dto/create-test.dto';

@Injectable()
export class TestsService {

    constructor(@InjectRepository(Test)
    private testRepository: Repository<Test>) {
    }

    async findAll(): Promise<Test[]> {
        return await this.testRepository.find();
    }

    async findOne(id: number): Promise<Test> {
        return await this.testRepository.findOne(id);
    }

    async create(testDto: CreateTestDto): Promise<Test> {
        const { title } = testDto;
        const test: Test = Test.create();
        test.createdAt = Date.now();
        test.title = title;

        return await this.testRepository.save(test);
    }

    async update(test: Test): Promise<UpdateResult> {
        return await this.testRepository.update(test.id, test);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.testRepository.delete(id);
    }
}
