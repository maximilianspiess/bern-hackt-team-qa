import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

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
}