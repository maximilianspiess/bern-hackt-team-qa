export class CreateGoalDto {
    habitId: string;
    type: 'DAILY' | 'SCHEDULED' | 'ITERATIVE';
    rewardedSparks: number;

    //DAILY & SCHEDULED
    startDate?: string;
    doneDays?: string[];
    missedDays?: string[];

    //SCHEDULED
    dueDate?: string;

    //ITERATIVE
    numIterations?: number;
    doneIterations?: number;
}
