import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn
} from 'typeorm';
import {ImagePerson} from '../../images/entities/image.person.entity';

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

    @Column({type: 'json', default: null})
    films: string[];

    @Column({type: 'json', default: null})
    species: string[];

    @Column({type: 'json', default: null})
    vehicles: string[];

    @Column({type: 'json', default: null})
    starships: string[];

    @Column({type: 'varchar', nullable: false})
    url: string;

    @OneToMany(() => ImagePerson, (imagePerson) => imagePerson.person)
    images: ImagePerson[];

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn({name: 'edited', type: 'timestamp', default: null})
    edited: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp', default: null})
    deletedAt: Date;
}
