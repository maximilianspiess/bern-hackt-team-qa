import {IsArray, IsDate, IsEnum, IsISO8601, IsNumber, IsUUID} from "class-validator";
import {Goal, GoalType} from "../entities/goal.entity";

export abstract class GoalDto {
    @IsUUID()
    id: string;
    @IsUUID()
    habitId: string;
    @IsEnum(GoalType)
    type: GoalType;
    @IsNumber()
    rewardedSparks: number;

    protected constructor(id: string, habitId: string, type: GoalType, rewardedSparks: number) {
        this.id = id;
        this.habitId = habitId;
        this.type = type;
        this.rewardedSparks = rewardedSparks;
    }

    static fromEntity(entity: Goal): GoalDto {
        switch (entity.type) {
            case GoalType.DAILY:
                return new DailyGoalDto(
                    entity.id,
                    entity.habit.id,
                    entity.rewardedSparks,
                    entity.startDate!,
                    entity.doneDays!,
                    entity.missedDays!
                );
            case GoalType.SCHEDULED:
                return new ScheduledGoalDto(
                    entity.id,
                    entity.habit.id,
                    entity.rewardedSparks,
                    entity.startDate!,
                    entity.dueDate!,
                    entity.doneDays!,
                    entity.missedDays!
                )
            case GoalType.ITERATIVE:
                return new IterativeGoalDto(
                    entity.id,
                    entity.habit.id,
                    entity.rewardedSparks,
                    entity.numIterations!,
                    entity.doneIterations!
                )
        }
    }
}

export class DailyGoalDto extends GoalDto {
    @IsDate()
    startDate: Date;
    @IsDate({ each: true })
    doneDays: Date[];
    @IsDate({ each: true })
    missedDays: Date[];

    constructor(id: string, habitId: string, rewardedSparks: number, startDate: Date, doneDays: Date[], missedDays: Date[]) {
        super(id, habitId, GoalType.DAILY, rewardedSparks);
        this.startDate = startDate;
        this.doneDays = doneDays;
        this.missedDays = missedDays;
    }
}

export class ScheduledGoalDto extends GoalDto {
    @IsDate()
    startDate: Date;
    @IsDate()
    dueDate: Date;
    @IsDate({ each: true })
    doneDays: Date[];
    @IsDate({ each: true })
    missedDays: Date[];

    constructor(id: string, habitId: string, rewardedSparks: number, startDate: Date, dueDate: Date, doneDays: Date[], missedDays: Date[]) {
        super(id, habitId, GoalType.SCHEDULED, rewardedSparks);
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.doneDays = doneDays;
        this.missedDays = missedDays;
    }
}

export class IterativeGoalDto extends GoalDto {
    @IsNumber()
    numIterations: number;
    @IsNumber()
    doneIterations: number;

    constructor(id: string, habitId: string, rewardedSparks: number, numIterations: number, doneIterations: number) {
        super(id, habitId, GoalType.ITERATIVE, rewardedSparks);
        this.numIterations = numIterations;
        this.doneIterations = doneIterations;
    }
}
