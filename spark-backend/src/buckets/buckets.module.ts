import { Module } from '@nestjs/common';
import { BucketsService } from './buckets.service';
import { BucketsController } from './buckets.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FriendBucket} from "./entity/friend-bucket.entity";
import {HabitBucket} from "./entity/habit-bucket.entity";

@Module({
  controllers: [BucketsController],
  providers: [BucketsService],
  imports: [TypeOrmModule.forFeature([FriendBucket, HabitBucket])]
})
export class BucketsModule {}
