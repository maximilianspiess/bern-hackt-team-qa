import { Module } from '@nestjs/common';
import { BucketsService } from './buckets.service';
import { BucketsController } from './buckets.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FriendBucket} from "./entity/friend-bucket.entity";
import {HabitBucket} from "./entity/habit-bucket.entity";
import {User} from "../users/entities/user.entity";
import {Habit} from "../habits/entities/habit.entity";

@Module({
  controllers: [BucketsController],
  providers: [BucketsService],
  imports: [TypeOrmModule.forFeature([FriendBucket, HabitBucket, Habit, User])]
})
export class BucketsModule {}
