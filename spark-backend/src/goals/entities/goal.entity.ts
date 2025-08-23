import { ChildEntity, Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import {Habit} from "../../habits/entities/habit.entity";

export enum GoalType {
    DAILY = 'DAILY',
    SCHEDULED = 'SCHEDULED',
    ITERATIVE = 'ITERATIVE'
}

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Goal {
    constructor(habit: Habit, type: GoalType, rewardedSparks: number) {
        this.habit = habit;
        this.type = type;
        this.rewardedSparks = rewardedSparks;
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    habit: Habit;

    @Column({
        type: "enum",
        enum: GoalType
    })
    type: GoalType;

    @Column({ default: 0 })
    rewardedSparks: number;
}

@ChildEntity(GoalType.DAILY)
export class DailyGoal extends Goal {
    constructor(habit: Habit, rewardedSparks: number, startDate: string, doneDays: string[], missedDays: string[]) {
        super(habit, GoalType.DAILY, rewardedSparks);
        this.startDate = startDate;
        this.doneDays = doneDays;
        this.missedDays = missedDays;
    }

    @Column()
    startDate: string;

    @Column("simple-array")
    doneDays: string[];

    @Column("simple-array")
    missedDays: string[];
}

@ChildEntity(GoalType.SCHEDULED)
export class ScheduledGoal extends Goal {
    constructor(habit: Habit, rewardedSparks: number, startDate: string, dueDate: string, doneDays: string[], missedDays: string[]) {
        super(habit, GoalType.SCHEDULED, rewardedSparks);
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.doneDays = doneDays;
        this.missedDays = missedDays;
    }

    @Column()
    startDate: string;

    @Column()
    dueDate: string;

    @Column("simple-array")
    doneDays: string[];

    @Column("simple-array")
    missedDays: string[];
}

@ChildEntity(GoalType.ITERATIVE)
export class IterativeGoal extends Goal {
    constructor(habit: Habit, rewardedSparks: number, numIterations: number, doneIterations: number) {
        super(habit, GoalType.ITERATIVE, rewardedSparks);
        this.numIterations = numIterations;
        this.doneIterations = doneIterations;
    }

    @Column()
    numIterations: number;

    @Column()
    doneIterations: number;
}
