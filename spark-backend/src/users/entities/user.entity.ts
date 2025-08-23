import {Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {SparkAccount} from "../../spark-accounts/entities/spark-account.entity";
import {FriendBucket} from "../../buckets/entity/friend-bucket.entity";
import {HabitBucket} from "../../buckets/entity/habit-bucket.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    constructor(username: string, password: string){
        this.username = username;
        this.password = password;
    }

    @OneToOne(() => SparkAccount)
    @JoinColumn({name: "sparkAccountId"})
    account: SparkAccount;

    @ManyToMany(() => FriendBucket, bucket => bucket.users)
    friendBuckets: FriendBucket[];

    @ManyToMany(() => HabitBucket, bucket => bucket.users)
    habitBuckets: HabitBucket[];
}
