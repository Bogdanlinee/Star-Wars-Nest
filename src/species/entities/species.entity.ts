import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn, ManyToMany, JoinTable
} from 'typeorm';
import {Film} from '../../films/entities/film.entity';
import {Person} from '../../people/entities/person.entity';
import {Planet} from '../../planets/entities/planet.entity';

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

    @Column({type: 'varchar', default: null})
    homeworld: string;

    @Column({type: 'varchar', nullable: false})
    language: string;

    @ManyToMany(
        () => Film,
        (Film) => Film.species,
        {
            cascade: ['remove']
        })
    @JoinTable({
        name: 'species_film',
        joinColumn: {
            name: 'species_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'species_film_species_id'
        },
        inverseJoinColumn: {
            name: 'film_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'species_film_film_id'
        }
    })
    films: Film[];

    @ManyToMany(
        () => Person,
        (Person) => Person.species,
        {
            cascade: ['remove']
        })
    @JoinTable({
        name: 'species_person',
        joinColumn: {
            name: 'species_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'species_person_species_id'
        },
        inverseJoinColumn: {
            name: 'person_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'species_person_person_id'
        }
    })
    people: Person[];

    @ManyToMany(
        () => Planet,
        (Planet) => Planet.species,
    )
    planets: Planet[];

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({name: 'edited', type: 'timestamp', default: null})
    edited: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp', default: null})
    deletedAt: Date;

    @Column({type: 'varchar', nullable: false})
    url: string;
}