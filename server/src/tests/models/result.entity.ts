import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Choice } from './choice.entity';
import { Test } from './test.entity';

@Entity()
export class Result extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer', nullable: true })
    startTime: number;

    @Column({ type: 'integer', nullable: true })
    endTime?: number;

    @ManyToOne(type => Test, test => test.results)
    test: Test;

    @ManyToMany(type => Choice, { cascade: true })
    @JoinTable({
        name: 'result_choice',
        joinColumn: { name: 'result_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'choice_id', referencedColumnName: 'id' },
    })
    choices?: Choice[];
}
