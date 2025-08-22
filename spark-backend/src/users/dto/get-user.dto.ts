import {User} from "../entities/user.entity";

export class GetUserDto{
    id: string;
    username: string;

    constructor(id: string, username: string) {
        this.id = id;
        this.username = username;
    }

    static fromUser(user: User): GetUserDto{
        return new GetUserDto(user.id, user.username);
    }
}