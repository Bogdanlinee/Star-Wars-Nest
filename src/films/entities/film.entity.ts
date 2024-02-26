import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn, ManyToMany, BeforeInsert, AfterInsert
} from 'typeorm';
import {Person} from '../../people/entities/person.entity';
import {Species} from '../../species/entities/species.entity';
import {Planet} from '../../planets/entities/planet.entity';
import {Starship} from '../../starships/entities/starship.entity';
import {Vehicle} from '../../vehicles/entities/vehicle.entity';

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

    @ManyToMany(
        () => Vehicle,
        (Vehicle) => Vehicle.films,
    )
    vehicles: Vehicle[];

    @CreateDateColumn({select: false})
    created: Date;

    @UpdateDateColumn({name: 'edited', type: 'timestamp', default: null, select: false})
    edited: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp', default: null, select: false})
    deletedAt: Date;

    @Column({type: 'varchar', nullable: true})
    url: string;

    @AfterInsert()
    updateUrl() {
        this.url = `localhost:3000/films/${this.id}`;
    }
}