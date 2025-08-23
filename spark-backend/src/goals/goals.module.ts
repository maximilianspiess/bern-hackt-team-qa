import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Goal} from "./entities/goal.entity";
import {Habit} from "../habits/entities/habit.entity";
import {FriendBucket} from "../buckets/entity/friend-bucket.entity";
import {HabitBucket} from "../buckets/entity/habit-bucket.entity";
import {User} from "../users/entities/user.entity";

@Module({
  controllers: [GoalsController],
  providers: [GoalsService],
  imports: [TypeOrmModule.forFeature([Goal, Habit, User, FriendBucket, HabitBucket])]
})
export class GoalsModule {}
