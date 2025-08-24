import {IsString, IsUUID} from "class-validator";

export class CreateHabitDto {
    @IsString()
    title: string;

    @IsUUID()
    userId: string;

    @IsString()
    icon: string;

    @IsUUID("all", { each: true })
    goalIds: string[];

    categories?: string[];
}
