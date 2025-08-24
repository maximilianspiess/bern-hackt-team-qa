import {HabitEntity} from './HabitEntity';
import {UserResponseEntity} from './UserResponseEntity';

export class FriendBucketEntity{
  id: string;
  inviteCode: string;
  habits: HabitEntity[];
  users: UserResponseEntity[];

  constructor(id: string, inviteCode: string, habits: HabitEntity[], users: UserResponseEntity[]) {
    this.id = id;
    this.inviteCode = inviteCode;
    this.habits = habits;
    this.users = users;
  }
}
