import {HabitEntity} from './HabitEntity';
import {UserResponseEntity} from './UserResponseEntity';

export class HabitBucketEntity {
  id: string;
  habits: HabitEntity[];
  users: UserResponseEntity[];

  constructor(id: string, habits: HabitEntity[], users: UserResponseEntity[]) {
    this.id = id;
    this.habits = habits;
    this.users = users;
  }
}
