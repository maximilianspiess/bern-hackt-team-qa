import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { GoalsModule } from './goals/goals.module';
import { HabitsModule } from "./habits/habits.module";
import { Habit } from "./habits/entities/habit.entity";
import { Goal } from "./goals/entities/goal.entity";
import { SparkAccountsModule } from './spark-accounts/spark-accounts.module';
import {SparkAccount} from "./spark-accounts/entities/spark-account.entity";
import {ConfigModule} from "@nestjs/config";
import { BucketsModule } from './buckets/buckets.module';
import { BenefitsModule } from './benefits/benefits.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path'
import {FriendBucket} from "./buckets/entity/friend-bucket.entity";
import {HabitBucket} from "./buckets/entity/habit-bucket.entity";

@Module({
  imports: [
      UsersModule,
      HabitsModule,
      GoalsModule,
      SparkAccountsModule,
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'spark_user',
        password: 'sp4rk',
        database: 'spark',
        entities: [User, SparkAccount, Habit, Goal, FriendBucket, HabitBucket],
        synchronize: true
      }),
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env'
      }),
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, "..", 'client')
      }),
      BucketsModule,
      BenefitsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
