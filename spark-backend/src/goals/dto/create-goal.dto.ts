import {IsDate, IsEnum, IsISO8601, IsNumber, IsUUID} from "class-validator";
import { GoalType } from "../entities/goal.entity";

export abstract class CreateGoalDto {
    @IsUUID()
    habitId: string;

    @IsEnum(GoalType)
    type: 'daily' | 'scheduled' | 'iterative';

    @IsNumber()
    rewardedSparks: number;
}

export class CreateDailyGoalDto extends CreateGoalDto {
    @IsDate()
    startDate: Date;
}

export class CreateScheduledGoalDto extends CreateGoalDto {
    @IsDate()
    startDate: Date;

    @IsDate()
    dueDate: Date;
}

export class CreateIterativeGoalDto extends CreateGoalDto {
    @IsNumber()
    numIterations: number;
}
