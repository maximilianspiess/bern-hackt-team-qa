import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
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

    @Column()
    icon: string;

    @OneToMany(() => Goal, goal => goal.habit)
    goals: Goal[];

    constructor(title: string, user: User, goals: Goal[], icon: string) {
        this.title = title;
        this.user = user;
        this.goals = goals;
        this.icon = icon;
    }
}
