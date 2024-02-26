import {AfterInsert, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', nullable: false})
    username: string;

    @Column({type: 'varchar', nullable: false})
    password: string;

    @Column({type: 'varchar', nullable: false, enum: ['admin', 'user'], default: 'user'})
    role: string;

    @Column({type: 'varchar', nullable: true})
    url: string;

    @AfterInsert()
    updateUrl() {
        this.url = `localhost:3000/films/${this.id}`;
    }
}
