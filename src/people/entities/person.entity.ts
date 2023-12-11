import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    name: string;

    @Column({type: 'varchar', nullable: false})
    height: string;

    @Column({type: 'varchar', nullable: false})
    mass: string;

    @Column({type: 'varchar', nullable: false})
    hair_color: string;

    @Column({type: 'varchar', nullable: false})
    skin_color: string;

    @Column({type: 'varchar', nullable: false})
    eye_color: string;

    @Column({type: 'varchar', nullable: false})
    birth_year: string;

    @Column({type: 'varchar', nullable: false})
    gender: string;

    @Column({type: 'varchar', nullable: false})
    homeworld: string;

    @Column({type: 'json', nullable: false})
    films: string[];

    @Column({type: 'json', nullable: false})
    species: string[];

    @Column({type: 'json', nullable: false})
    vehicles: string[];

    @Column()
    @Column({type: 'json', nullable: false})
    starships: string[];

    @Column({type: 'timestamp', nullable: false})
    created: string;

    @Column({type: 'timestamp', nullable: true, default: null})
    edited: string | null;

    @Column({type: 'varchar', nullable: false})
    url: string;
}
