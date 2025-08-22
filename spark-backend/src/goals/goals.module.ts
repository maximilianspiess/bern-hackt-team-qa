import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';

@Module({
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}
