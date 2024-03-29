import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, AfterInsert
} from 'typeorm';
import {ImagePerson} from '../../images/entities/image.person.entity';
import {Film} from '../../films/entities/film.entity';
import {Species} from '../../species/entities/species.entity';
import {Planet} from '../../planets/entities/planet.entity';
import {Starship} from '../../starships/entities/starship.entity';
import {Vehicle} from '../../vehicles/entities/vehicle.entity';

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

    @ManyToMany(
        () => Film,
        (Film) => Film.characters,
        {
            cascade: ['remove']
        })
    @JoinTable({
        name: 'person_film',
        joinColumn: {
            name: 'person_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'person_film_character_id'
        },
        inverseJoinColumn: {
            name: 'film_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'person_film_film_id'
        }
    })
    films: Film[];

    @ManyToOne(() => Planet, (Planet) => Planet.residents)
    @JoinColumn({name: 'homeworld'})
    homeworld: Planet;

    @ManyToMany(
        () => Species,
        (Species) => Species.people,
    )
    species: Species[];

    @ManyToMany(
        () => Starship,
        (Starship) => Starship.pilots,
    )
    starships: Starship[];

    @ManyToMany(
        () => Vehicle,
        (Vehicle) => Vehicle.pilots,
    )
    vehicles: Vehicle[];

    @OneToMany(() => ImagePerson, (imagePerson) => imagePerson.person)
    images: ImagePerson[];

    @CreateDateColumn({select: false})
    created: Date;

    @UpdateDateColumn({name: 'edited', type: 'timestamp', default: null, select: false})
    edited: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp', default: null, select: false})
    deletedAt: Date;

    @Column({type: 'varchar', nullable: true})
    url: string;
}
