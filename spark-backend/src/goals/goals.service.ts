import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateGoalDto} from './dto/create-goal.dto';
import {UpdateGoalDto} from './dto/update-goal.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Habit} from "../habits/entities/habit.entity";
import {DailyGoal, Goal, IterativeGoal, ScheduledGoal} from "./entities/goal.entity";

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
            case "DAILY":
                if (createGoalDto.startDate == null ||
                    createGoalDto.doneDays == null ||
                    createGoalDto.missedDays == null) {
                    throw new BadRequestException("Missing required field")
                }
                goal = new DailyGoal(
                    habit,
                    createGoalDto.rewardedSparks,
                    createGoalDto.startDate,
                    createGoalDto.doneDays,
                    createGoalDto.missedDays
                );
                break;
            case "SCHEDULED":
                if (createGoalDto.startDate == null ||
                    createGoalDto.dueDate == null ||
                    createGoalDto.doneDays == null ||
                    createGoalDto.missedDays == null) {
                    throw new BadRequestException("Missing required field")
                }
                goal = new ScheduledGoal(
                    habit,
                    createGoalDto.rewardedSparks,
                    createGoalDto.startDate,
                    createGoalDto.dueDate,
                    createGoalDto.doneDays,
                    createGoalDto.missedDays
                );
                break;
            case "ITERATIVE":
                if (createGoalDto.numIterations == null ||
                    createGoalDto.doneIterations == null) {
                    throw new BadRequestException("Missing required field",)
                }
                goal = new IterativeGoal(
                    habit,
                    createGoalDto.rewardedSparks,
                    createGoalDto.numIterations,
                    createGoalDto.doneIterations
                );
                break;
        }

        return this.goalRepository.save(goal);
    }

    async findAll() {
        return await this.goalRepository.find();
    }

    async findOne(id: string) {
        const goal = await this.goalRepository.findOneBy({
            id: id
        });
        if (goal == null) {
            throw new NotFoundException("Goal not found");
        }
        return goal;
    }

    async update(id: string, updateGoalDto: UpdateGoalDto) {
        const goal = await this.goalRepository.findOneBy({
            id: id
        });
        if (goal == null) {
            throw new NotFoundException("Goal not found");
        }

        if (updateGoalDto.habitId != null) {
            const habit = await this.habitRepository.findOneBy({
                id: updateGoalDto.habitId
            });
            if (habit == null) {
                throw new NotFoundException("Habit not found");
            }
            goal.habit = habit;
        }

        //TODO glhf for the rest of the fields
        // how about a validator? Yours truly - Max

        await this.goalRepository.save(goal)
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
