import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Habit} from "./entities/habit.entity";
import {User} from "../users/entities/user.entity";
import {Goal} from "../goals/entities/goal.entity";
import {UsersModule} from "../users/users.module";
import {FriendBucket} from "../buckets/entity/friend-bucket.entity";
import {HabitBucket} from "../buckets/entity/habit-bucket.entity";

@Module({
  controllers: [HabitsController],
  providers: [HabitsService],
  imports: [TypeOrmModule.forFeature([Habit, User, Goal, FriendBucket, HabitBucket])]
})
export class HabitsModule {}
