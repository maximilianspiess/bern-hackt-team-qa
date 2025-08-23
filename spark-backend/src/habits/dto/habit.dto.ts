import {IsString, IsUUID} from "class-validator";
import {Habit} from "../entities/habit.entity";

export class HabitDto {
    @IsUUID()
    id: string;

    @IsString()
    title: string;

    @IsUUID()
    userId: string;

    @IsString()
    icon: string;

    @IsUUID("all", { each: true })
    goalIds: string[];

    constructor(id: string, title: string, userId: string, icon: string, goalIds: string[]) {
        this.id = id;
        this.title = title;
        this.userId = userId;
        this.icon = icon;
        this.goalIds = goalIds;
    }

    static fromEntity(entity: Habit) {
        return new HabitDto(
            entity.id,
            entity.title,
            entity.user.id,
            entity.icon,
            entity.goals.map(goal => goal.id)
        )
    }
}
