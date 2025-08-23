import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Company{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    imageUrl: string;
}