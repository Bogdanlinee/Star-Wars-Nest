import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Person} from '../../people/entities/person.entity';

@Entity()
export class ImagePerson {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Person, (person) => person.images)
    person: Person

    @Column()
    image: string;

    @Column()
    publicId: string;
}
