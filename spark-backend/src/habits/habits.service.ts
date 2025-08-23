import {BadRequestException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateHabitDto} from './dto/create-habit.dto';
import {UpdateHabitDto} from './dto/update-habit.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {In, Repository} from "typeorm";
import {Habit} from "./entities/habit.entity";
import {User} from "../users/entities/user.entity";
import {Goal} from "../goals/entities/goal.entity";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {instanceToPlain} from "class-transformer";
import {HabitDto} from "./dto/habit.dto";
import {UserPayload} from "../users/auth/user-payload.model";
import {FriendBucket} from "../buckets/entity/friend-bucket.entity";
import {HabitBucket} from "../buckets/entity/habit-bucket.entity";
import {Contains} from "class-validator";

@Injectable()
export class HabitsService {
    constructor(
        @InjectRepository(Habit)
        private habitRepository: Repository<Habit>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Goal)
        private goalRepository: Repository<Goal>,
        @InjectRepository(FriendBucket)
        private friendBucketsRepository: Repository<FriendBucket>,
        @InjectRepository(HabitBucket)
        private habitBucketsRepository: Repository<HabitBucket>
    ) {
    }

    async create(createHabitDto: CreateHabitDto, currentUser: UserPayload) {
        const user = (await this.userRepository.findOneBy({
            id: createHabitDto.userId
        }))!;
        if (createHabitDto.userId !== currentUser.id) {
            throw new ForbiddenException("User in habit must match current user");
        }

        const goals = await Promise.all(createHabitDto.goalIds.map(async goalId => {
            const goal = await this.goalRepository.findOneBy({
                id: goalId
            })
            if (goal == null) {
                throw new NotFoundException("Goal not found");
            }
            return goal;
        }));

        const habit = new Habit(
            createHabitDto.title,
            user,
            goals,
            createHabitDto.icon
        );

        const newHabit = await this.habitRepository.save(habit);

        return HabitDto.fromEntity(newHabit);
    }

    async findAll(currentUser: UserPayload) {
        const user = (await this.userRepository.findOneBy({
            id: currentUser.id
        }))!

        const currentUserHabits = await this.habitRepository
            .find({
                where: {
                    user: {
                        id: user.id
                    }
                },
                relations: ["user", "goals", "goals.habit"]
            });

        const friendBuckets = await this.friendBucketsRepository.find({
            where: {
                users: {
                    id: user.id
                }
            }
        })
        const friendBucketHabits = (await this.habitRepository
            .find({
                where: {
                    id: In(friendBuckets.flatMap(bucket => bucket.habits.map(habit => habit.id)))
                },
                relations: ["user", "goals", "goals.habit"]
            }))

        const habitBuckets = await this.habitBucketsRepository.find({
            where: {
                users: {
                    id: user.id
                }
            }
        })
        const habitBucketHabits = (await this.habitRepository
            .find({
                where: {
                    id: In(habitBuckets.flatMap(bucket => bucket.habits.map(habit => habit.id)))
                },
                relations: ["user", "goals", "goals.habit"]
            }));

        return currentUserHabits
            .concat(friendBucketHabits)
            .concat(habitBucketHabits)
            .map(habits => HabitDto.fromEntity(habits));
    }

    async findOne(id: string, currentUser: UserPayload) {
        const habit = await this.habitRepository.findOneBy({
            id: id
        });
        if (habit == null) {
            throw new NotFoundException(`Habit with id '${id}' not found`);
        }

        const user = await this.userRepository.findOneByOrFail({
            id: currentUser.id
        });

        if (habit.user.id !== user.id ||
            habit.id in user.friendBuckets.flatMap(bucket => bucket.habits.map(habit => habit.id)) ||
            habit.id in user.habitBuckets.flatMap(bucket => bucket.habits.map(habit => habit.id))
        ) {
            throw new ForbiddenException("Cannot view habit");
        }

        return HabitDto.fromEntity(habit);
    }

    async update(id: string, updateHabitDto: UpdateHabitDto, currentUser: UserPayload) {
        if (updateHabitDto.userId !== currentUser.id) {
            throw new ForbiddenException("Can only edit habits of current user");
        }

        await this.habitRepository.update(id, updateHabitDto);
        return this.habitRepository.findOneByOrFail({
            id: id
        });
    }

    async remove(id: string, currentUser: UserPayload) {
        const habit = await this.habitRepository.findOneBy({
            id: id
        });
        if (habit == null) {
            throw new NotFoundException("Habit not found");
        }
        if (habit.user.id !== currentUser.id) {
            throw new ForbiddenException("Can only delete habits of current user");
        }

        await this.habitRepository.remove(habit);
    }
}
