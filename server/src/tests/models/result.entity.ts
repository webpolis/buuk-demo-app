import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Test } from './test.entity';

@Entity()
export class Result extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer' })
    createdAt: number;

    @ManyToOne(type => Test, test => test.results)
    test: Test;

    choices: number[];
}
