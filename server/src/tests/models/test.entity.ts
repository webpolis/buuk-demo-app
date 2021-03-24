import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm';
import { Question } from './question.entity';
import { Result } from './result.entity';

@Entity()
export class Test extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer' })
    createdAt: number;

    @OneToMany(type => Result, result => result.test, { eager: true })
    results: Result[];

    @OneToMany(type => Question, question => question.test, { eager: true })
    questions: Question[];

    @Column({ type: 'text' })
    title: string;
}
