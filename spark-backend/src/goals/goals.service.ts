import {BadRequestException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateDailyGoalDto, CreateGoalDto, CreateIterativeGoalDto, CreateScheduledGoalDto} from './dto/create-goal.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Habit} from "../habits/entities/habit.entity";
import {Goal, GoalType} from "./entities/goal.entity";
import {UpdateGoalDto} from "./dto/update-goal.dto";
import {GoalDto} from "./dto/goal.dto";
import {UserPayload} from "../users/auth/user-payload.model";
import {User} from "../users/entities/user.entity";
import {FriendBucket} from "../buckets/entity/friend-bucket.entity";
import {HabitBucket} from "../buckets/entity/habit-bucket.entity";

@Injectable()
export class GoalsService {
    constructor(
        @InjectRepository(Goal)
        private goalRepository: Repository<Goal>,
        @InjectRepository(Habit)
        private habitRepository: Repository<Habit>,
        @InjectRepository(FriendBucket)
        private friendBucketRepository: Repository<FriendBucket>,
        @InjectRepository(HabitBucket)
        private habitBucketRepository: Repository<HabitBucket>
    ) {
    }

    async create(createGoalDto: CreateGoalDto, currentUser: UserPayload) {
        const habit = await this.habitRepository.findOneBy({
            id: createGoalDto.habitId
        });
        if (habit == null) {
            throw new NotFoundException("Habit not found");
        }

        if (habit.user.id !== currentUser.id) {
            throw new ForbiddenException("User in goal must match current user");
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

    async findAll(currentUser: UserPayload) {
        const userGoals = await this.goalRepository.find({
            where: {
                habit: {
                    user: {
                        id: currentUser.id
                    }
                }
            },
            relations: ["habit"]
        })

        const friendGoals = (await this.friendBucketRepository.find({
            where: {
                users: {
                    id: currentUser.id
                }
            },
            relations: ["habits"]
        })).flatMap(bucket => bucket.habits.flatMap(habit => habit.goals))

        const bucketGoals = (await this.habitBucketRepository.find({
            where: {
                users: {
                    id: currentUser.id
                }
            },
            relations: ["habits"]
        })).flatMap(bucket => bucket.habits.flatMap(habit => habit.goals))


        return userGoals
            .concat(friendGoals)
            .concat(bucketGoals)
            .map(goal => GoalDto.fromEntity(goal));
    }

    async findOne(id: string, currentUser: UserPayload) {
        const goal = await this.goalRepository.findOne({
            where: {
                id: id
            },
            relations: ["habit.user"]
        });
        if (goal == null) {
            throw new NotFoundException("Goal not found");
        }

        const friendGoalIds = (await this.friendBucketRepository.find({
            where: {
                users: {
                    id: currentUser.id
                }
            },
            relations: ["habits"]
        })).flatMap(bucket => bucket.habits.flatMap(habit => habit.goals.map(goal => goal.id)));

        const bucketGoalIds = (await this.habitBucketRepository.find({
            where: {
                users: {
                    id: currentUser.id
                }
            },
            relations: ["habits"]
        })).flatMap(bucket => bucket.habits.flatMap(habit => habit.goals.map(goal => goal.id)))

        if (goal.habit.user.id !== currentUser.id ||
            goal.id in friendGoalIds ||
            goal.id in bucketGoalIds) {
            throw new ForbiddenException("Cannot view goal");
        }

        return GoalDto.fromEntity(goal);
    }

    async update(id: string, updateGoalDto: UpdateGoalDto, currentUser: UserPayload) {
        const goal = await this.goalRepository.findOneBy({
            id: id
        });
        if (goal == null) {
            throw new NotFoundException("Goal not found");
        }

        if (goal.habit.user.id !== currentUser.id) {
            throw new ForbiddenException("Can only update current user's goals");
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

    async remove(id: string, currentUser: UserPayload) {
        const goal = await this.goalRepository.findOneBy({
            id: id
        });
        if (goal == null) {
            throw new NotFoundException("Goal not found");
        }

        if (goal.habit.user.id !== currentUser.id) {
            throw new ForbiddenException("Can only remove goals of current user");
        }

        await this.goalRepository.remove(goal)
    }
}
