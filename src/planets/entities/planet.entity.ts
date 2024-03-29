import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn, ManyToMany, OneToMany, JoinTable, ManyToOne, JoinColumn, AfterInsert
} from 'typeorm';
import {Person} from '../../people/entities/person.entity';
import {Species} from '../../species/entities/species.entity';
import {Transform} from 'class-transformer';
import {IsArray, IsNotEmpty} from 'class-validator';
import {Film} from '../../films/entities/film.entity';

@Entity()
export class Planet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    name: string;

    @Column({type: 'varchar', nullable: false})
    rotation_period: string;

    @Column({type: 'text', nullable: false})
    orbital_period: string;

    @Column({type: 'varchar', nullable: false})
    diameter: string;

    @Column({type: 'varchar', nullable: false})
    climate: string;

    @Column({type: 'varchar', nullable: false})
    gravity: string;

    @Column({type: 'varchar', nullable: false})
    terrain: string;

    @Column({type: 'varchar', nullable: false})
    surface_water: string;

    @Column({type: 'varchar', nullable: false})
    population: string;

    @ManyToMany(
        () => Film,
        (Film) => Film.planets,
        {
            cascade: ['remove']
        })
    @JoinTable({
        name: 'planet_film',
        joinColumn: {
            name: 'planet_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'planet_film_planet_id'
        },
        inverseJoinColumn: {
            name: 'film_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'planet_film_film_id'
        }
    })
    films: Film[];

    @ManyToMany(
        () => Species,
        (Species) => Species.planets,
        {
            cascade: ['remove']
        })
    @JoinTable({
        name: 'planet_species',
        joinColumn: {
            name: 'planet_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'planet_species_planet_id'
        },
        inverseJoinColumn: {
            name: 'species_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'planet_species_species_id'
        }
    })
    species: Species[];

    @OneToMany(() => Person, (Person) => Person.homeworld)
    residents: Person[];

    @CreateDateColumn({select: false})
    created: Date;

    @UpdateDateColumn({name: 'edited', type: 'timestamp', default: null, select: false})
    edited: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp', default: null, select: false})
    deletedAt: Date;

    @Column({type: 'varchar', nullable: true})
    url: string;
}