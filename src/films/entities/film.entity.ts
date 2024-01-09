import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn
} from 'typeorm';

@Entity()
export class Film {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    title: string;

    @Column({type: 'varchar', nullable: false})
    episode_id: string;

    @Column({type: 'text', nullable: false})
    opening_crawl: string;

    @Column({type: 'varchar', nullable: false})
    director: string;

    @Column({type: 'varchar', nullable: false})
    producer: string;

    @Column({type: 'varchar', nullable: false})
    release_date: string

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({name: 'edited', type: 'timestamp', default: null})
    edited: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp', default: null})
    deletedAt: Date;

    @Column({type: 'varchar', nullable: false})
    url: string;
}