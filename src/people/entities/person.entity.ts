import {Column, PrimaryGeneratedColumn} from 'typeorm';

export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    height: string | number;

    @Column()
    mass: string | number;

    @Column()
    hair_color: string;

    @Column()
    skin_color: string;

    @Column()
    eye_color: string;

    @Column()
    birth_year: string;

    @Column()
    gender: string;

    @Column()
    homeworld: string;

    @Column()
    films: string[];

    @Column()
    species: string[];

    @Column()
    vehicles: string[];

    @Column()
    starships: string[];

    @Column()
    created: string;

    @Column()
    edited: string; //2014-12-20T21:17:50.367000Z

    @Column()
    url: string;
}
