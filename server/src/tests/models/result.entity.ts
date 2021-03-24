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

    selection: Choice[];
}
