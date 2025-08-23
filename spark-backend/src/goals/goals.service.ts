import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateDailyGoalDto, CreateGoalDto, CreateIterativeGoalDto, CreateScheduledGoalDto} from './dto/create-goal.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Habit} from "../habits/entities/habit.entity";
import {Goal, GoalType} from "./entities/goal.entity";
import {UpdateGoalDto} from "./dto/update-goal.dto";
import {GoalDto} from "./dto/goal.dto";

@Injectable()
export class GoalsService {
    constructor(
        @InjectRepository(Goal)
        private goalRepository: Repository<Goal>,
        @InjectRepository(Habit)
        private habitRepository: Repository<Habit>
    ) {
    }

    async create(createGoalDto: CreateGoalDto) {
        const habit = await this.habitRepository.findOneBy({
            id: createGoalDto.habitId
        });
        if (habit == null) {
            throw new NotFoundException("Habit not found");
        }

        let goal: Goal;
        switch (createGoalDto.type) {
            case GoalType.DAILY:
                const dailyDto = createGoalDto as CreateDailyGoalDto
                if (dailyDto.startDate == null) {
                    throw new BadRequestException("Missing required field 'startDate'")
                }
                goal = Goal.createDailyGoal(
                    habit,
                    dailyDto.rewardedSparks,
                    dailyDto.startDate);
                break;
            case GoalType.SCHEDULED:
                const scheduledDto = createGoalDto as CreateScheduledGoalDto
                if (scheduledDto.startDate == null ||
                    scheduledDto.dueDate == null) {
                    throw new BadRequestException("Missing required field")
                }
                goal = Goal.createScheduledGoal(
                    habit,
                    scheduledDto.rewardedSparks,
                    scheduledDto.startDate,
                    scheduledDto.dueDate);
                break;
            case GoalType.ITERATIVE:
                const iterativeDto = createGoalDto as CreateIterativeGoalDto
                if (iterativeDto.numIterations == null) {
                    throw new BadRequestException("Missing required field",)
                }
                goal = Goal.createIterativeGoal(
                    habit,
                    iterativeDto.rewardedSparks,
                    iterativeDto.numIterations);
                break;
        }

        return GoalDto.fromEntity(await this.goalRepository.save(goal));
    }

    async findAll() {
        return this.goalRepository.find().then(goals => goals.map(goal => GoalDto.fromEntity(goal)));
    }

    async findOne(id: string) {
        const goal = await this.goalRepository.findOneBy({
            id: id
        });
        if (goal == null) {
            throw new NotFoundException("Goal not found");
        }
        return GoalDto.fromEntity(goal);
    }

    async update(id: string, updateGoalDto: UpdateGoalDto) {
        const goal = await this.goalRepository.findOneBy({
            id: id
        });
        if (goal == null) {
            throw new NotFoundException("Goal not found");
        }

        Object.assign(goal, updateGoalDto);

        if (updateGoalDto.habitId != null) {
            const habit = await this.habitRepository.findOneBy({
                id: updateGoalDto.habitId
            });
            if (habit == null) {
                throw new NotFoundException("Habit not found");
            }
            goal.habit = habit;
        }

        return GoalDto.fromEntity(await this.goalRepository.save(goal));
    }

    async remove(id: string) {
        const goal = await this.goalRepository.findOneBy({
            id: id
        });
        if (goal == null) {
            throw new NotFoundException("Goal not found");
        }

        await this.goalRepository.remove(goal)
    }
}
