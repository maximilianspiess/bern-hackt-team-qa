import {PartialType} from '@nestjs/mapped-types';
import {CreateDailyGoalDto, CreateIterativeGoalDto, CreateScheduledGoalDto} from './create-goal.dto';

export type UpdateGoalDto =
    | UpdateDailyGoalDto
    | UpdateScheduledGoalDto
    | UpdateIterativeGoalDto;

export class UpdateDailyGoalDto extends PartialType(CreateDailyGoalDto) {}
export class UpdateScheduledGoalDto extends PartialType(CreateScheduledGoalDto) {}
export class UpdateIterativeGoalDto extends PartialType(CreateIterativeGoalDto) {}
