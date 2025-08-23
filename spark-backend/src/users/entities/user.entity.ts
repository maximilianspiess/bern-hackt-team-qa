import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {SparkAccount} from "../../spark-accounts/entities/spark-account.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    constructor(username: string, password: string){
        this.username = username;
        this.password = password;
    }

    @OneToOne(() => SparkAccount)
    @JoinColumn({name: "spark_acount_id"})
    account: SparkAccount;
}
