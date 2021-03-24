import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Choice extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Question, question => question.choices)
    question: Question;

    content: string;
}
