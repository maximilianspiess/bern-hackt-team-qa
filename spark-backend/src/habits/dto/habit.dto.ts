import {IsArray, IsString, IsUUID} from "class-validator";
import {Habit} from "../entities/habit.entity";
import {GoalDto} from "../../goals/dto/goal.dto";
import {Type} from "class-transformer";

export class HabitDto {
    @IsUUID()
    id: string;

    @IsString()
    title: string;

    @IsUUID()
    userId: string;

    @IsString()
    icon: string;

    @IsArray({ each: true })
    @Type(() => GoalDto)
    goals: GoalDto[];

    constructor(id: string, title: string, userId: string, icon: string, goals: GoalDto[]) {
        this.id = id;
        this.title = title;
        this.userId = userId;
        this.icon = icon;
        this.goals = goals;
    }

    static fromEntity(entity: Habit) {
        return new HabitDto(
            entity.id,
            entity.title,
            entity.user.id,
            entity.icon,
            entity.goals.map(goal => GoalDto.fromEntity(goal))
        )
    }
}
