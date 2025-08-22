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
    @Column()
    startDate: string;

    @Column("simple-array")
    doneDays: string[];

    @Column("simple-array")
    missedDays: string[];
}

@ChildEntity(GoalType.SCHEDULED)
export class ScheduledGoal extends Goal {
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
    @Column()
    numIterations: number;

    @Column()
    doneIterations: number;
}
