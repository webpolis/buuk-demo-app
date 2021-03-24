import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Choice {
    @PrimaryGeneratedColumn()
    id: number;

    question: Question;

    content: string;
}
