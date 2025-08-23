import { Module } from '@nestjs/common';
import { SparkAccountsService } from './spark-accounts.service';
import { SparkAccountsController } from './spark-accounts.controller';

@Module({
  controllers: [SparkAccountsController],
  providers: [SparkAccountsService],
})
export class SparkAccountsModule {}
