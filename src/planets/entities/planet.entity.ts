import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn, ManyToMany, OneToMany, JoinTable, ManyToOne, JoinColumn
} from 'typeorm';
import {Person} from '../../people/entities/person.entity';
import {Species} from '../../species/entities/species.entity';
import {Transform} from 'class-transformer';
import {IsArray, IsNotEmpty} from 'class-validator';

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

    // @ManyToMany(
    //     () => Person,
    //     (Person) => Person.films,
    // )
    // characters: Person[];
    //
    // @ManyToMany(
    //     () => Species,
    //     (Species) => Species.films,
    // )
    // species: Species[];

    @OneToMany(() => Person, (Person) => Person.homeworld)
    residents: Person[];

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({name: 'edited', type: 'timestamp', default: null})
    edited: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp', default: null})
    deletedAt: Date;

    @Column({type: 'varchar', nullable: false})
    url: string;
}