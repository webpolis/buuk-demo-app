import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Choice } from './choice.entity';
import { Question } from './question.entity';
import { Test } from './test.entity';

@Entity()
export class Result {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    created: number;

    test: Test;

    selection: QuestionChoice[];
}

// tslint:disable-next-line: max-classes-per-file
@Entity()
export class QuestionChoice {
    @PrimaryGeneratedColumn()
    id: number;

    question: Question;

    choice: Choice;
}
