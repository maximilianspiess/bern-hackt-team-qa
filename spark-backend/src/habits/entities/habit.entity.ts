import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Goal } from "../../goals/entities/goal.entity";

@Entity()
export class Habit {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @ManyToOne(() => User)
    user: User;

    @Column("blob")
    icon: Buffer;

    @OneToMany(() => Goal, goal => goal.habit)
    goals: Goal[];
}
