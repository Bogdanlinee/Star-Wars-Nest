import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn, CreateDateColumn} from 'typeorm';
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

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp', default: null})
    deletedAt: Date;

    @CreateDateColumn()
    createdDate: Date;
}
