import {User} from "../entities/user.entity";

export class GetUserDto{
    id: string;
    username: string;
    spark_account_id: string;

    constructor(id: string, username: string, spark_account_id: string) {
        this.id = id;
        this.username = username;
        this.spark_account_id = spark_account_id;
    }

    static fromUser(user: User): GetUserDto{
        return new GetUserDto(user.id, user.username, user.account.id);
    }
}