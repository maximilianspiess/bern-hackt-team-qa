import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {randomBytes} from "crypto";
import {Habit} from "../../habits/entities/habit.entity";

@Entity()
export class FriendBucket{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    inviteCode: string;

    //templateHabit: Habit

    //TODO habit of founding user is taken as "template", and each joining user receives a copy of the habit
    @ManyToMany(() => Habit)
    @JoinTable({
        name: 'friend_bucket_habits',
        joinColumn: {
            name: 'friendBucketId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'habitId',
            referencedColumnName: 'id'
        }
    })
    habits: Habit[];

    @ManyToMany(() => User)
    @JoinTable({
        name: 'friend_bucket_users',
        joinColumn: {
            name: 'friendBucketId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })
    users: User[];

    constructor(/*"template habit"*/ habit: Habit, users: User[]) {
        this.inviteCode = this.generateInviteCode();
        // this.habits[0] = habit; //TODO introduce template habit
        this.users = users;
    }

    private generateInviteCode(length = 8): string {
        return randomBytes(length).toString('base64url');
    }
}