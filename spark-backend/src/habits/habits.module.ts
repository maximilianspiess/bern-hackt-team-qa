import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';

@Module({
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule {}
