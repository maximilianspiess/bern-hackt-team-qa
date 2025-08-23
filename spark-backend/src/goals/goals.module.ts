import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Goal} from "./entities/goal.entity";

@Module({
  controllers: [GoalsController],
  providers: [GoalsService],
  imports: [TypeOrmModule.forFeature([Goal])]
})
export class GoalsModule {}
