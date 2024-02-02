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
export class Vehicle {
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
    vehicle_class: string;

    @ManyToMany(
        () => Person,
        (Person) => Person.vehicles,
        {
            cascade: ['remove']
        })
    @JoinTable({
        name: 'vehicles_person',
        joinColumn: {
            name: 'vehicle_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'vehicles_person_vehicle_id'
        },
        inverseJoinColumn: {
            name: 'person_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'vehicles_person_person_id'
        }
    })
    pilots: Person[];

    @ManyToMany(
        () => Film,
        (Film) => Film.vehicles,
        {
            cascade: ['remove']
        })
    @JoinTable({
        name: 'vehicles_film',
        joinColumn: {
            name: 'vehicle_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'vehicles_film_vehicle_id'
        },
        inverseJoinColumn: {
            name: 'film_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'vehicles_film_film_id'
        }
    })
    films: Film[];

    @CreateDateColumn({select: false})
    created: Date;

    @UpdateDateColumn({name: 'edited', type: 'timestamp', default: null, select: false})
    edited: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp', default: null, select: false})
    deletedAt: Date;

    @Column({type: 'varchar', nullable: false})
    url: string;
}