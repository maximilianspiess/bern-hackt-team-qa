import {ChildEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, TableInheritance} from "typeorm";
import {Habit} from "../../habits/entities/habit.entity";

export enum GoalType {
    DAILY = 'daily',
    SCHEDULED = 'scheduled',
    ITERATIVE = 'iterative'
}

@Entity()
@TableInheritance({ column: { type: "enum", name: "type", enum: GoalType } })
export abstract class Goal {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Habit, {
        onDelete: "CASCADE"
    })
    habit: Habit;

    @Column({ default: 0 })
    rewardedSparks: number;

    protected constructor(habit: Habit, rewardedSparks: number) {
        this.habit = habit;
        this.rewardedSparks = rewardedSparks;
    }
}

@ChildEntity(GoalType.DAILY)
export class DailyGoal extends Goal {
    @Column()
    startDate: Date;

    @Column("simple-array")
    doneDays: Date[];

    @Column("simple-array")
    missedDays: Date[];

    constructor(habit: Habit, rewardedSparks: number, startDate: Date, doneDays: Date[], missedDays: Date[]) {
        super(habit, rewardedSparks);
        this.startDate = startDate;
        this.doneDays = doneDays;
        this.missedDays = missedDays;
    }
}

@ChildEntity(GoalType.SCHEDULED)
export class ScheduledGoal extends Goal {
    @Column()
    startDate: Date;

    @Column()
    dueDate: Date;

    @Column("simple-array")
    doneDays: Date[];

    @Column("simple-array")
    missedDays: Date[];

    constructor(habit: Habit, rewardedSparks: number, startDate: Date, dueDate: Date, doneDays: Date[], missedDays: Date[]) {
        super(habit, rewardedSparks);
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.doneDays = doneDays;
        this.missedDays = missedDays;
    }
}

@ChildEntity(GoalType.ITERATIVE)
export class IterativeGoal extends Goal {
    @Column()
    numIterations: number;

    @Column()
    doneIterations: number;

    constructor(habit: Habit, rewardedSparks: number, numIterations: number, doneIterations: number) {
        super(habit, rewardedSparks);
        this.numIterations = numIterations;
        this.doneIterations = doneIterations;
    }
}
