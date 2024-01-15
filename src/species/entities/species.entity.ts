import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn
} from 'typeorm';

@Entity()
export class Species {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    name: string;

    @Column({type: 'varchar', nullable: false})
    classification: string;

    @Column({type: 'varchar', nullable: false})
    designation: string;

    @Column({type: 'varchar', nullable: false})
    average_height: string;

    @Column({type: 'varchar', nullable: false})
    skin_colors: string;

    @Column({type: 'varchar', nullable: false})
    hair_colors: string;

    @Column({type: 'varchar', nullable: false})
    eye_colors: string;

    @Column({type: 'varchar', nullable: false})
    average_lifespan: string;

    @Column({type: 'varchar', nullable: false})
    homeworld: string;

    @Column({type: 'varchar', nullable: false})
    language: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({name: 'edited', type: 'timestamp', default: null})
    edited: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp', default: null})
    deletedAt: Date;

    @Column({type: 'varchar', nullable: false})
    url: string;
}