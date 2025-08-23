import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

// this class is instantiated only on server side, on a cronjob that checks users with similar interests

@Entity()
export class HabitBucket{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    targetedHabitIds: string[];

    @Column()
    userIds: string[];
}