import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, ManyToOne } from 'typeorm';
import { Choice } from './choice.entity';
import { Test } from './test.entity';

@Entity()
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Test, test => test.questions)
    test: Test;

    @OneToMany(type => Choice, choice => choice.question, { eager: true })
    choices: Choice[];

    @Column({ type: 'varchar' })
    content: string;

    @Column({ type: 'integer', default: 0 })
    multiple: number;
}
