import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, ManyToOne } from 'typeorm';
import { Choice } from './choice.entity';
import { Test } from './test.entity';

@Entity()
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Test, test => test.questions)
    test: Test;

    @OneToMany(type => Choice, choice => choice.question)
    choices: Choice[];

    content: string;
}
