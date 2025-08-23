import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class SparkAccount {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    amount: number;
}
