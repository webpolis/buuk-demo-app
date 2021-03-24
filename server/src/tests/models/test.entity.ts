import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from './question.entity';
import { Result } from './result.entity';

@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    created: number;

    @OneToMany(type => Result, result => result.test)
    results: Result[];

    @OneToMany(type => Question, question => question.test)
    questions: Question[];

    title?: string;
}
