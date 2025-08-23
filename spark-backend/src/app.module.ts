import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { GoalsModule } from './goals/goals.module';
import { HabitsModule } from "./habits/habits.module";
import { SparkAccountsModule } from './spark-accounts/spark-accounts.module';
import {SparkAccount} from "./spark-accounts/entities/spark-account.entity";

@Module({
  imports: [
      UsersModule,
      HabitsModule,
      GoalsModule,
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'spark_user',
        password: 'sp4rk',
        database: 'spark',
        entities: [User, SparkAccount],
        synchronize: true
      }),
      SparkAccountsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
