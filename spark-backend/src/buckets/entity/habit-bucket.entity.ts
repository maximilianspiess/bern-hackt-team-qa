import {Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Habit} from "../../habits/entities/habit.entity";
import {User} from "../../users/entities/user.entity";

// this class is instantiated only on server side, on a cronjob that checks users with similar interests

@Entity()
export class HabitBucket{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToMany(() => Habit)
    @JoinTable({
        name: 'habit_bucket_habits',
        joinColumn: {
            name: 'habitBucketId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'habitId',
            referencedColumnName: 'id'
        }
    })
    commonHabits: Habit[];

    @ManyToMany(() => User)
    @JoinTable({
        name: 'habit_bucket_users',
        joinColumn: {
            name: 'habitBucketId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'userId',
            referencedColumnName: 'id'
        }
    })
    users: User[];
}