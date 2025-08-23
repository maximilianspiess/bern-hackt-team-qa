import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {randomBytes} from "crypto";

@Entity()
export class FriendBucket{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    inviteCode: string;

    @Column()
    habitId: string;

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

    constructor(habitId: string, users: User[]) {
        this.inviteCode = this.generateInviteCode();
        this.habitId = habitId;
        this.users = users;
    }

    private generateInviteCode(length = 8): string {
        return randomBytes(length).toString('base64url');
    }
}