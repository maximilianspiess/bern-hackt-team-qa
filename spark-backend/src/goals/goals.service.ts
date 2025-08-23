import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
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
            throw new HttpException("Habit not found", HttpStatus.NOT_FOUND);
        }

        let goal: Goal;
        switch (createGoalDto.type) {
            case "DAILY":
                if (createGoalDto.startDate == null ||
                    createGoalDto.doneDays == null ||
                    createGoalDto.missedDays == null) {
                    throw new HttpException("Missing required field", HttpStatus.BAD_REQUEST)
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
                    throw new HttpException("Missing required field", HttpStatus.BAD_REQUEST)
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
                    throw new HttpException("Missing required field", HttpStatus.BAD_REQUEST)
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
            throw new HttpException("Goal not found", HttpStatus.NOT_FOUND);
        }
        return goal;
    }

    async update(id: string, updateGoalDto: UpdateGoalDto) {
        const goal = await this.goalRepository.findOneBy({
            id: id
        });
        if (goal == null) {
            throw new HttpException("Goal not found", HttpStatus.NOT_FOUND);
        }

        if (updateGoalDto.habitId != null) {
            const habit = await this.habitRepository.findOneBy({
                id: updateGoalDto.habitId
            });
            if (habit == null) {
                throw new HttpException("Habit not found", HttpStatus.NOT_FOUND);
            }
            goal.habit = habit;
        }

        //TODO glhf for the rest of the fields

        await this.goalRepository.save(goal)
    }

    async remove(id: string) {
        const goal = await this.goalRepository.findOneBy({
            id: id
        });
        if (goal == null) {
            throw new HttpException("Goal not found", HttpStatus.NOT_FOUND);
        }

        await this.goalRepository.remove(goal)
    }
}
