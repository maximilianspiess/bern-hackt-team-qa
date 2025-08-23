import {IsDate, IsEnum, IsNumber, IsUUID} from "class-validator";
import { GoalType } from "../entities/goal.entity";

export abstract class CreateGoalDto {
    @IsUUID()
    habitId: string;

    @IsEnum(GoalType)
    type: GoalType

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
