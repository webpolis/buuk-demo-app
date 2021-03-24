import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../models/question.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import CreateQuestionDto from '../dto/create-question.dto';
import { Test } from '../models/test.entity';
import { Choice } from '../models/choice.entity';

@Injectable()
export class QuestionsService {

    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        @InjectRepository(Choice)
        private choiceRepository: Repository<Choice>,
    ) {
    }

    async findAll(): Promise<Question[]> {
        return await this.questionRepository.find({
            relations: ['choices'],
        });
    }

    async create(questionDto: CreateQuestionDto): Promise<Question> {
        const { content, test: testId, choices } = questionDto;
        const question = Question.create();
        question.content = content;
        question.test = await Test.findOne(testId);
        const savedQuestion = await this.questionRepository.save(question);

        // save choices
        choices.forEach(async (choiceContent: string) => {
            const choice = await Choice.create();
            choice.content = choiceContent;
            choice.question = savedQuestion;

            await this.choiceRepository.save(choice);
        });

        return savedQuestion;
    }

    async update(question: Question): Promise<UpdateResult> {
        return await this.questionRepository.update(question.id, question);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.questionRepository.delete(id);
    }

    async getChoices(ids: number[]): Promise<Choice[]> {
        return await this.choiceRepository.findByIds(ids);
    }
}
