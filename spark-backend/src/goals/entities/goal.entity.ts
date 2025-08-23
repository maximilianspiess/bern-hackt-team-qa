import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Habit} from "../../habits/entities/habit.entity";

export enum GoalType {
    DAILY = 'daily',
    SCHEDULED = 'scheduled',
    ITERATIVE = 'iterative'
}

@Entity()
export class Goal {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "enum",
        enum: GoalType
    })
    type: GoalType;

    @ManyToOne(() => Habit, {
        onDelete: "CASCADE"
    })
    habit: Habit;

    @Column({ default: 0 })
    rewardedSparks: number;

    //daily & scheduled
    @Column({ nullable: true })
    startDate?: Date;

    @Column("simple-array", { nullable: true })
    doneDays?: Date[];

    @Column("simple-array", { nullable: true })
    missedDays?: Date[];

    //scheduled
    @Column({ nullable: true })
    dueDate?: Date;

    //iterative
    @Column({ nullable: true })
    numIterations?: number;

    @Column({ nullable: true })
    doneIterations?: number;

    private constructor(habit: Habit,
                type: GoalType,
                rewardedSparks: number,
                startDate?: Date,
                dueDate?: Date,
                doneDays?: Date[],
                missedDays?: Date[],
                numIterations?: number,
                doneIterations?: number) {
        this.habit = habit;
        this.type = type;
        this.rewardedSparks = rewardedSparks;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.doneDays = doneDays;
        this.missedDays = missedDays;
        this.numIterations = numIterations;
        this.doneIterations = doneIterations;
    }

    static createDailyGoal(habit: Habit, rewardedSparks: number, startDate: Date) {
        return new Goal(habit, GoalType.DAILY, rewardedSparks, startDate, undefined, [], []);
    }

    static createScheduledGoal(habit: Habit, rewardedSparks: number, startDate: Date, dueDate: Date) {
        return new Goal(habit, GoalType.SCHEDULED, rewardedSparks, startDate, dueDate, [], []);
    }

    static createIterativeGoal(habit: Habit, rewardedSparks: number, numIterations: number) {
        return new Goal(habit, GoalType.ITERATIVE, rewardedSparks, undefined, undefined, undefined, undefined, numIterations, 0);
    }
}
