import { Module } from '@nestjs/common';
import { BenefitsService } from './benefits.service';
import { BenefitsController } from './benefits.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Benefit} from "./entities/benefit.entity";
import {Company} from "./entities/company.entity";

@Module({
  controllers: [BenefitsController],
  providers: [BenefitsService],
  imports: [TypeOrmModule.forFeature([Benefit, Company])]
})
export class BenefitsModule {}
