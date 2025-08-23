import {Module} from '@nestjs/common';
import {HabitsService} from './habits.service';
import {HabitsController} from './habits.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Habit} from "./entities/habit.entity";
import {User} from "../users/entities/user.entity";
import {Goal} from "../goals/entities/goal.entity";
import {FriendBucket} from "../buckets/entity/friend-bucket.entity";
import {HabitBucket} from "../buckets/entity/habit-bucket.entity";
import {EmbeddingsService} from "../util/embeddings/embeddings.service";

@Module({
  controllers: [HabitsController],
  providers: [HabitsService, EmbeddingsService],
  imports: [TypeOrmModule.forFeature([Habit, User, Goal, FriendBucket, HabitBucket])]
})
export class HabitsModule {}
