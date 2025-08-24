import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Goal} from "../../goals/entities/goal.entity";

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

    @Column('simple-array', {nullable: true})
    categories: string[] | null;

    @Column('simple-json', {nullable: true})
    embedding: number[];


    constructor(title: string, user: User, goals: Goal[], icon: string, embedding: number[], categories?: string[]) {
        this.title = title;
        this.user = user;
        this.goals = goals;
        this.icon = icon;
        this.embedding = embedding;
        this.categories = categories ?? null;
    }
}
