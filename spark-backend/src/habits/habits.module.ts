import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Habit} from "./entities/habit.entity";
import {User} from "../users/entities/user.entity";
import {Goal} from "../goals/entities/goal.entity";

@Module({
  controllers: [HabitsController],
  providers: [HabitsService],
  imports: [TypeOrmModule.forFeature([Habit, User, Goal])]
})
export class HabitsModule {}
