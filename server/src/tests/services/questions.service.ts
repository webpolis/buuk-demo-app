import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../models/question.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class QuestionsService {

    constructor(@InjectRepository(Question)
    private questionRepository: Repository<Question>) {
    }

    async findAll(): Promise<Question[]> {
        return await this.questionRepository.find({
            relations: ['choices'],
        });
    }

    async create(question: Question): Promise<Question> {
        return await this.questionRepository.save(question);
    }

    async update(question: Question): Promise<UpdateResult> {
        return await this.questionRepository.update(question.id, question);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.questionRepository.delete(id);
    }
}
