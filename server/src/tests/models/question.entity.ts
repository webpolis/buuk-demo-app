import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Choice } from './choice.entity';
import { Test } from './test.entity';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    test: Test;

    @OneToMany(type => Choice, choice => choice.question)
    choices: Choice[];

    content: string;
}
