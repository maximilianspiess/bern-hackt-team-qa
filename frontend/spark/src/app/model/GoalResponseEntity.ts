export interface GoalResponseEntity {
  id?: string;
  habitId?: string;
  type?:	GoalType;
  rewardedSparks?: number;
  startDate?: Date;
  dueDate?: Date
  doneDays?: Date[];
  missedDays?: Date[];
  numIterations?: number;
  doneIterations?: number;
}

export enum GoalType {
  DAILY = 'daily',
  SCHEDULED = 'scheduled',
  ITERATIVE = 'iterative'
}

export function getProgress(goal: GoalResponseEntity): number {
  switch (goal.type) {
    case GoalType.SCHEDULED:
      const differenceInMs: number =
        Math.abs(new Date(goal.dueDate!).getTime() - new Date(goal.startDate!).getTime());
      const millisecondsInDay: number = 1000 * 60 * 60 * 24;
      const numDays: number = Math.floor(differenceInMs / millisecondsInDay);
      return Math.ceil(100 * goal.doneDays!.length / numDays);
    case GoalType.ITERATIVE:
      return Math.ceil(100 * goal.doneIterations! / goal.numIterations!);
    case GoalType.DAILY:
      return Math.ceil(100 * goal.doneDays!.length / goal.missedDays!.length);
    default:
      throw new Error(`Unknown goal type: ${goal.type}`);
  }
}
