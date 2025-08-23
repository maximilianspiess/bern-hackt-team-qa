import {UserResponseEntity} from './UserResponseEntity';

export interface HabitEntity {
  id: string,
  title: string,
  user: UserResponseEntity,
  icon: string,
  goals: Goal[]
}
