import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class FriendBucket{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    inviteCode: string;

    @Column()
    habitId: string;

    @Column()
    userIds: string[];
}