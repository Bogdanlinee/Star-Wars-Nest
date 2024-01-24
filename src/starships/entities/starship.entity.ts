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

@Entity()
export class Starship {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    name: string;

    @Column({type: 'varchar', nullable: false})
    model: string;

    @Column({type: 'varchar', nullable: false})
    manufacturer: string;

    @Column({type: 'varchar', nullable: false})
    cost_in_credits: string;

    @Column({type: 'varchar', nullable: false})
    length: string;

    @Column({type: 'varchar', nullable: false})
    max_atmosphering_speed: string;

    @Column({type: 'varchar', nullable: false})
    crew: string;

    @Column({type: 'varchar', nullable: false})
    passengers: string;

    @Column({type: 'varchar', nullable: false})
    cargo_capacity: string;

    @Column({type: 'varchar', nullable: false})
    consumables: string;

    @Column({type: 'varchar', nullable: false})
    hyperdrive_rating: string;

    @Column({type: 'varchar', nullable: false})
    MGLT: string;

    @Column({type: 'varchar', nullable: false})
    starship_class: string;

    @ManyToMany(
        () => Person,
        (Person) => Person.starships,
        {
            cascade: ['remove']
        })
    @JoinTable({
        name: 'starships_person',
        joinColumn: {
            name: 'starship_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'starship_person_starship_id'
        },
        inverseJoinColumn: {
            name: 'person_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'starship_person_person_id'
        }
    })
    pilots: Person[];

    @ManyToMany(
        () => Film,
        (Film) => Film.starships,
        {
            cascade: ['remove']
        })
    @JoinTable({
        name: 'starships_film',
        joinColumn: {
            name: 'starship_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'starship_film_starship_id'
        },
        inverseJoinColumn: {
            name: 'film_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'starship_film_film_id'
        }
    })
    films: Film[];

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({name: 'edited', type: 'timestamp', default: null})
    edited: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp', default: null})
    deletedAt: Date;

    @Column({type: 'varchar', nullable: false})
    url: string;
}