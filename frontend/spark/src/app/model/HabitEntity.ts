import {GoalResponseEntity} from './GoalResponseEntity';

export interface HabitEntity {
  id: string,
  title: string,
  userId: string,
  icon: string,
  goals: GoalResponseEntity[]
}
