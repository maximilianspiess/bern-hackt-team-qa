import { Module } from '@nestjs/common';
import { BenefitsService } from './benefits.service';
import { BenefitsController } from './benefits.controller';

@Module({
  controllers: [BenefitsController],
  providers: [BenefitsService],
})
export class BenefitsModule {}
