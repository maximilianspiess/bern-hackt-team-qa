import { Module } from '@nestjs/common';
import { SparkAccountsService } from './spark-accounts.service';
import { SparkAccountsController } from './spark-accounts.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SparkAccount} from "./entities/spark-account.entity";
import {User} from "../users/entities/user.entity";
import {Benefit} from "../benefits/entities/benefit.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SparkAccount, User, Benefit])],
  controllers: [SparkAccountsController],
  providers: [SparkAccountsService],
})
export class SparkAccountsModule {}
