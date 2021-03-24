import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'date',
        nullable: false,
    })
    created: Date;
}