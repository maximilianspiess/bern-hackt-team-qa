import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class SparkAccount {
    @PrimaryGeneratedColumn("uuid")
    id: string;
}
