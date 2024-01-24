import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn, ManyToMany
} from 'typeorm';
import {Person} from '../../people/entities/person.entity';
import {Species} from '../../species/entities/species.entity';
import {Planet} from '../../planets/entities/planet.entity';
import {Starship} from '../../starships/entities/starship.entity';

@Entity()
export class Film {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    title: string;

    @Column({type: 'varchar', nullable: false})
    episode_id: number;

    @Column({type: 'text', nullable: false})
    opening_crawl: string;

    @Column({type: 'varchar', nullable: false})
    director: string;

    @Column({type: 'varchar', nullable: false})
    producer: string;

    @Column({type: 'varchar', nullable: false})
    release_date: string;

    @ManyToMany(
        () => Person,
        (Person) => Person.films,
    )
    characters: Person[];

    @ManyToMany(
        () => Species,
        (Species) => Species.films,
    )
    species: Species[];

    @ManyToMany(
        () => Planet,
        (Planet) => Planet.films,
    )
    planets: Planet[];

    @ManyToMany(
        () => Starship,
        (Starship) => Starship.films,
    )
    starships: Starship[];

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({name: 'edited', type: 'timestamp', default: null})
    edited: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp', default: null})
    deletedAt: Date;

    @Column({type: 'varchar', nullable: false})
    url: string;
}