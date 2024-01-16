import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn, ManyToMany, JoinTable
} from 'typeorm';
import {ImagePerson} from '../../images/entities/image.person.entity';
import {Film} from '../../films/entities/film.entity';
import {Species} from '../../species/entities/species.entity';

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

    @ManyToMany(
        () => Species,
        (Species) => Species.people,
    )
    species: Species[];

    @Column({type: 'json', default: null})
    vehicles: string[];

    @Column({type: 'json', default: null})
    starships: string[];

    @OneToMany(() => ImagePerson, (imagePerson) => imagePerson.person)
    images: ImagePerson[];

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({name: 'edited', type: 'timestamp', default: null})
    edited: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp', default: null})
    deletedAt: Date;

    @Column({type: 'varchar', nullable: false})
    url: string;
}
