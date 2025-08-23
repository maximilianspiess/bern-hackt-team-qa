import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {SparkAccount} from "../../spark-accounts/entities/spark-account.entity";
import {Habit} from "../../habits/entities/habit.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    @OneToOne(() => SparkAccount)
    @JoinColumn({name: "sparkAccountId"})
    account: SparkAccount;

    @OneToMany(() => Habit, habit => habit.user)
    @JoinColumn({name: "habitId"})
    habits: Habit[];
}
