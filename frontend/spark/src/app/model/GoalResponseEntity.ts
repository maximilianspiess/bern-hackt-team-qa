export interface GoalResponseEntity {
  id?: string;
  habitId?: string;
  type?:	GoalType;
  rewardedSparks?: number;
  startDate?: Date;
  dueDate?: Date;
  numIterations?: number;
}

export enum GoalType {
  DAILY = 'daily',
  SCHEDULED = 'scheduled',
  ITERATIVE = 'iterative'
}
